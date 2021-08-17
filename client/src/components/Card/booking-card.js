import React from 'react';
import moment from 'moment';
import {
  faCalendarDay,
	faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BookingCard = (props) => {
	const { booking } = props
	return (
		<section className="w-full h-full antialiased font-sans shadow-xl">
			{booking &&
				<div className="max-w-sm w-full">
					<div className="bg-cover bg-center h-56 p-4" style={{
						backgroundImage: `url(${booking?.room?.photos[0]})`,
					}}>
						<div className="flex justify-end">
							<svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
							</svg>
						</div>
					</div>
					<div className="p-4" style={{ minHeight: 130 }}>
						<p className="uppercase tracking-wide text-sm font-bold text-gray-700">{booking?.room?.name}</p>
						<p className="text-3xl text-gray-900">{booking.total.toLocaleString('it-IT')}₫</p>
						<p className="text-gray-700">{booking?.room?.address}</p>
					</div>
					<div className="flex p-4 border-t border-gray-300 text-gray-700">
						<div className="flex-1 inline-flex items-center">
							<FontAwesomeIcon icon={faCalendarDay} size="lg" className="w-8 -ml-1 mr-1" />
							<p className="text-gray-900 font-bold">{moment(booking?.from)?.format('DD/MM/YYYY')}</p>
						</div>
						<span className="flex-grow font-bold text-center"> to </span>
						<div className="flex-1 inline-flex items-center">
						<FontAwesomeIcon icon={faCalendarCheck} size="lg" className="w-8 -ml-1 mr-1" />
							<p className="text-gray-900 font-bold">{moment(booking?.to)?.format('DD/MM/YYYY')}</p>
						</div>
					</div>
					<div className="px-4 pt-3 pb-4 border-t border-gray-300">
						<div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Host</div>
						{booking?.room?.owner ? <>
							<div className="flex items-center pt-2">
								<div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style={{
									backgroundImage: `url(${booking?.room?.owner?.avatar})`,
								}}>
								</div>
								<div>
									<p className="font-bold text-gray-900">{booking?.room?.owner?.name}</p>
									<p className="text-sm text-gray-700">{booking?.room?.owner?.email}</p>
								</div>
							</div>
						</> : <span> No information</span>}
					</div>
				</div>
			}
		</section>
	);
};

export default BookingCard;
