import { takeLatest, put, call, all, take } from 'redux-saga/effects';
import * as services from '../../services/userClientService';
import { message } from 'antd';
import { getErrorMessage } from '../../utils/responseUtils';
import {
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from './constants';

import { updateUserFailed, updateUserSuccess } from './actions';

export function* updateUserTask({ id, user }) {
  try {
    const { data } = yield call(services.updateUser, id, user);
    yield put(updateUserSuccess(data));
  } catch (error) {
    yield put(updateUserFailed(getErrorMessage(error)));
  }
}

export function* updateUserSuccessTask() {
  message.success('Update profile successfully');
  yield 
}
export function* failedTask({ error }) {
  message.error(error);
}
export default function* userProfileSaga() {
  yield all([
    takeLatest(UPDATE_USER, updateUserTask),
    takeLatest(UPDATE_USER_SUCCESS, updateUserSuccessTask),
    takeLatest([UPDATE_USER_FAILED], failedTask),
  ]);
}
