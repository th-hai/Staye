import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { PageHeader, Form, Input, Select, Table, Row, Col, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { reducerKey } from '../RoomList/constants';
import { reducerKey as locationList } from 'components/HomeComponents/LocationContainers/constants';
import locationSaga from 'components/HomeComponents/LocationContainers/saga';
import locationReducer from 'components/HomeComponents/LocationContainers/reducer';
import roomsReducer from 'containers/RoomList/reducer';
import roomsSaga from 'containers/RoomList/saga';
import * as roomsActions from 'containers/RoomList/actions';
import * as locationActions from 'components/HomeComponents/LocationContainers/actions';
import {
  makeSelectOwners,
  makeSelectRooms,
  makeSelectUsers,
} from 'containers/RoomList/selectors';
import ConfirmDialog from 'components/Modal/ConfirmDialog';

import {
  makeSelectLocations,
  makeSelectAmenities,
} from 'components/HomeComponents/LocationContainers/selectors';
const AdminUsers = ({ users, getUsers, deleteUser }) => {
  useInjectReducer({
    key: reducerKey,
    reducer: roomsReducer,
  });
  useInjectSaga({
    key: reducerKey,
    saga: roomsSaga,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const [confirmState, setConfirmState] = useState({
    visible: false,
  });

  const renderActions = (text, record) => (
    <Space className="ml-2">
      <DeleteOutlined
        onClick={() => {
          setConfirmState({
            visible: true,
            title: 'CONFIRMATION',
            message: `Do you want to delete user ${record.name}`,
            onCancel: () => setConfirmState({ visible: false }),
            onOk: () => {
              setConfirmState({ visible: false });
              deleteUser(record.id);
            },
          });
        }}
      />
    </Space>
  );
  return (
    <div>
      <ConfirmDialog {...confirmState} />
      {users && (
        <Table
          dataSource={users}
          rowKey="id"
          columns={[
            {
              title: 'Avatar',
              dataIndex: 'avatar',
              key: 'avatar',
              render: (avatar) => {
                return (
                  <div className="m">
                    <img className="rounded w-16 h-16" alt="A" src={avatar} />{' '}
                  </div>
                );
              },
              width: '6rem',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
              render: (text) => {
                return <div className="text-lg overflow-hidden">{text}</div>;
              },
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: (text) => {
                return <div className="text-lg overflow-hidden">{text}</div>;
              },
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
              render: (text) => {
                return <div className="text-lg overflow-hidden">{text}</div>;
              },
            },
            {
              title: 'Actions',
              key: 'actions',
              render: renderActions,
            },
          ]}
        ></Table>
      )}
    </div>
  );
};
AdminUsers.propTypes = {
  users: PropTypes.array,
  getUsers: PropTypes.func,
  deleteUser: PropTypes.func
};
const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUsers: roomsActions.getUsers,
      deleteUser: roomsActions.deleteUser
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminUsers);
