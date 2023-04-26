import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from './userSlice';

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
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  }
);

export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async (expenseBody) => {
    const token = getCookie('token');
    const res = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${token}`,
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
