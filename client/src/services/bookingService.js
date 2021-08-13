import request from '../utils/request';

export function getAllBookings() {
  return request.get('/v1/bookings?limit=1000');
}

export function getBooking(id) {
  return request.get(`/v1/bookings/${id}`);
}

export function createBooking(booking) {
  return request.post('/v1/bookings', booking);
}

export function updateBooking(id, booking) {
  return request.patch(`/v1/bookings/${id}`, booking);
}

export function deleteBooking(id) {
  return request.del(`/v1/bookings/${id}`);
}

export function cancelBooking(id) {
  return request.get(`/v1/bookings/${id}/cancel`);
}

export function getBookingsByOwner(id) {
  return request.get(`/v1/bookings/owners/${id}`);
}
