import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../utils/cookie';
import { STATUSES } from '../constants/statuses';
import { fetchStateHelper, rejectStateHelper } from '../utils/reduxStateHelper';

const initialState = {
  data: [],
  status: STATUSES.IDLE,
  errors: [],
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
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        fetchStateHelper(state, action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        rejectStateHelper(state);
      });
  },
});

export default categorySlice.reducer;
