import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  'expense/fetchBudgets',
  async (pageNum = 1) => {
    const queryParams = new URLSearchParams({ page: pageNum });

    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/expenses/my?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    return data;
  }
);

export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async (expenseBody) => {
    console.log(expenseBody);
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/expenses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expenseBody),
    });
    const data = await res.json();

    return data;
  }
);

export const updateExpense = createAsyncThunk(
  'expense/updateExpense',
  async ({ id, updatedBody }) => {
    console.log(updatedBody, id);
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/expenses/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBody),
      }
    );
    const data = await res.json();

    return data;
  }
);

export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async ({ id }) => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/expenses/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    return data;
  }
);

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
        state.error = action.payload;
      })
      .addCase(createExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.data?.data?.expenses?.push(action.payload?.data?.expense);
        state.status = STATUSES.IDLE;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(updateExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.data?.data?.expenses?.push(action.payload?.data?.expense);
        state.status = STATUSES.IDLE;
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;
