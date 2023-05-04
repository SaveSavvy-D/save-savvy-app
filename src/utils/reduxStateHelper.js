import { showNotification } from './notificationHelper';
import ToastColors from '../constants/toastColors';
import { STATUSES } from '../constants/statuses';

export const modifyStateHelper = (state, response) => {
  if (!response?.errors) {
    state.data = null;
    showNotification(response?.message, ToastColors.success);
  } else {
    state.status = STATUSES.ERROR;
    state.errors = response?.errors;
  }
};

export const fetchStateHelper = (state, response) => {
  if (!response?.errors) {
    state.data = response?.data;
    state.status = STATUSES.IDLE;
  } else {
    state.status = STATUSES.ERROR;
    state.errors = response?.errors;
  }
};

export const rejectStateHelper = (state) => {
  state.status = STATUSES.ERROR;
  state.errors = [{ msg: 'Something went wrong, please try again' }];
};
