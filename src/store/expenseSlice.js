import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(createExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default expenseSlice.reducer;

//thunks

export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async () => {
    const token = getCookie('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiX2lkIjoiNjQzOTUzZTcxYmYwMDk5ZjBhYThmNmU0IiwiZW1haWwiOiJtdWhhbW1hZC5oYXNlZWJAZGV2c2luYy5jb20iLCJwYXNzd29yZCI6IiQyYSQxMiRGb1ZLZEwvWXBDWW9TNU1hNmR3WnlPQVJCcmxxTEVhVHJ1TjgzT2VXLmxzeUwuZ3p4WkFkSyIsIl9fdiI6MH0sImlhdCI6MTY4MjU4NTc2MSwiZXhwIjoxNjgyNjIxNzYxfQ.EYFtPaeKV1ygOzM9TcZM5bwt6S0OXH8jdAmAH9XowFE';
    console.log(`${process.env.REACT_APP_BASE_URL}expenses/my`);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/expenses/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(token, data);
    return data;
  }
);

export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async (expenseBody) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/expenses/my`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(expenseBody),
    });
    const data = await res.json();
    return data;
  }
);

export const updateExpense = createAsyncThunk(
  'expense/updateExpense',
  async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  }
);
