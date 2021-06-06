import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  DatePicker,
  Menu,
  Dropdown,
  Divider,
  AutoComplete,
  Input,
  Select
} from 'antd';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputCounter from '../../InputCounter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useInjectSaga } from '../../../utils/injectSaga';
import { useInjectReducer } from '../../../utils/injectReducer';
import { reducerKey } from '../LocationContainers/constants';
import reducer from '../LocationContainers/reducer';
import saga from '../LocationContainers/saga';
import * as actions from '../LocationContainers/actions';
import { makeSelectLocations } from '../LocationContainers/selectors';

const { Option } = AutoComplete;

const FilterRooms = ({ getLocations, locations }) => {

  const dateFormat = 'YYYY/MM/DD';
  const [openLocation, setOpenLocation] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);

  const [location, setLocation] = useState('');
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

  const onCalendarChangeHandler = (value) => {
    const from = value[0];
    const to = value[1];
    if (to == null) {
      setInputDate(from.format('D-M-yyyy'))
    }
    else if (from.month() === to.month()) {
      if (from.date() === to.date())
        setInputDate(from.format('MMM D-') + to.add(1, 'd').format('D'));
      else setInputDate(from.format('MMM D-') + to.format('D'));
    }
    else setInputDate(from.format('MMM D-') + to.format('MMM D'));
    setOpenDate(true);
  };

  const clearDate = () => {
    setOpenDate(false);
    setFromDate(null);
    setToDate(null);
    setInputDate('Ngày');
  }

  const applyDate = () => {
    setOpenDate(false)
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const autoCompleteOptions = locations.map(item => (
    <Option key={item.name} value={item.description}>
      {item.description}
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
          className="absolute w-40 h-0 invisible">
          {locations.map(item => (
            <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
          ))}
        </Select>
        <Button
          className="border-0 h-full w-40"
          onClick={() => setOpenLocation(!openLocation)}
        >
          {location ? location : locations && locations[0] ? locations[0].name : 'Khu vực'}
        </Button>
      </>

      <Divider type="vertical" className="bg-gray-300 mr-0" style={{ height: '30px' }} />
      <AutoComplete
        allowClear
        onChange={(value) => setSearchText(value)}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        dataSource={autoCompleteOptions}
        placeholder="Tìm homestay"
        className="w-60">
        <Input className="border-none shadow-none outline-none" />
      </AutoComplete>
      <Divider type="vertical" className="bg-gray-300 m-0" style={{ height: '30px' }} />
      <DatePicker.RangePicker
        open={openDate}
        allowClear
        disabledDate={disabledDate}
        value={fromDate, toDate}
        style={{ visibility: 'collapse', width: 0, padding: 0 }}
        onOpenChange={(open) => setOpenDate(open)}
        onCalendarChange={onCalendarChangeHandler}
        renderExtraFooter={() => {
          return <div className="flex justify-between p-2">
            <Button className="border-0 font-bold text-lg" onClick={clearDate}>Clear</Button>
            <Button className="border-0 font-bold text-lg text-blue-700" onClick={applyDate}>Apply</Button>
          </div>
        }}
      />
      <Button
        className="border-0 h-full w-40"
        onClick={() => setOpenDate(!openDate)}
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
          onClick={() => setOpenGuest(!openGuest)}
        >
          {numberGuests > 0 ? numberGuests : 'Số'} khách
        </Button>
      </div>

      <Button htmlType="submit" className="bg-gray-700 text-white border-0">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
};
FilterRooms.propTypes = {
  getLocations: PropTypes.func,
  locations: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLocations: actions.getLocations,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FilterRooms);
