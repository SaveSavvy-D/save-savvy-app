import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  error: null,
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

//thunks

export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async () => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/expenses/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
);

export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async (expenseBody, { dispatch }) => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
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
  async (expenseBody, { dispatch }) => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/expenses/${expenseBody.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseBody),
      }
    );
    const data = await res.json();

    return data;
  }
);

export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async (expense_id) => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/expenses/${expense_id}`,
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
