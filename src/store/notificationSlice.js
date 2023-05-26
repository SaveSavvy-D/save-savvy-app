import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';
import { fetchStateHelper, rejectStateHelper } from '../utils/reduxStateHelper';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  errors: [],
};

export const fetchNotifications = createAsyncThunk(
  'expense/fetchNotifications',
  async () => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/notifications/my`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await res.json();
  }
);

export const updateNotification = createAsyncThunk(
  'expense/updateNotification',
  async ({ id, updatedBody }, { getState }) => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}notifications/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBody),
      }
    );
    const response = await res.json();
    const currentState = getState().notification;

    const updatedState = currentState?.data?.notifications?.map((obj) => {
      if (obj._id === response.data.notification._id) {
        return response.data.notification;
      }
      return obj;
    });

    return { notifications: updatedState };
  }
);

export const deleteNotification = createAsyncThunk(
  'expense/deleteNotification',
  async ({ id }, { getState }) => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/notifications/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await res.json();
    const currentState = getState().notification;

    const updatedState = currentState?.data?.notifications?.filter((obj) => {
      return obj._id !== id;
    });

    return { notifications: updatedState };
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        fetchStateHelper(state, action.payload);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(updateNotification.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.data = action.payload;
      })
      .addCase(updateNotification.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(deleteNotification.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.data = action.payload;
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default notificationSlice.reducer;
