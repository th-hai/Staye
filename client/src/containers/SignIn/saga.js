import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from '../App/constants';
import authService from '../../services/authService';
import {
  loginFailed,
  loginSuccess,
  updateUserFailed,
  updateUserSuccess,
} from '../App/actions';
import { getErrorMessage } from 'utils/responseUtils';
import * as userServices from 'services/userClientService';
export function* loginSaga({ email, password, history }) {
  try {
    const { data } = yield call(authService.login, email, password);
    yield put(loginSuccess(data.tokens.access.token, data.user, history));
  } catch (error) {
    yield put(loginFailed(getErrorMessage(error)));
  }
}

export function* updateUserTask({ id, user }) {
  try {
    const { data } = yield call(userServices.updateUser, id, user);
    yield put(updateUserSuccess(data));
  } catch (error) {
    yield put(updateUserFailed(getErrorMessage(error)));
  }
}

export function* updateUserSuccessTask() {
  message.success('Updated User');
}

export function* failedTask({ error }) {
  console.log("failedtask")
  message.error(error);
}

export function* loginSuccessSaga({ history }) {
  history.replace({ from: { pathname: '/' } });
}

export default function* loginPageSaga() {
  yield all([
    takeLatest(LOGIN, loginSaga),
    takeLatest(LOGIN_SUCCESS, loginSuccessSaga),
    takeLatest(UPDATE_USER, updateUserTask),
    takeLatest(UPDATE_USER_SUCCESS, updateUserSuccessTask),
    takeLatest([UPDATE_USER_FAILED, LOGIN_FAILED], failedTask),
  ]);
}
