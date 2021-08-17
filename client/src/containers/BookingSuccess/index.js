import { Link } from 'react-router-dom'
export const BookingSuccess = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-1/2 lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img className="object-cover object-center rounded" alt="hero" src="https://cdn.dribbble.com/users/13754/screenshots/6763823/getting-into-homestay2_4x.png?compress=1&resize=1200x900" />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Order Successfully!
          </h1>
          <h2 className="lg:inline-block">Thanks you for choosing us</h2>
          <div className="flex justify-center mt-5">
            <Link to={`/user/${currentUser?.id}/bookings`} className="inline px-4 py-2 text-sm font-medium leading-5 text-white uppercase transition-colors duration-150 bg-green-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-green-600 hover:bg-green-700">View my booking</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookingSuccess