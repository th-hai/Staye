import React from 'react';

export const Review = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
          <img
            src="https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <a >
                traveling
              </a>
              <span className="text-gray-600">— 10 May 2021</span>
            </p>
            <a
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Sapa-Cuộc hành trình dài
            </a>
            <p className="mb-2 text-gray-700">
              Đến với Staye, nhóm 5 người chúng tôi đã có một trải nghiệm 4 ngày 5 đêm tuyệt vời. Chúng tôi đặt 2 phòng đôi với giá 600.000 vnd/đêm, khi nhận phòng chúng tôi hết sức
              ngạc nhiên với sự sạch sẽ thoáng mát và lịch sự của khách sạn nơi đây. Nhờ vào Staye chúng tôi đã có một chuyến đi đáng nhớ và tuyệt vời!!!
            </p>

          </div>
        </div>
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
          <img
            src="https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <a
                title="traveling"
              >
                traveling
              </a>
              <span className="text-gray-600">— 28 Dec 2020</span>
            </p>
            <a
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Đà Nẵng-Thành lễ hội
            </a>
            <p className="mb-2 text-gray-700">
              Nhóm mình lên kế hoạch cho chuyến đi Đà Nẵng 3 ngày, thông qua Staye chúng mình quyết định book 2 phòng đôi với giá 400.000vnd/đêm
              . Đến với Staye chúng tôi có rất nhiều sự lựa chọn về nơi nghỉ ngơi khi tới Đà Nẵng. Nhóm đã quyết định lựa chọn khách sạn gần trung tâm thành phố với view biển.
              Nhờ Staye chúng tôi đã có chuyến đi đáng nhớ.
            </p>

          </div>
        </div>
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
          <img
            src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <a>
                traveling
              </a>
              <span className="text-gray-600">— 10 June 2020</span>
            </p>
            <a
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
            >
              Đà Lạt-Thành phố mộng mơ
            </a>
            <p className="mb-2 text-gray-700">
              Mình và người yêu quyết định lên kế hoạch nghỉ dưỡng Đà Lạt 3 ngày 2 đêm, thông qua sự giới thiệu của bạn bè tôi đã tìm đến Staye
              để tìm đặt căn phòng giá cả hợp với sinh viên. Chỉ với 300.000vnd/1 đêm chúng tôi đã có thể đặt trước phòng của mình và nhận phòng ngay khi tới nơi không lo vấn đề hết phòng.
              View ở đây mình đánh giá là tạm ổn nhưng phòng và sảnh của homestay trang trí rất đẹp, hợp với những cặp đôi sống ảo như mình.
              Đây có lẽ là một chuyến đi khó quên của tụi mình, cảm ơn Staye.
            </p>
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">Ha Noi</span>
                <span className="mt-1 text-gray-500 text-sm">12 Jun 2021</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">The capital of a thousand years of civilization</h2>
                <p className="leading-relaxed">As a tourist from France to travel to Vietnam, we are very surprised to witness the beauty of your capital, the scenery is amazing. Through staye we got the room which was great for this trip.</p>
                <a className="text-indigo-500 inline-flex items-center mt-4">Tom Hiddleston.
                </a>
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">Ho Chi Minh</span>
                <span className="mt-1 text-gray-500 text-sm">5 Dec 2020</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Ho Chi Minh - The city that never sleeps.</h2>
                <p className="leading-relaxed">After coming to Ho Chi Minh, I was very surprised to encounter a new culture of your country, friendly people, great food. This is a great experience for our family, we will definitely come back to your country Vietnam.</p>
                <a className="text-indigo-500 inline-flex items-center mt-4">Bod Robinson.

                </a>
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">Hoi An </span>
                <span className="mt-1 text-gray-500 text-sm">1 Jun 2021</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Nostalgic Old Town</h2>
                <p className="leading-relaxed">Coming here, our group of 5 feels like returning to the last century, old houses, happy people, we had great experiences when coming to Vietnam, Staye also brought us hotels. great. We will come back to Vietnam and trust Staye.</p>
                <a className="text-indigo-500 inline-flex items-center mt-4">Emily.

                </a>
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">Nha Trang</span>
                <span className="mt-1 text-gray-500 text-sm">11 Jun 2019</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Beautiful Beach of Southeast Asia</h2>
                <p className="leading-relaxed">From Laos, a landlocked country, we are delighted to have the best beach in the world right next to our country. Our family of 5 had a wonderful 3 days at Nha Trang beach, with a beautiful room with sea view. Great!!!</p>
                <a className="text-indigo-500 inline-flex items-center mt-4">Thao Nhouy Abhay.
                </a>
              </div>
            </div>
            <div className="py-8 flex flex-wrap md:flex-nowrap">
              <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                <span className="font-semibold title-font text-gray-700">Vung Tau</span>
                <span className="text-sm text-gray-500">22 Nov 2020</span>
              </div>
              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">Vung Tau has beautiful scenery and friendly people.</h2>
                <p className="leading-relaxed">From Australia to Vietnam, we receive a warm and friendly welcome from the people here, who are always happy with a smile on their faces. Great beach and climate. We will be back here soon.</p>
                <a className="text-indigo-500 inline-flex items-center mt-4">Christopher
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

  );
};
export default Review