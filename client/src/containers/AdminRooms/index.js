import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { PageHeader, Form, Input, Select, Table, Row, Col, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { reducerKey } from '../RoomList/constants';
import roomsReducer from 'containers/RoomList/reducer';
import roomsSaga from 'containers/RoomList/saga';
import * as roomsActions from 'containers/RoomList/actions';
import { makeSelectRooms } from 'containers/RoomList/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from 'components/Modal/ConfirmDialog';
import Title from './title';
import RoomModal from './RoomModal';
const AdminRoom = ({ getRooms, rooms, deleteRoom, showRoomModal, addRoom, updateRoom }) => {
  useInjectReducer({
    key: reducerKey,
    reducer: roomsReducer,
  });
  useInjectSaga({
    key: reducerKey,
    saga: roomsSaga,
  });
  useEffect(() => {
    getRooms();
  }, []);
  const [modalState, setModalState] = useState({
    visible: false,
    mode: undefined,
    myError: null,
  });
  const [confirmState, setConfirmState] = useState({
    visible: false,
  });

  const renderActions = (text, record) => (
    <Space className="ml-2">
      <EditOutlined onClick={() => {
        setModalState({ room: record});
        showRoomModal(true);
      }} />
      <DeleteOutlined onClick={() => { 
        setConfirmState({
                visible: true,
                title: 'CONFIRMATION',
                message: `Do you want to delete room ${record.name}`,
                onCancel: () => setConfirmState({ visible: false }),
                onOk: () => {
                  setConfirmState({ visible: false });
                  deleteRoom(record.id);
                },
              });
      }} />
    </Space>
  );
  return (
    <div>
    <ConfirmDialog {...confirmState}/>
    <RoomModal
      room={modalState.room}
      showRoomModal={showRoomModal}
      addRoom={addRoom}
      updateRoom={updateRoom}
      setModalState={setModalState}
    />
    <Title/>
      {rooms && (
        <Table
          dataSource={rooms}
          rowKey="id"
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Status',
              key: 'status',
              dataIndex: 'status',
              render: (status) => {
                let color =
                  status === 'Available' ? 'bg-green-600' : 'bg-red-600';
                return (
                  <div
                    className={`${color} inline-block rounded-lg text-white                            
                              text-xs font-bold 
                              mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 
                              opacity-90 hover:opacity-100 w-26`}
                  >
                    {status}
                  </div>
                );
              },
            },
            {
              title: 'Standard guests',
              key: 'standardguests',
              dataIndex: 'standardGuests',
              render: (standardGuests) => (
                <div className="pl-12">{standardGuests}</div>
              ),
            },
            {
              title: 'Maximum guests',
              key: 'maximumguests',
              dataIndex: 'maximumGuests',
              render: (maximumGuests) => (
                <div className="pl-12">{maximumGuests}</div>
              ),
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
const mapStateToProps = createStructuredSelector({
  rooms: makeSelectRooms,
});

AdminRoom.propTypes = {
  getRoom: PropTypes.func,
  deleteRoom: PropTypes.func,
  updateRoom: PropTypes.func,
  addRoom: PropTypes.func,
  rooms: PropTypes.array,
  showRoomModal: PropTypes.func,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRooms: roomsActions.getRoom,
      deleteRoom: roomsActions.deleteRoom,
      showRoomModal: roomsActions.showRoomModal,
      addRoom: roomsActions.createRoom,
      updateRoom: roomsActions.updateRoom
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminRoom);
