import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'components/Modal/BaseModal';
import { Input, Select, Upload, Modal, InputNumber, AutoComplete } from 'antd';
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
import { makeSelectBookingModal } from './selectors';
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

const BookingModal = ({
  booking,
  updateBooking,
  bookingModal,
  setModalState,
  showBookingModal,
  ...restProps
}) => {
  const [form] = StyledForm.useForm();
  const status = [
    { id: 1, state: 'Cancelled' },
    { id: 2, state: 'Pending' },
    {id: 3, state: 'Confirmed'}
  ];
const { Option } = AutoComplete;

//   const [avatar, setAvatar] = useState('');
//   const [avatarFile, setAvatarfile] = useState({});
//   const [loading, setLoading] = useState(false);
//   const handleChange = (info) => {
     
//     getBase64(info.file, (imageUrl) => {
//       setLoading(false);
//       setAvatar(imageUrl);
//     });
//     setAvatarfile(info.file);
//   };

//   const uploadButton = (
//     <div>
//       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );
//   const dummyRequest = ({ file, onSuccess }) => {
//     setTimeout(() => {
//       onSuccess('ok');
//     }, 0);
//   };

//   const isAddLocation = isNil(location) || isNil(location.id);

  useEffect(() => {
    //   console.log(isAddLocation)
    // if (isAddLocation) {
    //   form.resetFields();
    //   setAvatar('');
    // } else {
    //   form.setFieldsValue(location);
    //   setAvatar(location?.photo);
    // }
    form.setFieldsValue(booking)
  }, [form, booking]);

  const replace = (value) => {
    return value.replace(/\s+/g, ' ').trim();
  };
  const onCancelHandler = useCallback(() => {
    // setAvatarfile({});
    showBookingModal(false);
    setModalState({ visible: false, booking: null });
  }, [showBookingModal]);
  const onOkHandler = useCallback(() => {
    form
      .validateFields()
      .then(() => {
        form.submit();
      })
      .catch((errorInfo) => errorInfo);
  }, [form, showBookingModal]);

  const afterCloseHandler = useCallback(() => {
    form.resetFields();
  }, []);
  const onFinishHandler = useCallback(
    async (values) => {
        const {status} = values;
      let newValues = {
          status
      };
      updateBooking(booking?.id, newValues);
    //   values.name = replace(values.name);
    //   values.description = replace(values.description);
    //   if (!isEmpty(avatarFile)) {
    //     const formData = new FormData();
    //     formData.append('file', avatarFile);
    //     await uploadServices.uploadSingle(formData).then((res) => {
    //       newValues = {
    //         ...values,
    //         photo: res.data.url,
    //       };
    //     });
    //   } else {
    //     newValues = values;
    //   }
    //   if(isAddLocation)
    //   {
    //       addLocation(newValues);
    //   }
    //   else {
    //       updateLocation(location?.id, newValues);
    //   }
    },
    [updateBooking, booking]
  );

  return (
    <BaseModal
      visible={bookingModal?.visible}
      title={'UPDATE BOOKING STATUS'}
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
            {status?.map((item) => (
              <Option key={item.id} value={item.state}>
                <div>{item.state}</div>
              </Option>
            ))}
          </Select>
        </Item>
      
        {/* <Upload
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
        </Upload> */}
      </StyledForm>
    </BaseModal>
  );
};
BookingModal.propTypes = {
  booking: PropTypes.object,
  updateBooking: PropTypes.func,
  setModalState: PropTypes.func,
  showBookingModal: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  bookingModal: makeSelectBookingModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showRoomModal,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default flow(memo, withConnect)(BookingModal);
