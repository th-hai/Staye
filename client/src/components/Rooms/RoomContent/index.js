import { React } from 'react';
import { Button, DatePicker, InputNumber } from 'antd';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Typography, Divider } from 'antd';
import SmartText from 'components/Text/SmartText';
import moment from 'moment';

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day').subtract(1, 'days');
}

const RoomContent = (props) => {
  const { room } = props;
  const { RangePicker } = DatePicker;

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
                    className={`px-2 mb-2 mr-2 rounded-lg ${
                      room?.status === 'Available'
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
                <p className="text-md">Pick your dates</p>
                <RangePicker disabledDate={disabledDate} />
                <div className="my-4">
                  <InputNumber
                    inline
                    defaultValue={1}
                    min={1}
                    max={room?.maximumGuests}
                  />
                  <span className="text-md font-bold"> Guests</span>
                </div>
                <Button type="primary" block className="my-4">
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
