import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';
import {
  fetchStateHelper,
  modifyStateHelper,
  rejectStateHelper,
} from '../utils/reduxStateHelper';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  errors: [],
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
        fetchStateHelper(state, action.payload);
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(createExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(updateExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(updateExpense.rejected, (state, action) => {
        rejectStateHelper(state);
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        modifyStateHelper(state, action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default expenseSlice.reducer;
