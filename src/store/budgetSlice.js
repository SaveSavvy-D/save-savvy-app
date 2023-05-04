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
  errors: [],
};

export const fetchBudgets = createAsyncThunk(
  'budget/fetchBudgets',
  async (pageNum = 1) => {
    const queryParams = new URLSearchParams({ page: pageNum });
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/budgets/my?${queryParams}`,
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

export const createBudget = createAsyncThunk(
  'budget/createBudget',
  async ({ newData }) => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/budgets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    return await res.json();
  }
);

export const updateBudget = createAsyncThunk(
  'budget/updateBudget',
  async ({ id, newData }) => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/budgets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    return await res.json();
  }
);

export const deleteBudget = createAsyncThunk(
  'budget/deleteBudget',
  async ({ id }) => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/budgets/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  }
);

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        fetchStateHelper(state, action.payload);
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(createBudget.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(createBudget.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(updateBudget.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(updateBudget.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(deleteBudget.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default budgetSlice.reducer;
