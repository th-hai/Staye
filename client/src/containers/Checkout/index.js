import React from 'react';
import { Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCurrency } from 'utils/formatCurrency';
import {CalendarIcon, GuestIcon, MapMarker, mapMarker} from 'utils/IconsUtils'
const Checkout = () => {
  return (
    <>
    <Row className="px-24 py-16">
      <Col xs={12} md={12}>
        <div className="text-3xl font-bold">Booking information</div>

        <div className="text-xl mt-8">Guests</div>
        <input
          value={'1 guest'}
          disabled
          type="text"
          id="full-name"
          name="full-name"
          className="mt-4 w-1/3 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ></input>

        <div className="text-xl mt-8">
          2 đêm tại The Galaxy Home - 1 Phòng Ngủ, 55m2, View Thành Phố, Ban
          Công - Dịch Vọng
        </div>

        <section className="text-gray-600 body-font">
          <div className="container py-16 mx-auto">
            <Row className="">
              <Col xs={20} md={12} lg={12} className="py-4 pr-2">
                <div className="border-2 rounded-lg border-gray-200 border-opacity-50 p-4 w-full">
                  <div className="space-y-2">
                    <div className="border-t-4 border-green-600 w-2/5"></div>
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3 w-full">
                      Nhận phòng
                    </h2>
                    <p className="text-2xl font-bold">27/06/2021</p>
                    <div className="items-center text-lg">Chủ nhật</div>
                  </div>
                </div>
              </Col>

              <Col xs={20} md={12} lg={12} className="py-4 pl-2">
                <div className="border-2 rounded-lg border-gray-200 border-opacity-50 p-4">
                  <div className="space-y-2">
                    <div className="border-t-4 border-yellow-600 w-2/5"></div>
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                      Trả phòng
                    </h2>
                    <p className="text-2xl font-bold">28/06/2021</p>
                    <div className="items-center text-lg">Thứ 2</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>
        
        <div className="text-3xl font-bold ">Your information</div>

        <div className="text-xl mt-8">Customer name</div>
        <input
          value={'Minh Quang'}
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
          value={'0865240929'}
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
          value={'lewis_quang@yahoo.com.vn'}
          disabled
          type="text"
          id="full-name"
          name="full-name"
          className="mt-4 w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ></input>
            </Col>
          </Row>
          <button className="btn btn-success rounded-lg w-full">Payment</button> 
          
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
                    The Galaxy Home - 1 Phòng Ngủ, 55m2, View Thành Phố, Ban
                    Công - Dịch Vọng
                  </div>
                  <div className="flex items-center mt-4">
                   <MapMarker/>

                    <div className="text-md font-light">
                      Cầu Giấy, Hà Nội, Vietnam
                    </div>
                  </div>
                </div>
                <div
                  className="w-full h-18 rounded-md bg-cover bg-center"
                  style={{
                    backgroundImage: `url("https://cdn.luxstay.com/admins/12/2TR6G7u6ua140zR2NI4yUJdG.png")`,
                  }}
                ></div>
              </Link>

              <div className="flex border-t border-gray-200 py-2 mt-4">
                <span className="text-gray-800 flex my-2">
                  <CalendarIcon/>
                  <div className="font-bold mx-2">2 nights</div>
                  <div className="mr-2 ">·</div> 27/06/2021 - 29/06/2021
                </span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="my-2 flex">
                  {' '}
                <GuestIcon/>
                  <div className="font-bold text-gray-800 mx-2">{`2 guests`}</div>
                </span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-4">
                <span className="text-gray-800 font-bold text-lg">
                  Rental fee 2 nights{' '}
                </span>
                <span className="ml-auto text-gray-900 text-lg">
                  {formatCurrency(1000000)} đ
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

export default Checkout;
