import { React, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, DatePicker, InputNumber, Card } from 'antd';
import { faMapMarkerAlt, faWifi, faTv, faFan, faBolt, faBox, faCity, faBed, faStopwatch, faWindowMaximize, faBacon, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Divider } from 'antd';
import SmartText from 'components/Text/SmartText';
import moment from 'moment';

const RoomContent = (props) => {
  const history = useHistory();
  const { room, user } = props;
  const { RangePicker } = DatePicker;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputDate, setInputDate] = useState('Select date')
  const [totalGuests, setTotalGuests] = useState(1);
  const [bookingBody, setBookingBody] = useState({});
  const amenityMap = {
    'Wifi': faWifi,
    'TV': faTv,
    'Hairdryer': faFan,
    'Electric stove': faBolt,
    'Fridge': faBox,
    'Balcony': faCity,
    'Extra cushion': faBed,
    'Microwave': faStopwatch,
    'Windows': faWindowMaximize,
    'BBQ': faBacon,
    'Lego toys': faPuzzlePiece
  };

  const onCalendarChangeHandler = (value) => {
    const from = value[0];
    const to = value[1];

    if (from == null || to == null) {
      const date = from || to;
      setFromDate(date);
      setToDate(null);
    }
    else if (from.month() === to.month() && from.date() === to.date()) {
      setFromDate(from);
      setToDate(to.add(1, 'd'))
    }
    else {
      setFromDate(from);
      setToDate(to);
    }
  };

  const applyDate = () => {
    setOpenDate(false)
  }

  const clearDate = () => {
    setOpenDate(false);
    setFromDate(null);
    setToDate(null);
    setInputDate('Select date');
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const handleOpenPickerChange = open => {
    if (!open) {
      applyDate()
    }
  }

  useEffect(() => {
    if (openDate) return;

    if (fromDate == null) {
      clearDate();
    }
    else if (toDate == null) {
      setToDate(fromDate.clone().add(1, 'd'))
    }
    else if (fromDate.month() === toDate?.month()) {
      if (fromDate.date() === toDate.date()) {
        setToDate(toDate.add(1, 'd'))
      }
    }
  }, [openDate])

  useEffect(() => {
    if (fromDate == null && toDate == null) {
      setInputDate('Check In - Check Out');
    }
    else if (fromDate == null || toDate == null) {
      const date = fromDate || toDate;
      setInputDate(date.format('D-M-yyyy'));
    }
    else if (fromDate.month() === toDate.month()) {
      if (fromDate.date() === toDate.date()) {
        setInputDate(fromDate.format('D-M-yyyy'));
      }
      else {
        setInputDate(fromDate.format('MMM D-') + toDate.format('D'));
      }
    }
    else setInputDate(fromDate.format('MMM D-') + toDate.format('MMM D'));
  }, [fromDate, toDate])

  const updateBody = () => {
    setBookingBody({
      room: room.id,
      customer: user?.id,
      from: fromDate,
      to: toDate,
      price: room.price,
      totalGuests: totalGuests
    })
  }

  useEffect(() => {
    updateBody();
  }, [room, user, fromDate, toDate, totalGuests]);

  const onGuestsChange = (value) => {
    setTotalGuests(value)
  }

  const handleBooking = () => {
    if (!fromDate || !toDate || !totalGuests) {
      setIsError(true)
    }
    else if (!user && user?.role !== 'user') {
      history.push('/login')
    } else {
      setIsError(false)
      localStorage.setItem('bookingBody', JSON.stringify(bookingBody))
      localStorage.setItem('selectedRoom', JSON.stringify(room))
      localStorage.setItem('currentUser', JSON.stringify(user))
      history.push('/checkout');
    }
  };

  return (
    <>
      <div className="container py-5 mx-auto flex flex-col">
        <div className="lg:w-4/6">
          <div className="rounded-lg overflow-hidden">
            <div className="text-2xl font-semibold">{room.name}</div>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="ml-2 text-base">{room?.address}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mt-2">
            <Card title={`${room?.price?.toLocaleString()}₫ / night`} className="mr-2 shadow-xl fixed right-48 bottom-28" style={{ width: 300 }}>
              {isError && (
                <div className="alert alert-error w-full">
                  <div className="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                    </svg>
                    <label>Date is empty</label>
                  </div>
                </div>
              )}
              <RangePicker
                open={openDate}
                allowClear
                disabledDate={disabledDate}
                value={[fromDate, toDate]}
                style={{ visibility: 'collapse', width: 0, padding: 0 }}
                onOpenChange={handleOpenPickerChange}
                onCalendarChange={onCalendarChangeHandler}
                renderExtraFooter={() => {
                  return <div className="flex justify-between p-2">
                    <Button className="border-0 font-bold text-lg" onClick={clearDate}>Clear</Button>
                    <Button className="border-0 font-bold text-lg text-blue-700" onClick={applyDate}>Apply</Button>
                  </div>
                }} />
              <Button
                className="w-full border-2"
                onClick={() => {
                  setOpenDate(!openDate);
                }}>
                {inputDate}
              </Button>
              <div className="my-4">
                <p className="text-md font-bold"> Guests:</p>
                <InputNumber
                  inline
                  defaultValue={1}
                  min={1}
                  max={room?.maximumGuests}
                  onChange={onGuestsChange}
                  className="w-full"
                />
              </div>
              <Badge.Ribbon text={room?.status} color={room?.status === 'Available' ? 'cyan' : 'red'}>
                <Button type="primary" block className="my-4 bg-green-500 border-0 hover:bg-green-600" onClick={handleBooking}>
                  Book now
                </Button>
              </Badge.Ribbon>
            </Card>
            <div className="mt-2 sm:mt-0 sm:text-left sm:w-2/3 text-center flex-grow max-w-7xl">
              <Divider orientation="center">Description</Divider>
              <SmartText text={room?.description} />
              <Divider orientation="center">Amenities</Divider>
              <div class="flex flex-row w-full">
                {room && room?.amenities ? room?.amenities?.map(item =>
                  <div className="flex flex-col p-5 bg-gray-100 w-60 items-center justify-center mr-2">
                    <FontAwesomeIcon className="text-green-300 text-6xl" icon={amenityMap[`${item.name}`]} />
                    <span className="mt-2 text-gray-600">{item.name}</span>
                  </div>
                ) : (<p>No amenities available</p>)}
              </div>
              <Divider orientation="center">Rules and policies on accommodation</Divider>
              <section class="text-blueGray-700 ">
                <div class="container flex flex-col items-center px-5 py-2">
                  <div class="flex flex-col w-full mb-12 text-left ">
                    <div class="w-full mx-auto ">
                      <h1 class="mx-auto mb-4 text-xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font">Cancellation policy</h1>
                      <h2 class="mx-auto mb-4 text-xl font-semibold leading-none tracking-tighter text-black title-font">Strict:</h2>
                      <p className="mx-auto text-base font-medium leading-relaxed text-blueGray-700">Refund 50% of the booking value when customers cancel the room within 48 hours after successful booking and 14 days before the check-in time. Then, cancel the room 14 days before the check-in time, get a 50% refund of the total amount paid (minus the service fee).</p>
                      <img className="object-cover mx-autoF" src="https://i.ibb.co/F0Pq4jR/image.png" />
                    </div>
                  </div>
                </div>
                <h2 class="mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font"> Key notes </h2>
                <ul class="list-disc">
                  <li className="text-base font-medium leading-relaxed">Do not use stimulants</li>
                  <li className="text-base font-medium leading-relaxed">Do not play music after 11 PM (23:00)</li>
                  <li className="text-base font-medium leading-relaxed">No smoking in the bedroom</li>
                  <li className="text-base font-medium leading-relaxed">No party allowed</li>
                  <li className="text-base font-medium leading-relaxed">Please turn off the devices when you leave the room</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomContent;
