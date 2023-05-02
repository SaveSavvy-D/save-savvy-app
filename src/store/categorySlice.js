import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';

const initialState = {
  data: [],
  categoryStatus: STATUSES.IDLE,
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const token =
      getCookie('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsiX2lkIjoiNjQyZmY0MjdhYTNhYmY0NzVhM2QzOTBhIiwiZW1haWwiOiJoYXJvb24ub21lckBkZXZzaW5jLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEyJFpUZ0tvbmJuUUFtOHdnU3Y5eGJ1WE9iSjcubXd6TWZ1ck52bXhmckgybkt0UHdFY2g4Mm4uIiwiX192IjowfSwiaWF0IjoxNjgzMDAzNDk0LCJleHAiOjE2ODMwMzk0OTR9.hUG_W3b5sdTlPAtdW4TrGlvvEyWE6MLYWWd1Vkq0QxI';

    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(token, data);
    return data;
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.categoryStatus = STATUSES.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.categoryStatus = STATUSES.IDLE;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryStatus = STATUSES.ERROR;
      });
  },
});

export default categorySlice.reducer;
