import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { Table, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { reducerKey as bookingList } from './constants';
import saga from './saga';
import reducer from './reducer';
import * as bookingActions from 'containers/AdminBookings/actions';
import ConfirmDialog from 'components/Modal/ConfirmDialog';
import Title from './title';
import moment from 'moment';
import { makeSelectBookings } from './selectors';
import { formatCurrency } from 'utils/formatCurrency';
import BookingModal from './BookingModal';
// import LocationModal from './LocationModal';

const AdminBookings = ({ getBookings, bookings, showBookingModal, updateBooking }) => {
  useInjectReducer({ key: bookingList, reducer });
  useInjectSaga({ key: bookingList, saga });
  useEffect(() => {
    getBookings();
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
          setModalState({ booking: record });
          showBookingModal(true);
        }}
      />
      {/* <DeleteOutlined
        onClick={() => {
          setConfirmState({
            visible: true,
            title: 'CONFIRMATION',
            message: `Do you want to delete room ${record.name}`,
            onCancel: () => setConfirmState({ visible: false }),
            onOk: () => {
              setConfirmState({ visible: false });
                deleteLocation(record.id);
            },
          });
        }}
      /> */}
    </Space>
  );
  return (
    <div>
      <ConfirmDialog {...confirmState} />
      <BookingModal
        booking={modalState.booking}
        // addLocation={addLocation}
        updateBooking={updateBooking}
        setModalState={setModalState}
        showBookingModal={showBookingModal}
      />
      <div className="flex justify-between items-center mx-8 py-8">
        <Title />
        {/* <button
          className="btn btn-success"
          onClick={() => {
            showLocationModal(true);
          }}
        >
          <FontAwesomeIcon className="mr-2" icon={faPlus} /> New location
        </button> */}
      </div>
      {bookings && (
        <Table
          dataSource={bookings}
          rowKey="id"
          columns={[
            {
              title: 'Photo',
              dataIndex: 'room',
              key: 'room',
              render: (room) => {
                return (
                  <div className="m">
                    <img
                      className="rounded w-16 h-16"
                      alt="A"
                      src={room.photos[0]}
                    />{' '}
                  </div>
                );
              },
            },
            {
              title: 'Room',
              dataIndex: 'room',
              key: 'room',
              render: (room) => {
                return (
                  <div className="text-lg overflow-hidden">{room?.name}</div>
                );
              },
              width: '20%',
            },
            {
              title: 'Customer',
              dataIndex: 'customer',
              key: 'customer',
              render: (customer) => {
                return (
                  <div className="text-lg overflow-hidden">
                    {customer?.name}
                  </div>
                );
              },
            },
            {
              title: 'Total guests',
              dataIndex: 'totalGuests',
              key: 'totalGuests',
              render: (totalGuests) => {
                return (
                  <div className="text-lg overflow-hidden">
                    {totalGuests || 0}
                  </div>
                );
              },
            },
            {
              title: 'Total days',
              dataIndex: 'totalDays',
              key: 'totalDays',
              render: (totalDays) => {
                return (
                  <div className="text-lg overflow-hidden">{totalDays}</div>
                );
              },
            },

            {
              title: 'Price per day',
              dataIndex: 'price',
              key: 'price',
              render: (price) => {
                return (
                  <div className="text-lg overflow-hidden">
                    {formatCurrency(price)}VND
                  </div>
                );
              },
            },
            {
              title: 'Total price',
              dataIndex: 'total',
              key: 'total',
              render: (total) => {
                return (
                  <div className="text-lg overflow-hidden">
                    {formatCurrency(total)}VND
                  </div>
                );
              },
            },
            {
              title: 'From',
              dataIndex: 'from',
              key: 'from',
              render: (from) => {
                let date = new Date(from);
                return (
                  <div className="text-lg overflow-hidden">
                    {moment(date).format('MMM d, YYYY')}
                  </div>
                );
              },
            },
            {
              title: 'To',
              dataIndex: 'to',
              key: 'to',
              render: (to) => {
                let date = new Date(to);
                return (
                  <div className="text-lg overflow-hidden">
                    {moment(date).format('MMM d, YYYY')}
                  </div>
                );
              },
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (status) => {
                return <div className="text-lg overflow-hidden">{status}</div>;
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

const mapStateToProps = createStructuredSelector({
  bookings: makeSelectBookings,
});

AdminBookings.propTypes = {
  bookings: PropTypes.array,
  getBookings: PropTypes.func,
  showBookingModal: PropTypes.func,
  updateBooking: PropTypes.func,
  //   addLocation: PropTypes.func,
  //   updateLocation: PropTypes.func,
  //   deleteLocation: PropTypes.func,
  //   showLocationModal: PropTypes.func,
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBookings: bookingActions.getBookings,
      showBookingModal: bookingActions.showBookingModal,
      updateBooking: bookingActions.updateBookings
      //   showLocationModal: locationActions.showLocationModal,
      //   addLocation: locationActions.createLocation,
      //   updateLocation: locationActions.updateLocation,
      //   deleteLocation: locationActions.deleteLocation,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AdminBookings);
