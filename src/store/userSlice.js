import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../constants/statuses';
import Cookies from 'js-cookie';
const initialState = {
  user: '',
  status: STATUSES.IDLE,
  authSuccess: false,
  authErrors: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload;
        if (!action.payload.errors) {
          Cookies.set('token', action.payload.data.token);
          state.authSuccess = true;
        } else {
          state.authSuccess = false;
          state.authErrors = action.payload.errors;
          Cookies.set('token', '');
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.authErrors = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload;
        if (!action.payload.errors) {
          Cookies.set('token', action.payload.data.token);
          state.authSuccess = true;
        } else {
          state.authSuccess = false;
          state.authErrors = action.payload.errors;
          Cookies.set('token', '');
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default userSlice.reducer;

export const login = createAsyncThunk('user/login', async (creds) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });
  return await res.json();
});

export const signup = createAsyncThunk('user/signup', async (creds) => {
  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds),
  });
  return await res.json();
});
