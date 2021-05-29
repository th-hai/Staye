import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message as antMessage } from 'antd';
import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from '../App/constants';
import authService from '../../services/authService';
import { loginFailed, loginSuccess } from '../App/actions';
import { getErrorMessage } from '../../utils/responseUtils';

function* loginSaga({ email, password, history }) {
  try {
    const {data} = yield call(authService.login, email, password);
    yield put(loginSuccess(data.tokens.access.token, data.user, history));
  } catch (e) {
    yield put(loginFailed(email, getErrorMessage(e)));
  }
}

function* loginFailedSaga({ message }) {
  antMessage.error(message);
}

function* loginSuccessSaga({ history }) {
  history.replace({ from: { pathname: '/' } });
}

export default function* loginPageSaga() {
  yield all([
    takeLatest(LOGIN, loginSaga),
    takeLatest(LOGIN_FAILED, loginFailedSaga),
    takeLatest(LOGIN_SUCCESS, loginSuccessSaga),
  ]);
}
