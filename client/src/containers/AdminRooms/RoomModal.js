import React, { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'components/Modal/BaseModal';
import { Input, Select } from 'antd';
import flow from 'lodash/fp/flow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoomModal } from 'containers/RoomList/selectors';
import isNil from 'lodash/fp/isNil';
import { showRoomModal } from 'containers/RoomList/actions';
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

const RoomModal = ({
  room,
  addRoom,
  updateRoom,
  roomModal,
  setModalState,
  showRoomModal,
  ...restProps
}) => {
  const [form] = StyledForm.useForm();

  const isAddRoom = isNil(room) || isNil(room.id);

  useEffect(() => {
    if (!isAddRoom) {
      form.setFieldsValue(room);
    }
  }, [form, room]);

  const onCancelHandler = useCallback(() => {
    showRoomModal(false);
    setModalState({ visible: false, room: null });
  }, [showRoomModal]);
  const replace = (value) => {
    return value.replace(/\s+/g, ' ').trim();
  };
  const onFinishHandler = useCallback(
    (values) => {
      values.name = replace(values.name);
      values.description = replace(values.description);

      values.address.a();
      if (isAddRoom) {
        addRoom(values);
      } else {
        updateRoom(room.id, values);
      }
    },
    [isAddRoom, addRoom, updateRoom, room]
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
          label="description"
          rules={[
            {
              required: true,
              message: 'Description is empty!',
            },
          ]}
        >
          <TextArea rows={5} placeholder="Description" />
        </Item>

        <Item label="Address">
          <Input.Group compact>
            <Item
              name={['address', 'houseNumber']}
              rules={[{ type: 'number', message: 'Must be a number!' }]}
              className="w-1/12"
            >
              <Input placeholder="House number" />
            </Item>
            <Item name={['address', 'city']} >
              <Input placeholder="City" />
            </Item>
            <Item name={['address', 'country']}>
              <Input placeholder="Country" />
            </Item>
            <Item name={['address', 'fullAddress']} className="w-full">
              <Input placeholder="Full address"/>
            </Item>
          </Input.Group>
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
          <Input className="w-1/12" placeholder="Maximum guests" />
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
};

const mapStateToProps = createStructuredSelector({
  roomModal: makeSelectRoomModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showRoomModal,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default flow(memo, withConnect)(RoomModal);
