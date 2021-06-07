import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  DatePicker,
  Divider,
  AutoComplete,
  Input,
  Select
} from 'antd';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from '../../../utils/injectSaga';
import { useInjectReducer } from '../../../utils/injectReducer';
import { reducerKey } from './constants';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

import { makeSelectLocations, makeSelectRooms } from './selectors';
import { Link } from 'react-router-dom';

const { Option } = AutoComplete;

const FilterRooms = ({ getLocations, locations, getRooms, rooms }) => {

  const [openLocation, setOpenLocation] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);

  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState(moment());
  const [toDate, setToDate] = useState(moment());
  const [inputDate, setInputDate] = useState('Ngày');
  const [numberGuests, setNumberGuests] = useState(0);

  useInjectReducer({ key: reducerKey, reducer });
  useInjectSaga({ key: reducerKey, saga });
  
  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    setLocation(locations[0]?.id);
  }, [locations]);

  useEffect(() => {
    if (location) {
      getRooms(location);
    }
  }, [location]);

  const onCalendarChangeHandler = (value) => {
    const from = value[0];
    const to = value[1];
    console.log(from?.format('DD-MM-YYYY'), to?.format('DD-MM-YYYY'))
    if (from == null || to == null) {
      const date = from || to;
      setInputDate(date.format('D-M-yyyy'));
      setFromDate(date);
      setToDate(date.clone().add(1, 'd'));
    }
    else if (from.month() === to.month()) {
      if (from.date() === to.date()){
        setFromDate(from);
        setToDate(to.add(1, 'd'))
        setInputDate(from.format('MMM D-') + to.format('D'));
      } 
      else {
        setFromDate(from);
        setToDate(to);
        setInputDate(from.format('MMM D-') + to.format('D'));
      }
    }
    else {
      setFromDate(from);
      setToDate(to);
      setInputDate(from.format('MMM D-') + to.format('MMM D'));
    }
    setOpenDate(true);
  };

  const refreshDate = () => {
    if (fromDate.month() === toDate.month()) {
      if (fromDate.date() === toDate.date()){
        setInputDate(fromDate.format('MMM D-') + toDate.format('D'));
      } 
      else {
        setInputDate(fromDate.format('MMM D-') + toDate.format('D'));
      }
    }
    else setInputDate(fromDate.format('MMM D-') + toDate.format('MMM D'));
  }

  const applyDate = () => {
    setOpenDate(false)
    refreshDate();
  }

  const clearDate = () => {
    setOpenDate(false);
    setFromDate(null);
    setToDate(null);
    setInputDate('Ngày');
  }

  const closeAll = () => {
    setOpenLocation(false);
    setOpenDate(false);
    setOpenGuest(false);
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const handleOpenPickerChange = open => {
    console.log("open",open)
    if (!open) {
      applyDate()
    }
  }

  const autoCompleteOptions = rooms.map(item => (
    <Option key={item.id} value={item.name}>
      <Link to={`/rooms/${item.id}`}>{item.name}</Link>
    </Option>
  ))

  return (
    <div className="flex p-2 h-full box-border border-2 shadow-md items-center rounded-lg">
      <>
        <Select
          open={openLocation}
          onSelect={(value) => {
            setLocation(value)
            setOpenLocation(false)
          }}
          placeholder="Khu vực"
          className="absolute w-28 h-0 invisible">
          {locations.map(item => (
            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
          ))}
        </Select>
        <Button
          className="border-0 h-full w-24"
          onClick={() => {
            setOpenLocation(!openLocation);
            setOpenDate(false);
            setOpenGuest(false);
          }}
        >
          {locations.find(item => item.id === location)?.name || 'Khu vực'}
        </Button>
      </>

      <Divider type="vertical" className="bg-gray-300 mr-0" style={{ height: '30px' }} />
      <AutoComplete
        allowClear
        onChange={(value) => setSearchText(value)}
        onFocus={()=> closeAll()}
        filterOption={(inputValue, option) =>
          inputValue.length>0 && option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        dataSource={autoCompleteOptions}
        placeholder="Tìm homestay"
        dropdownMatchSelectWidth={false}
        className="w-96">
        <Input className="border-none shadow-none outline-none" />
      </AutoComplete>
      <Divider type="vertical" className="bg-gray-300 m-0" style={{ height: '30px' }} />
      <DatePicker.RangePicker
        open={openDate}
        allowClear
        disabledDate={disabledDate}
        value={[fromDate, toDate]}
        style={{ visibility: 'collapse', width: 0, padding: 0 }}
        onOpenChange={(open) => handleOpenPickerChange(open)}
        onCalendarChange={onCalendarChangeHandler}
        renderExtraFooter={() => {
          return <div className="flex justify-between p-2">
            <Button className="border-0 font-bold text-lg" onClick={clearDate}>Clear</Button>
            <Button className="border-0 font-bold text-lg text-blue-700" onClick={applyDate}>Apply</Button>
          </div>
        }}
      />
      <Button
        className="border-0 h-full w-28"
        onClick={() => { 
          setOpenDate(!openDate);
          setOpenLocation(false);
          setOpenGuest(false);
        }}
      >
        {inputDate}
      </Button>
      <Divider type="vertical" className="bg-gray-300 m-0" style={{ height: '30px' }} />

      <div className>
        <Select
          open={openGuest}
          onSelect={(value) => {
            setNumberGuests(value)
            setOpenGuest(false)
          }}
          placeholder="Số khách"
          className="absolute w-20 h-0 invisible">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <Select.Option key={item} value={item}>{item}</Select.Option>
          ))}
        </Select>
        <Button
          className="border-0 h-full w-20"
          onClick={() => { 
            setOpenGuest(!openGuest);
            setOpenLocation(false);
            setOpenDate(false);
          }}
        >
          {numberGuests > 0 ? numberGuests : 'Số'} khách
        </Button>
      </div>

      <Button htmlType="submit" className="bg-gray-700 text-white border-0" onClick={() => console.log('hihi')} >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
};
FilterRooms.propTypes = {
  getLocations: PropTypes.func,
  locations: PropTypes.array,
  getRooms: PropTypes.func,
  rooms: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations,
  rooms: makeSelectRooms,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocations: actions.getLocations,
      getRooms: actions.getRoomsByLocation,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FilterRooms);
