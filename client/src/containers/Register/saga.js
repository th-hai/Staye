import { all, takeLatest, call, put } from 'redux-saga/effects';
import { message } from 'antd';
import * as services from '../../services/userClientService';
import { getErrorMessage } from '../../utils/responseUtils';
import { REGISTER, REGISTER_FAILED, REGISTER_SUCCESS } from './constants';
import { registerFailed, registerSuccess } from './actions';
export function* registerUser({ user }) {
  try {
    const { data } = yield call(services.createUser, user);
    yield put(registerSuccess(data));
  } catch (error) {
    yield put(registerFailed(getErrorMessage(error)));
  }
}

export function* registerUserSuccessTask() {
  message.success('Register successfully!');
}

export function* failedTask({ error }) {
  message.error(error);
}

export default function* registerUserSaga() {
    yield all([
        takeLatest(REGISTER, registerUser),
        takeLatest(REGISTER_SUCCESS, registerUserSuccessTask),
        takeLatest([
            REGISTER_FAILED
        ], failedTask),
    ]);
}