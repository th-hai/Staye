import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import get from 'lodash/fp/get';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import {  Table, Space } from 'antd';
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
} from 'containers/RoomList/selectors';
import ConfirmDialog from 'components/Modal/ConfirmDialog';
import Title from './title';

import RoomModal from './RoomModal';
import {
  makeSelectLocations,
  makeSelectAmenities,
} from 'components/HomeComponents/LocationContainers/selectors';
const AdminRoom = ({
  getRooms,
  getOwners,
  getUsers,
  rooms,
  deleteRoom,
  showRoomModal,
  addRoom,
  updateRoom,
  getLocations,
  locations,
  getAmenities,
  amenities,
  owners,
}) => {
  useInjectReducer({
    key: reducerKey,
    reducer: roomsReducer,
  });
  useInjectSaga({
    key: reducerKey,
    saga: roomsSaga,
  });
  useInjectReducer({ key: locationList, reducer: locationReducer });
  useInjectSaga({ key: locationList, saga: locationSaga });

  useEffect(() => {
    getRooms();
    getLocations();
    getAmenities();
    getOwners();
    getUsers()
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
      <EditOutlined
        onClick={() => {
          setModalState({ room: record });
          showRoomModal(true);
        }}
      />
      <DeleteOutlined
        onClick={() => {
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
        }}
      />
    </Space>
  );
  return (
    <div>
      <ConfirmDialog {...confirmState} />
      <RoomModal
        room={modalState.room}
        showRoomModal={showRoomModal}
        addRoom={addRoom}
        updateRoom={updateRoom}
        setModalState={setModalState}
        locations={locations}
        amenities={amenities}
        owners={owners}
      />
      <div className="flex justify-between items-center mx-8 py-8">
        <Title />
        <button
          className="btn btn-success"
          onClick={() => {
            showRoomModal(true);
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faPlus} /> New room
        </button>
      </div>

      {rooms && (
        <Table
          dataSource={rooms}
          rowKey="id"
          columns={[
            {
              title: 'Photo',
              dataIndex: 'photos',
              key: 'photos',
              render: (photo) => {
                return (
                  <div className="m">
                    <img className="rounded w-16 h-16" alt="A" src={photo[0]} />{' '}
                  </div>
                );
              },
              width: '6rem',
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
              title: 'Location',
              dataIndex: 'location',
              key: 'location',
              render: (location) => {
                return get(
                  'name',
                  locations.find(item => item.id === location)
                )
              }
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
              title: 'Maximum guests',
              key: 'maximumguests',
              dataIndex: 'maximumGuests',
              render: (maximumGuests) => (
                <div className="pl-4">{maximumGuests}</div>
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
  locations: makeSelectLocations,
  amenities: makeSelectAmenities,
  owners: makeSelectOwners,
});

AdminRoom.propTypes = {
  getRoom: PropTypes.func,
  getOwners: PropTypes.func,
  getUsers: PropTypes.func,
  deleteRoom: PropTypes.func,
  updateRoom: PropTypes.func,
  addRoom: PropTypes.func,
  rooms: PropTypes.array,
  owners: PropTypes.array,
  showRoomModal: PropTypes.func,
  getLocations: PropTypes.func,
  locations: PropTypes.array,
  getAmenities: PropTypes.func,
  amenities: PropTypes.array,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRooms: roomsActions.getRoom,
      getOwners: roomsActions.getOwners,
      deleteRoom: roomsActions.deleteRoom,
      showRoomModal: roomsActions.showRoomModal,
      addRoom: roomsActions.createRoom,
      updateRoom: roomsActions.updateRoom,
      getLocations: locationActions.getLocations,
      getAmenities: locationActions.getAmenities,
      getUsers: roomsActions.getUsers,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminRoom);
