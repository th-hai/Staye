import React, { useEffect, useState, useCallback } from 'react';
import { Redirect, Link } from 'react-router-dom';
import * as actions from './actions';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row } from 'antd';
import { formatCurrency } from 'utils/formatCurrency';
import { CalendarIcon, GuestIcon, MapMarker } from 'utils/IconsUtils'
import { useInjectReducer } from 'utils/injectReducer';
import { connect, useDispatch } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { makeSelectIsSuccessful } from './selectors';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { REDIRECT } from './constants'
import bookingReducer from './reducer';
import createBookingSaga from './saga';

const Checkout = ({ createBooking, isSuccessful }) => {
  const selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'))
  const bookingBody = JSON.parse(localStorage.getItem('bookingBody'))
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [room, setRoom] = useState({})
  const [body, setBody] = useState({})
  const [user, setUser] = useState({})
  const [totalDays, setTotalDays] = useState(null)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [fromDay, setFromDay] = useState(null)
  const [toDay, setToDay] = useState(null)

  useEffect(() => {
    if (bookingBody && selectedRoom && currentUser) {
      const from = moment(bookingBody.from);
      const to = moment(bookingBody.to);
      setFromDate(from.format('DD/MM/YYYY'))
      setFromDay(from.format('dddd'))
      setToDate(to.format('DD/MM/YYYY'))
      setToDay(to.format('dddd'))
      setUser(currentUser)
      setRoom(selectedRoom)
      setBody(bookingBody)
      setTotalDays(to.diff(from, 'days'))
    }
  }, []);

  useInjectSaga({ key: 'booking', saga: createBookingSaga });
  useInjectReducer({ key: 'booking', reducer: bookingReducer });
  
  const clearData = () => {
    localStorage.removeItem('selectedRoom')
    localStorage.removeItem('bookingBody')
  }
  
  const dispatch = useDispatch()
  const onSubmitHandler = useCallback(
    async () => {
      await createBooking(bookingBody);
    },
    [createBooking]
  );
  if (isSuccessful) {
    clearData()
    dispatch({ type: REDIRECT, isSuccessful })
    return <Redirect to="/booking-success" />
  }


  return (
    <>
      <Row className="px-24 py-16">
        <Col xs={12} md={12}>
          <div className="text-3xl font-bold">Booking information</div>

          <div className="text-xl mt-8">Guests</div>
          <input
            value={body.totalGuests ? body.totalGuests : 1}
            disabled
            type="text"
            id="full-name"
            name="full-name"
            className="mt-4 w-1/3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>

          <div className="text-xl mt-8">
            Spend your time at {room.name}
          </div>

          <section className="text-gray-600 body-font">
            <div className="container py-16 mx-auto">
              <Row>
                <Col xs={20} md={12} lg={12} className="py-4 pr-2">
                  <div className="border-2 rounded-lg border-gray-200 border-opacity-50 p-4 w-full">
                    <div className="space-y-2">
                      <div className="border-t-4 border-green-600 w-2/5"></div>
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3 w-full">
                        Check in
                      </h2>
                      <p className="text-2xl font-bold">{fromDate}</p>
                      <div className="items-center text-lg">{fromDay}</div>
                    </div>
                  </div>
                </Col>

                <Col xs={20} md={12} lg={12} className="py-4 pl-2">
                  <div className="border-2 rounded-lg border-gray-200 border-opacity-50 p-4">
                    <div className="space-y-2">
                      <div className="border-t-4 border-yellow-600 w-2/5"></div>
                      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                        Check out
                      </h2>
                      <p className="text-2xl font-bold">{toDate}</p>
                      <div className="items-center text-lg">{toDay}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          <div className="text-3xl font-bold ">Your information</div>

          <div className="text-xl mt-8">Customer name</div>
          <input
            value={user.name && user.name}
            disabled
            type="text"
            id="full-name"
            name="full-name"
            className="mt-4 w-1/3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
          <Row >
            <Col md={12} className="py-4 pr-2">
              <div className="text-xl mt-8">Mobile number</div>
              <input
                value={user.phone && user.phone}
                disabled
                type="text"
                id="full-name"
                name="full-name"
                className="mt-4 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </Col>
            <Col md={12} className="py-4 pl-2">
              <div className="text-xl mt-8">Email</div>
              <input
                value={user.email && user.email}
                disabled
                type="text"
                id="full-name"
                name="full-name"
                className="mt-4 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </Col>
          </Row>
          <button className="btn btn-success rounded-lg w-full" onClick={() => {
            onSubmitHandler();
          }}>PAYMENT</button>

        </Col>
        <Col lg={2} md={1}></Col>
        <Col
          md={11}
          xs={12}
          lg={10}
          className="text-gray-900 body-font overflow-hidden block sticky top-24"
        >
          <div className=''>
            <div className="py-16 container mx-auto flex items-end rounded-lg box-border border-2 shadow-md relative sticky top-8">
              <div className="lg:w-4/5 mx-auto flex items-end">
                <div className="lg:w-full w-full ">
                  <Link className="flex text-black mb-4">
                    <div>
                      <div className="w-11/12 text-xl font-bold text-gray-900">
                        {room.name ? room.name : 'Room is not exist'}
                      </div>
                      <div className="flex items-center mt-4">
                        <MapMarker />

                        <div className="text-md font-light">
                          {room.address ? room.address : 'Address is not available'}
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-full h-18 rounded-md bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${room.photos && room.photos[0] ? room.photos[0] : 'https://dummyimage.com/330x144/318c6f/ffffff.png'})`,
                      }}
                    ></div>
                  </Link>

                  <div className="flex border-t border-gray-200 py-2 mt-4">
                    <span className="text-gray-800 flex my-2">
                      <CalendarIcon />
                      <div className="font-bold mx-2">{`${totalDays} nights`}</div>
                      <div className="mr-2 ">·</div> {`${fromDate} - ${toDate}`}
                    </span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="my-2 flex">
                      {' '}
                      <GuestIcon />
                      <div className="font-bold text-gray-800 mx-2">{`${body.totalGuests ? body.totalGuests : '1'} guests`}</div>
                    </span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-4">
                    <span className="text-gray-800 font-bold text-lg">
                      Rental fee for {totalDays} nights
                    </span>
                    <span className="ml-auto text-gray-900 text-lg">
                      {body.price && formatCurrency(body.price * totalDays)} đ
                    </span>
                  </div>
                  <div className="font-bold text-black">Cancellation policy</div>
                  <p className="text-justify inline">
                    <span className="font-bold text-gray-700">Moderate:</span>{' '}
                    Guests will receive a full refund if cancel within 48 hours of
                    booking and at least 5 days before check-in. If guests cancel
                    after 48 hours of booking and at least 5 days before check-in,
                    the service fee is non-refundable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

Checkout.propTypes = {
  createBooking: PropTypes.func,
  isPending: PropTypes.bool,
  isSuccessful: PropTypes.bool.isRequired,
};
const mapStateToProps = createStructuredSelector({
  // isPending: makeSelectIsPending(),
  isSuccessful: makeSelectIsSuccessful()
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createBooking: actions.createBooking,
    },
    dispatch
  );
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Checkout);
