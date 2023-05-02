import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
};

export const fetchBudgets = createAsyncThunk(
  'expense/fetchBudgets',
  async (pageNum = 1) => {
    const queryParams = new URLSearchParams({ page: pageNum });

    const token =
      getCookie('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiX2lkIjoiNjQyZmY0MjdhYTNhYmY0NzVhM2QzOTBhIiwiZW1haWwiOiJoYXJvb24ub21lckBkZXZzaW5jLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJFpUZ0tvbmJuUUFtOHdnU3Y5eGJ1WE9iSjcubXd6TWZ1ck52bXhmckgybkt0UHdFY2g4Mm4uIiwiX192IjowfSwiaWF0IjoxNjgzMDAzNDk0LCJleHAiOjE2ODMwMzk0OTR9.hUG_W3b5sdTlPAtdW4TrGlvvEyWE6MLYWWd1Vkq0QxI';

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
    const data = await res.json();
    console.log(token, data);
    return data;
  }
);

export const updateBudget = createAsyncThunk(
  'expense/updateBudget',
  async ({ id, newData }) => {
    const token =
      getCookie('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiX2lkIjoiNjQyZmY0MjdhYTNhYmY0NzVhM2QzOTBhIiwiZW1haWwiOiJoYXJvb24ub21lckBkZXZzaW5jLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJFpUZ0tvbmJuUUFtOHdnU3Y5eGJ1WE9iSjcubXd6TWZ1ck52bXhmckgybkt0UHdFY2g4Mm4uIiwiX192IjowfSwiaWF0IjoxNjgzMDAzNDk0LCJleHAiOjE2ODMwMzk0OTR9.hUG_W3b5sdTlPAtdW4TrGlvvEyWE6MLYWWd1Vkq0QxI';

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/budgets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    });

    const data = await res.json();
    console.log(token, data);
    return data;
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
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
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
      });
  },
});

export default budgetSlice.reducer;
