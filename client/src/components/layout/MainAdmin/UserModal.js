import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'components/Modal/BaseModal';
import { Input, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import flow from 'lodash/fp/flow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as uploadServices from 'services/uploadService';
import {
  // makeSelectOwners,
  // makeSelectPhotoUrls,
  makeSelectRoomModal,
} from 'containers/RoomList/selectors';
import {
  showRoomModal,
  uploadPhotos,
} from 'containers/RoomList/actions';
import { StyledForm } from './styles';
const DEFAULT_USER = {
  name: '',
  email: '',
  role: '',
  avatar: '',
  isEmailVerified: false,
};
// const { Option } = AutoComplete;

const { Item } = StyledForm;
// const { TextArea } = Input;
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

const UserModal = ({
  user,
  setModalState,
  roomModal,
  showRoomModal,
  uploadPhotos,
  updateUser,
  ...restProps
}) => {
  const [form] = StyledForm.useForm();
  const [previewVisible, setPreviewvisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFilelist] = useState([]);
  // const [openSelect, setOpenSelect] = useState(false);
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

  useEffect(() => {
    form.setFieldsValue(user);
    const avatarUrl = user?.avatar?.map((item, index) => ({
      status: 'done',
      url: item,
    }));

    setFilelist(avatarUrl);
  }, [form, user]);

  const onCancelHandler = useCallback(() => {
    setFilelist([]);
    showRoomModal(false);
    setModalState({ visible: false, user: null });
  }, []);
  const replace = (value) => {
    return value.replace(/\s+/g, ' ').trim();
  };
  const onFinishHandler = useCallback(
    async (values) => {
      let newValues;
      values.name = replace(values.name);
      const formData = new FormData();
      // if (!isAddRoom) {
      const newPhotos = fileList
        .filter((item) => !item.status)
        .map((file) => file.originFileObj);
      for (const item of newPhotos) {
        formData.append('files', item);
      }
      await uploadServices.uploadMultiple(formData).then((res) => {
        const urls = res.data.map((item) => item.url);

        newValues = {
          ...values,
          avatar: fileList
            .filter((item) => item.status)
            .map((item) => item.url)
            .concat(urls),
        };
      });
      updateUser(user?.id, newValues);
    },
    [updateUser, user, fileList]
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
      title="EDIT PROFILE"
      {...restProps}
      onCancel={onCancelHandler}
      onOk={onOkHandler}
      afterClose={afterCloseHandler}
      width={600}
    >
      <StyledForm
        form={form}
        {...formItemLayout}
        onFinish={onFinishHandler}
        initialValues={DEFAULT_USER}
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
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Email is empty!',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Item>

        <Item label="Role" name="role">
          <Input disabled={true} placeholder="Role" />
        </Item>

        <Item label="Email verified" name="isEmailVerified">
          <Input disabled={true} placeholder="Email status" />
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
            {fileList?.length >= 8 ? null : uploadButton}
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

UserModal.propTypes = {
  user: PropTypes.object,
  setModalState: PropTypes.func,
  updateUser: PropTypes.func,
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

export default flow(memo, withConnect)(UserModal);
