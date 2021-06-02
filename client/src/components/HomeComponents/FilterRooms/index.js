import React, { useState } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  DatePicker,
  Menu,
  Dropdown,
  message,
  Tooltip,
  InputNumber,
} from 'antd';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputCounter from '../../InputCounter';
const FilterRooms = () => {
  const { Option } = Select;
  const { SubMenu } = Menu;
  const dateFormat = 'YYYY/MM/DD';
  const [open, setOpen] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);
  const [input, setInput] = useState('Ngày');
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
 
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setInput('I love you');
  };

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  return (
    <>
      <Form
        name="complex-form"
        onFinish={onFinish}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        className="w-full h-0"
      >
        <Form.Item label="Address">
          <Input.Group compact className="h-10">
            <Form.Item name={['address', 'street']} noStyle>
              <Input style={{ width: '30%' }} placeholder="Nơi bạn muốn đi" />
            </Form.Item>
            <Form.Item name={['address', 'date']} noStyle>
              <DatePicker.RangePicker
                open={open}
                disabledDate={disabledDate}
                style={{ visibility: 'hidden', width: 0, padding: 0 }}
                onOpenChange={(open) => setOpen(open)}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: '100px', color: 'red' }}
                onClick={() => setOpen(!open)}
              >
                {input}
              </Button>
            </Form.Item>
            <Form.Item>
              <Menu mode="inline" style={{ height: 0 }} className="border-6">
                <SubMenu
                  title="Số khách"
                  style={{ height: 0 }}
                  className="-mt-6 w-40 text-black "
                >
                  <Menu.Item
                    className="flex justify-between bg-gray-100 px-2 text-black"
                    key="1"
                  >
                    Người lớn
                    <InputCounter
                    ></InputCounter>
                  </Menu.Item>
                  <Menu.Item
                    className="flex justify-between bg-gray-100 px-2 text-black"
                    key="1"
                  >
                    Trẻ em<InputCounter></InputCounter>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default FilterRooms;
