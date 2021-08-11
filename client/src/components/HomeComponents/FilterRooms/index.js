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
import { Link, useHistory } from 'react-router-dom';
import { createURLSearchParams } from 'utils/urlUtils'

const { Option } = AutoComplete;

const FilterRooms = ({ getLocations, locations, getRooms, rooms }) => {

  const history = useHistory();

  const [openLocation, setOpenLocation] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);

  const [options, setOptions] = useState([]);

  const [location, setLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [inputDate, setInputDate] = useState('Date');
  const [numberGuests, setNumberGuests] = useState();

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

  const handleOpenPickerChange = open => {
    // firing by open props
    // open always get false value
    if (!open) {
      applyDate()
    }
  }

  const applyDate = () => {
    setOpenDate(false)
  }

  const clearDate = () => {
    setOpenDate(false);
    setFromDate(null);
    setToDate(null);
    setInputDate('Date');
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

  const handleSearching = () => {
    const params = { location, keyword: searchText, checkin: fromDate?.format('YYYY-MM-DD'), checkout: toDate?.format('YYYY-MM-DD'), guests: numberGuests }

    history.push(`/search?${createURLSearchParams(params)}`)
  }

  const handleAutoCompleteInputChange = (value) => {
    setSearchText(value);
    const filtered = !value ? [] : rooms.filter(item =>
      item.name.toUpperCase().indexOf(value.toUpperCase()) !== -1)
    setOptions(filtered)
  }

  const autoCompleteOptions = options.map(item => (
    <Option key={item.id} value={item.name}>
      <Link replace to={`/rooms/${item.id}`}>{item.name}</Link>
    </Option>
  ))

  return (
    <div className="flex p-2 h-full border-2 items-center rounded-lg">
      <>
        <Select
          open={openLocation}
          onSelect={(value) => {
            setLocation(value)
            setOpenLocation(false)
          }}
          placeholder="Khu vực"
          className="absolute w-28 h-0 invisible">
          {locations && locations.map(item => (
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
          {locations && locations.find(item => item.id === location)?.name || 'Khu vực'}
        </Button>
      </>

      <Divider type="vertical" className="bg-gray-300 mr-0" style={{ height: '30px' }} />
      <AutoComplete
        allowClear
        onChange={handleAutoCompleteInputChange}
        onFocus={closeAll}
        dataSource={autoCompleteOptions}
        placeholder="Tìm homestay"
        dropdownMatchSelectWidth={false}
        className="w-72">
        <Input className="border-none shadow-none outline-none" />
      </AutoComplete>
      <Divider type="vertical" className="bg-gray-300 m-0" style={{ height: '30px' }} />
      <DatePicker.RangePicker
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

      <div>
        <Select
          open={openGuest}
          onSelect={(value) => {
            setNumberGuests(value)
            setOpenGuest(false)
          }}
          placeholder="Guests"
          className="absolute w-20 h-0 invisible">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
            <Select.Option key={item} value={item}>{item}</Select.Option>
          ))}
        </Select>
        <Button
          className="border-0 h-full min-w-20"
          onClick={() => {
            setOpenGuest(!openGuest);
            setOpenLocation(false);
            setOpenDate(false);
          }}
        >
          {numberGuests > 0 ? numberGuests : ''} Guests
        </Button>
      </div>

      <Button htmlType="submit" className="bg-gray-700 text-white border-0" onClick={handleSearching} >
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
