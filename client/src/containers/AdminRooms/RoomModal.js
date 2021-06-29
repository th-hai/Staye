import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'components/Modal/BaseModal';
import { Input, Select, Upload, Modal, InputNumber, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import flow from 'lodash/fp/flow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as uploadServices from 'services/uploadService';
import {
  makeSelectOwners,
  makeSelectPhotoUrls,
  makeSelectRoomModal,
} from 'containers/RoomList/selectors';
import isNil from 'lodash/fp/isNil';
import { showRoomModal, uploadPhotos } from 'containers/RoomList/actions';
import { StyledForm } from './styles';
const DEFAULT_ROOM = {
  name: '',
  description: '',
  address: '',
  maximumGuests: 1,
  amenities: [],
  photos: [],
  price: null,
  status: '',
  owner: '',
  location: '',
};
const { Option } = AutoComplete;

const { Item } = StyledForm;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    md: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 20 },
  },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const RoomModal = ({
  room,
  owners,
  addRoom,
  updateRoom,
  roomModal,
  setModalState,
  showRoomModal,
  uploadPhotos,
  photoUrls,
  locations,
  amenities,
  ...restProps
}) => {
  const [form] = StyledForm.useForm();
  const [previewVisible, setPreviewvisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFilelist] = useState([]);
  const [openSelect, setOpenSelect] = useState(false);
  const handleCancel = () => setPreviewvisible(false);
  const status = [
    { id: 1, state: 'Available' },
    { id: 2, state: 'Unavailable' },
  ];
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewvisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setFilelist(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const isAddRoom = isNil(room) || isNil(room.id);

  useEffect(() => {
    if (!isAddRoom) {
      form.setFieldsValue(room);
      const listPhotos = room.photos.map((item, index) => ({
        status: 'done',
        url: item,
      }));
      setFilelist(listPhotos);
    } else {
      form.resetFields();
    }
  }, [form, room]);

  const onCancelHandler = useCallback(() => {
    setFilelist([]);
    showRoomModal(false);
    setModalState({ visible: false, room: null });
  }, [showRoomModal]);
  const replace = (value) => {
    return value.replace(/\s+/g, ' ').trim();
  };

  const onFinishHandler = useCallback(
    async (values) => {
      let newValues;
      values.name = replace(values.name);
      values.description = replace(values.description);
      const formData = new FormData();
      // if (!isAddRoom) {
      const newPhotos = fileList
        .filter((item) => !item.status)
        .map((file) => file.originFileObj);
      for (const item of newPhotos) {
        formData.append('files', item);
      }
      // }
      await uploadServices.uploadMultiple(formData).then((res) => {
        const urls = res.data.map((item) => item.url);
        if (isAddRoom) {
          newValues = {
            ...values,
            photos: urls,
          };
        } else {
          newValues = {
            ...values,
            photos: fileList
              .filter((item) => item.status)
              .map((item) => item.url)
              .concat(urls),
          };
        }
      });
      if (isAddRoom) {
        addRoom(newValues);
      } else {
        updateRoom(room.id, newValues);
      }
      setFilelist([]);
    },
    [isAddRoom, addRoom, updateRoom, room, fileList]
  );

  const onOkHandler = useCallback(() => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((errorInfo) => errorInfo);
  }, [form, showRoomModal]);

  const afterCloseHandler = useCallback(() => {
    form.resetFields();
  }, [photoUrls]);

  return (
    <BaseModal
      visible={roomModal.visible}
      title={isAddRoom ? 'ADD ROOM' : 'UPDATE ROOM'}
      {...restProps}
      onCancel={onCancelHandler}
      onOk={onOkHandler}
      afterClose={afterCloseHandler}
      width={1200}
    >
      <StyledForm 
        form={form}
        {...formItemLayout}
        onFinish={onFinishHandler}
        initialValues={DEFAULT_ROOM}
      >
        <Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Name is empty!',
            },
          ]}
        >
          <TextArea placeholder="Name" />
        </Item>

        <Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Description is empty!',
            },
          ]}
        >
          <TextArea rows={5} placeholder="Description" />
        </Item>

        <Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Address is empty!',
            },
          ]}
        >
          <Input placeholder="Address" />
        </Item>

        <Item
          label="Maximum guests"
          name="maximumGuests"
          rules={[
            {
              required: true,
              message: 'Maximum guests is empty!',
            },
          ]}
        >
          <InputNumber min={1} max={10} defaultValue={1} />
        </Item>
        <Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Price is empty!',
            },
          ]}
        >
          <Input placeholder="Price" />
        </Item>

        <Item
          label="Status"
          name="status"
          rules={[
            {
              required: true,
              message: 'Status is empty!',
            },
          ]}
        >
          <Select
            mode="single"
            optionFilterProp="children"
            placeholder="Select status"
            listHeight={100}
          >
            {status.map((item) => (
              <Option key={item.id} value={item.state}>
                <div>{item.state}</div>
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="Locations" name="location">
          <Select
            mode="single"
            optionFilterProp="children"
            placeholder="Select multiple amenities"
            listHeight={100}
            disabled={isAddRoom ? false : true}
          >
            {locations.map((location) => (
              <Option key={location.id} value={location.id}>
                <div>{location.name}</div>
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="Amenities" name="amenities">
          <Select
            mode="multiple"
            optionFilterProp="children"
            placeholder="Select multiple amenities"
            listHeight={100}
          >
            {amenities?.map((amenity) => (
              <Option key={amenity.id} value={amenity.id}>
                <div style={{ overflow: 'visible', whiteSpace: 'pre-wrap' }}>
                  {amenity.name}
                </div>
              </Option>
            ))}
          </Select>
        </Item>

        <Item label="Owner" name="owner">
          <Select
            mode="single"
            optionFilterProp="children"
            placeholder="Select owner"
            listHeight={100}
          >
            {owners.map((owner) => (
              <Option key={owner.id} value={owner.id}>
                <div>{owner.email}</div>
              </Option>
            ))}
          </Select>
        </Item>

        <Item>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            customRequest={dummyRequest}
            beforeUpload={() => false}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Item>
      </StyledForm>
    </BaseModal>
  );
};

RoomModal.propTypes = {
  room: PropTypes.object,
  addRoom: PropTypes.func,
  updateRoom: PropTypes.func,
  roomModal: PropTypes.func,
  setModalState: PropTypes.func,
  showRoomModal: PropTypes.func,
  uploadPhotos: PropTypes.func,
  photoUrls: PropTypes.array,
  locations: PropTypes.array,
  amenities: PropTypes.array,
  owners: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  roomModal: makeSelectRoomModal,
  photoUrls: makeSelectPhotoUrls,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showRoomModal,
      uploadPhotos,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default flow(memo, withConnect)(RoomModal);
