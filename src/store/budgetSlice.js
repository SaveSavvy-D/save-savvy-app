import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  error: null,
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
        state.data = action.payload?.data;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(createBudget.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.data?.data?.budgets?.push(action.payload?.data?.budget);
        state.status = STATUSES.IDLE;
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(updateBudget.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(deleteBudget.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default budgetSlice.reducer;
