import { createSelector } from 'reselect';
const selectRegister = state => state.register;

const makeSelectIsPending = () => 
createSelector(
    selectRegister,
    register => register && register.pending
)

const makeSelectIsSuccessful = () => 
createSelector(
    selectRegister,
    register => register && register.successful
)
export {
    makeSelectIsPending,
    makeSelectIsSuccessful
}