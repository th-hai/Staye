export const PageAbout = () => {
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
        <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold tracking-tight text-gray-800 sm:text-4x1 sm:leading-none md:mb-6 group">
          <span className="inline-block mb-1 sm:mb-4">
            STAYE
            <br className="hidden md:block" />
            Always With You Every Trip
          </span>
          <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
        </h2>
        <p className="text-gray-800 lg:text-sm lg:max-w-md">
        With many years of operation in the business of motel and hotel services, Staye is confident to bring you the best experiences for your travel. Staye is committed to connecting you with the best homestays and hotels around Vietnam.
        </p>
      </div>
      <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/4652275/pexels-photo-4652275.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500;cs=tinysrgb&amp;dpr=2&amp;w=500"
              alt=""
            />
            <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
              <p className="mb-4 text-lg font-bold text-gray-100">Spread all over Vietnam</p>
              <p className="text-sm tracking-wide text-gray-300">
              With many years of operation, Staye system has more than 500 hotels, motels and resorts available on the system for you to freely choose. With the payment from north to south, we are confident to help you comfortably choose where to stay during your trip.
              </p>
            </div>
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/2582757/pexels-photo-2582757.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
            <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
              <p className="mb-4 text-lg font-bold text-gray-100">
              Fast and Convenient
              </p>
              <p className="text-sm tracking-wide text-gray-300">
              Coming to Staye, you only need a few simple steps to choose a suitable room for your trip, friends and family. You can rest assured to book a room in advance through our system, avoiding the situation of running out of rooms during the tourist season.
              </p>
            </div>
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/2965773/pexels-photo-2965773.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
            <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
              <p className="mb-4 text-lg font-bold text-gray-100">Service Quality</p>
              <p className="text-sm tracking-wide text-gray-300">
              Coming to Staye, all motels, hotels, resorts, ... have been carefully selected for services, facilities, prices,... You can rest assured when information What we bring to you is absolutely accurate, the most honest.
              </p>
            </div>
          </div>
        </a>
        <a href="/" aria-label="View Item">
          <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
            <img
              className="object-cover w-full h-56 md:h-64 xl:h-80"
              src="https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt=""
            />
            <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
              <p className="mb-4 text-lg font-bold text-gray-100">
              Endless Efforts
              </p>
              <p className="text-sm tracking-wide text-gray-300">
              Over the years, we have always tried our best, to make your trip always the best memories, there have been many customer reviews on the Home page. Staye hopes to bring the best services to customers more and more.
              </p>
            </div>
          </div>
        </a>
      </div>
      <div className="text-center">
        <a
          href="/login"
          aria-label=""
          className="inline-flex text-2xl items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          Experience now
          <svg
            className="inline-block w-3 ml-2"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
          </svg>
        </a>
      </div>
    </div>


    );
  };
  export default PageAbout