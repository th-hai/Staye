import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'components/Modal/BaseModal';
import { Input, Select, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import flow from 'lodash/fp/flow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoomModal } from 'containers/RoomList/selectors';
import isNil from 'lodash/fp/isNil';
import { showRoomModal, uploadPhotos } from 'containers/RoomList/actions';
import { StyledForm } from './styles';
const DEFAULT_ROOM = {
  name: '',
  description: '',
  address: {},
  standardGuests: 0,
  maximumGuests: 0,
  amenities: [],
  photos: [],
  price: 0,
  status: '',
  owner: '',
  location: '',
};

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

const renderListItem = ({
  name,
  required,
  itemLabel,
  requireMessage,
  placeholder,
  suggestedOptions,
}) => (
  <Item
    name={name}
    label={itemLabel}
    rules={[
      {
        required,
        message: requireMessage,
      },
    ]}
  >
    <Select mode="multiple" placeholder={placeholder}>
      {suggestedOptions.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  </Item>
);

const renderSingleItem = ({
  name,
  required,
  itemLabel,
  requireMessage,
  placeholder,
  suggestedOptions,
}) => (
  <Item
    name={name}
    label={itemLabel}
    rules={[
      {
        required,
        message: requireMessage,
      },
    ]}
  >
    <Select placeholder={placeholder} showArrow showSearch>
      {suggestedOptions.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  </Item>
);

renderListItem.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  itemLabel: PropTypes.string,
  requireMessage: PropTypes.string,
  placeholder: PropTypes.string,
  suggestedOptions: PropTypes.array,
};

renderSingleItem.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  itemLabel: PropTypes.string,
  requireMessage: PropTypes.string,
  placeholder: PropTypes.string,
  suggestedOptions: PropTypes.array,
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
  addRoom,
  updateRoom,
  roomModal,
  setModalState,
  showRoomModal,
  uploadPhotos,
  ...restProps
}) => {
  const [form] = StyledForm.useForm();
  const [previewVisible, setPreviewvisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFilelist] = useState([]);

  const handleCancel = () => setPreviewvisible(false);

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
    }
    console.log('useEffect', fileList);
  }, [form, room, fileList]);

  const onCancelHandler = useCallback(() => {
    showRoomModal(false);
    setModalState({ visible: false, room: null });
  }, [showRoomModal]);
  const replace = (value) => {
    return value.replace(/\s+/g, ' ').trim();
  };
  const onFinishHandler = useCallback(
    (values) => {
      // values.name = replace(values.name);
      // values.description = replace(values.description);
      console.log('finish', fileList);
      const formData = new FormData();
      const filesOrigin = fileList.map((file) => file.originFileObj);
      console.log('filesOrigin', filesOrigin);
      for (const item of filesOrigin) {
        formData.append('files', item);
      }
      console.log(formData);
      uploadPhotos(formData);

      if (isAddRoom) {
        addRoom(values);
      } else {
        updateRoom(room.id, values);
      }
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
  }, []);

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

        <Item label="Address" name="address">
          <Input.Group compact>
            <Item
              name={['address', 'houseNumber']}
              rules={[
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: 'Must be a number!',
                },
              ]}
              className="w-1/12"
            >
              <Input placeholder="House number" />
            </Item>
            <Item name={['address', 'city']}>
              <Input placeholder="City" />
            </Item>
            <Item name={['address', 'country']}>
              <Input placeholder="Country" />
            </Item>
            <Item name={['address', 'fullAddress']} className="w-full">
              <Input placeholder="Full address" />
            </Item>
          </Input.Group>
          {/* <Input placeholder="Full address" /> */}
        </Item>

        <Item
          label="Standard guests"
          name="standardGuests"
          rules={[
            {
              required: true,
              message: 'Standard guests is empty!',
            },
          ]}
        >
          <Input className="w-1/12" placeholder="Standard guests" />
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
          <Input className="w-1/12" placeholder="Price" />
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
          <Input className="w-1/12" placeholder="Price" />
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
          <Input className="w-1/12" placeholder="Status" />
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
            {fileList.length >= 3 ? null : uploadButton}
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
};

const mapStateToProps = createStructuredSelector({
  roomModal: makeSelectRoomModal,
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
