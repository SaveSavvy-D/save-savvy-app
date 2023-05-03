import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';

const initialState = {
  data: [],
  categoryStatus: STATUSES.IDLE,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const token = getCookie('token') || process.env.REACT_APP_AUTH_TOKEN;
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/categories/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
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
        state.data = action.payload?.data?.categories;
        state.categoryStatus = STATUSES.IDLE;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryStatus = STATUSES.ERROR;
      });
  },
});

export default categorySlice.reducer;
