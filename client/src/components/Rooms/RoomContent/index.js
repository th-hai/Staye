import { React} from 'react';
import { Button, DatePicker, InputNumber } from 'antd';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Typography, Divider } from 'antd';
import SmartText from 'components/Text/SmartText'
import moment from 'moment';


function disabledDate(current) {
// Can not select days before today and today
	return current && current < moment().endOf('day').subtract(1, 'days');
}

const RoomContent = (props) => {
	const { room } = props
	const { RangePicker } = DatePicker;

	return (
		<>
			<div class="container px-5 py-24 mx-auto flex flex-col">
				<div class="lg:w-4/6 mx-auto">
					<div class="rounded-lg overflow-hidden">
						<h1 class="text-2xl font-bold">{room.name}</h1>
						<div>
							<FontAwesomeIcon icon={faMapMarkerAlt}/>
							<span class="ml-2 text-base">{room.address?.fullAddress}</span>
						</div>
					</div>
					<div class="flex flex-col sm:flex-row mt-10">
						<div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
							<div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
								<img class="w-32 rounded-full" src={room?.owner?.avatar}/>
							</div>
							<div class="flex flex-col items-center text-center justify-center">
								<div class="py-3 ml-2 text-xs font-semibold">
									<span className={`px-2 mb-2 mr-2 rounded-lg ${room?.status === 'Available' ? 'text-green-900 bg-green-300 border border-green-500' : 'text-red-900 bg-red-300 border border-red-500'}`}>{room?.status}</span>
    							</div>
								<div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
								<p class="text-lg font-bold">{room?.price?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} / night</p>
								<div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
								<p class="text-md">Pick your dates</p>
								<RangePicker disabledDate={disabledDate}/>
								<div class="my-4">
									<InputNumber inline defaultValue={1}  min={1} max={room?.maximumGuests}/>
									<span class="text-md font-bold"> Guests</span>
								</div>
								<Button type="primary" block className="my-4">
									Book now
								</Button>
								<Divider orientation="center">Amenities</Divider>
								<List className="w-100/100"
									bordered
									dataSource={room?.amenities?.map(item => item.name)}
									renderItem={item => (
										<List.Item>
										<Typography.Text >{item}</Typography.Text> 
										</List.Item>
									)}
								/>
							</div>
						</div>
						<div class=" sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
							<SmartText text={room?.description} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoomContent;



