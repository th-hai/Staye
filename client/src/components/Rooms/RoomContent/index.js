import { React, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, DatePicker, InputNumber } from 'antd';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Typography, Divider } from 'antd';
import SmartText from 'components/Text/SmartText';
import moment from 'moment';

const RoomContent = (props) => {
  const history = useHistory();
  const { room, user } = props;
  const { RangePicker } = DatePicker;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [inputDate, setInputDate] = useState('Select date')
  const [totalGuests, setTotalGuests] = useState(1);
  const [bookingBody, setBookingBody] = useState({});

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
      setInputDate('Date');
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
    console.log(bookingBody)
  }, [room, user, fromDate, toDate, totalGuests]);

  const onGuestsChange = (value) => {
    setTotalGuests(value)
  }

  const handleBooking = () => {
    if (!user && user.role !== 'user') {
      history.push('/login')
    } else {
      console.log('AAA', bookingBody )
      localStorage.setItem('bookingBody', JSON.stringify(bookingBody))
      history.push('/checkout');
    }
  };

  return (
    <>
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg overflow-hidden">
            <div className="text-2xl font-semibold">{room.name}</div>
            <div>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span className="ml-2 text-base">{room?.address}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <img alt="" className="w-32 rounded-full" src={room?.owner?.avatar} />
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <div className="py-3 ml-2 text-xs font-semibold">
                  <span
                    className={`px-2 mb-2 mr-2 rounded-lg ${room?.status === 'Available'
                        ? 'text-green-900 bg-green-300 border border-green-500'
                        : 'text-red-900 bg-red-300 border border-red-500'
                      }`}
                  >
                    {room?.status}
                  </span>
                </div>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-lg font-bold">
                  {room?.price?.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}{' '}
                  / night
                </p>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <Divider orientation="center">Pick your date</Divider>
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
                  }}/>
                  <Button
                    className="w-full border-2"
                    onClick={() => {
                      setOpenDate(!openDate);
                    }}>
                    {inputDate}
                  </Button>
                <div className="my-4">
                  <InputNumber
                    inline
                    defaultValue={1}
                    min={1}
                    max={room?.maximumGuests}
                    onChange={onGuestsChange}
                  />
                  <span className="text-md font-bold"> Guests</span>
                </div>
                <Button type="primary" block className="my-4" onClick={handleBooking}>
                  Book now
                </Button>
                <Divider orientation="center">Amenities</Divider>
                <List
                  className="w-100/100"
                  bordered
                  dataSource={room?.amenities?.map((item) => item.name)}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text>{item}</Typography.Text>
                    </List.Item>
                  )}
                />
              </div>
            </div>
            <div className=" sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <SmartText text={room?.description} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomContent;
