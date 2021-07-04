import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'components/Modal/BaseModal';
import { Input, Upload } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import flow from 'lodash/fp/flow';
import { connect } from 'react-redux';
import isEmpty from 'lodash/fp/isEmpty';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as uploadServices from 'services/uploadService';
import isNil from 'lodash/fp/isNil';
import { showRoomModal } from 'containers/RoomList/actions';
import { StyledForm } from './styles';
import { makeSelectLocationModal } from './selectors';
const DEFAULT_LOCATION = {
  name: '',
  description: '',
  photo: '',
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

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

const LocationModal = ({
  location,
  addLocation,
  updateLocation,
  locationModal,
  setModalState,
  showLocationModal,
  ...restProps
}) => {
  const [form] = StyledForm.useForm();
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarfile] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
     
    getBase64(info.file, (imageUrl) => {
      setLoading(false);
      setAvatar(imageUrl);
    });
    setAvatarfile(info.file);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const isAddLocation = isNil(location) || isNil(location.id);

  useEffect(() => {
      console.log(isAddLocation)
    if (isAddLocation) {
      form.resetFields();
      setAvatar('');
    } else {
      form.setFieldsValue(location);
      setAvatar(location?.photo);
    }
  }, [form, location]);

  const replace = (value) => {
    return value.replace(/\s+/g, ' ').trim();
  };
  const onCancelHandler = useCallback(() => {
    setAvatarfile({});
    showLocationModal(false);
    setModalState({ visible: false, location: null });
  }, [showLocationModal]);
  const onOkHandler = useCallback(() => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((errorInfo) => errorInfo);
  }, [form, showLocationModal]);

  const afterCloseHandler = useCallback(() => {
    form.resetFields();
  }, [avatar]);
  const onFinishHandler = useCallback(
    async (values) => {
      let newValues;
      values.name = replace(values.name);
      values.description = replace(values.description);
      if (!isEmpty(avatarFile)) {
        const formData = new FormData();
        formData.append('file', avatarFile);
        await uploadServices.uploadSingle(formData).then((res) => {
          newValues = {
            ...values,
            photo: res.data.url,
          };
        });
      } else {
        newValues = values;
      }
      if(isAddLocation)
      {
          addLocation(newValues);
      }
      else {
          updateLocation(location?.id, newValues);
      }
    },
    [updateLocation, location, avatarFile]
  );

  return (
    <BaseModal
      visible={locationModal?.visible}
      title={isAddLocation ? 'ADD LOCATION' : 'UPDATE LOCATION'}
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
        initialValues={DEFAULT_LOCATION}
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
          <Input placeholder="Name" />
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
        <Upload
          name="avatar"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          className="avatar-uploader flex justify-center items-center"
          showUploadList={false}
          onChange={handleChange}
          customRequest={dummyRequest}
          beforeUpload={() => false}
        >
          {avatar ? (
            <img
              src={avatar}
              className="object-cover rounded-full w-full h-full"
              alt="avatar"
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </StyledForm>
    </BaseModal>
  );
};
LocationModal.propTypes = {
  locaton: PropTypes.object,
  addLocation: PropTypes.func,
  updateLocation: PropTypes.func,
  setModalState: PropTypes.func,
  showLocationModal: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  locationModal: makeSelectLocationModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showRoomModal,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default flow(memo, withConnect)(LocationModal);
