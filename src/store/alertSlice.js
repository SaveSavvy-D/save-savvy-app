import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';
import {
  modifyStateHelper,
  fetchStateHelper,
  rejectStateHelper,
} from '../utils/reduxStateHelper';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  error: [],
};

export const fetchBudgetAlerts = createAsyncThunk(
  'alert/fetchBudgetAlerts',
  async (budgetId, pageNum = 1) => {
    const queryParams = new URLSearchParams({ page: pageNum });
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/alerts/budget/${budgetId}?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    return data;
  }
);

export const createAlert = createAsyncThunk(
  'alert/createAlert',
  async ({ newData }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/alerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    console.log(data);
    return data;
  }
);

export const updateAlert = createAsyncThunk(
  'alert/updateAlert',
  async ({ id, newData }) => {
    console.log(id);
    console.log(newData);
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}alerts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    console.log(data);
    return data;
  }
);

export const deleteAlert = createAsyncThunk(
  'alert/deleteAlert',
  async ({ id }) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/alerts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }
);

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetAlerts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBudgetAlerts.fulfilled, (state, action) => {
        fetchStateHelper(state, action.payload);
      })
      .addCase(fetchBudgetAlerts.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(createAlert.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(createAlert.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(updateAlert.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateAlert.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(updateAlert.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(deleteAlert.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteAlert.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(deleteAlert.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default alertSlice.reducer;
