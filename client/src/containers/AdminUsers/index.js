import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Table, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { reducerKey } from '../RoomList/constants';
import roomsReducer from 'containers/RoomList/reducer';
import roomsSaga from 'containers/RoomList/saga';
import * as roomsActions from 'containers/RoomList/actions';
import {
  makeSelectUsers,
} from 'containers/RoomList/selectors';
import ConfirmDialog from 'components/Modal/ConfirmDialog';


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
                    <img className="rounded w-16 h-16" alt="A" src={avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLn1xzD3cNYSD8u-3mVzWR5_msS5Q096jpy9s1KaHqivV_46-HtlPOabiI2oVHtBYkQjk&usqp=CAU'} />{' '}
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
