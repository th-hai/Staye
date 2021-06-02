import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import {
  PageHeader,
  Form,
  Input,
  Select,
  Table,
  Row,
  Col,
  Space,
} from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { reducerKey } from '../RoomList/constants';
import roomsReducer from 'containers/RoomList/reducer';
import roomsSaga from 'containers/RoomList/saga';
import * as roomsActions from 'containers/RoomList/actions';
import { makeSelectRooms } from 'containers/RoomList/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const AdminRoom = ({ getRooms, rooms }) => {
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
  const renderActions = () => (
    <Space className="ml-2">
      <FontAwesomeIcon className="mr-2" icon={faEdit} />
      <FontAwesomeIcon icon={faTrash} />
    </Space>
  );
  return (
    <div>
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
                              opacity-90 hover:opacity-100`}
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
              render: (standardGuests) => <div className="pl-12">{standardGuests}</div>
            },
            {
              title: 'Maximum guests',
              key: 'maximumguests',
              dataIndex: 'maximumGuests',
              render: (maximumGuests) => <div className="pl-12">{maximumGuests}</div>
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
  rooms: PropTypes.array,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRooms: roomsActions.getRoom,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminRoom);
