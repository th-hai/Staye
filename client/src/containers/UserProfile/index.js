import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'components/Modal/BaseModal';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Modal,
  Row,
  Col,
  Card,
} from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import flow from 'lodash/fp/flow';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as uploadServices from 'services/uploadService';
import * as userActions from 'containers/App/actions';
import { DAEMON } from 'utils/constants';
import {
  makeSelectOwners,
  makeSelectPhotoUrls,
  makeSelectRoomModal,
} from 'containers/RoomList/selectors';
import isNil from 'lodash/fp/isNil';
import { uploadPhotos } from 'containers/RoomList/actions';
import { reducerKey } from './constants';
import { makeSelectUser } from 'containers/App/selectors';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import saga from 'containers/SignIn/saga';
import globalReducer from 'containers/App/reducer';
import { useParams } from 'react-router-dom';
const DEFAULT_USER = {
  name: '',
  email: '',
  role: '',
  avatar: '',
  isEmailVerified: false,
};

const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const UserProfile = ({ user, updateUser }) => {
  useInjectReducer({ key: 'global', reducer: globalReducer, mode: DAEMON });
  useInjectSaga({ key: reducerKey, saga });
  const [form] = Form.useForm();
  const [previewVisible, setPreviewvisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [avatar, setAvatar] = useState('');
  const [openSelect, setOpenSelect] = useState(false);
  const [loading, setLoading] = useState(false);
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

  //   const handleChange = ({ fileList }) => {
  //     setFilelist(fileList);
  //   };
  const handleChange = (info) => {
    // console.log(info);
    // if (info.file.status === 'uploading') {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   console.log('done');
    // Get this url from response in real world.
    getBase64(
      info.file,
      (imageUrl) => {
        setLoading(false);
        setAvatar(imageUrl);
      }
      // this.setState({
      //   imageUrl,
      //   loading: false,
      // }),
    );
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
  const { id } = useParams();
  useEffect(() => {
    form.setFieldsValue(user);
    setAvatar(user?.avatar);
    // const avatarUrl = user?.avatar?.map((item, index) => ({
    //   status: 'done',
    //   url: item,
    // }));

    // setFilelist(avatarUrl);
  }, [form, user]);

  const onCancelHandler = useCallback(() => {
    console.log('aaa');
    // setFilelist([]);
  }, []);
  const replace = (value) => {
    return value.replace(/\s+/g, ' ').trim();
  };
  //   const onFinishHandler = useCallback(
  //     async (values) => {
  //       let newValues;
  //       values.name = replace(values.name);
  //       const formData = new FormData();
  //       // if (!isAddRoom) {
  //       const newPhotos = fileList
  //         .filter((item) => !item.status)
  //         .map((file) => file.originFileObj);
  //       for (const item of newPhotos) {
  //         formData.append('files', item);
  //       }
  //       await uploadServices.uploadMultiple(formData).then((res) => {
  //         const urls = res.data.map((item) => item.url);

  //         newValues = {
  //           ...values,
  //           avatar: fileList
  //             .filter((item) => item.status)
  //             .map((item) => item.url)
  //             .concat(urls),
  //         };
  //       });
  //       console.log(newValues);
  //       console.log(user);
  //       updateUser(user?.id, newValues);
  //       console.log('xong');
  //     },
  //     [updateUser, user, fileList]
  //   );

  return (
    <div className="flex mt-16">
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={(val) => console.log(val)}
        className="w-1/2 flex flex-col justify-center"
      >
        <Form.Item
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
        </Form.Item>

        <Form.Item
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
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Input disabled={true} placeholder="Role" />
        </Form.Item>

        <Form.Item label="Email verified" name="isEmailVerified">
          <Input disabled={true} placeholder="Email status" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
          className="w-full"
        >
          <Button
            type="primary"
            htmlType="submit"
            className="outline-none border-none block w-full px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-green-600 rounded shadow ripple hover:shadow-lg hover:bg-green-700 focus:outline-none flex justify-center items-center"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="flex flex-col items-center justify-center w-3/12">
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
          {avatar ? <img src={avatar} alt="avatar" /> : uploadButton}
        </Upload>
        <div className="text-gray-700 text-lg mt-2">Choose your avatar</div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      uploadPhotos,
      updateUser: userActions.updateUser,
    },
    dispatch
  );
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default flow(memo, withConnect)(UserProfile);
