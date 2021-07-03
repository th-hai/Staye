import { createSelector } from 'reselect';
const selectBooking = state => state.booking;

const makeSelectIsPending = () => 
createSelector(
  selectBooking,
  booking => booking && booking.pending
)

const makeSelectIsSuccessful = () => 
createSelector(
  selectBooking,
  booking => booking && booking.successful
)
export {
  makeSelectIsPending,
  makeSelectIsSuccessful
}