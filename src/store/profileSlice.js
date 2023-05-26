import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../constants/statuses';
import { getCookie } from '../utils/cookie';

const initialState = {
  profile: null,
  status: STATUSES.IDLE,
  errors: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (!action.payload.errors && action.payload.status) {
          state.profile = action.payload.data.profile;
        } else if (action.payload.errors) {
          state.status = STATUSES.ERROR;
          state.errors = action.payload.errors;
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(createProfile.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (!action.payload.errors && action.payload.status) {
          state.profile = action.payload.data.profile;
        }
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (!action.payload.errors && action.payload.status) {
          state.profile = action.payload.data.profile;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(deleteProfile.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        if (!action.payload.errors && action.payload.status) {
          state.profile = null;
        }
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default profileSlice.reducer;

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }
);

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (payload) => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (payload) => {
    const token = getCookie('token');
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/profile/${payload._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload.values),
      }
    );
    return await res.json();
  }
);

export const deleteProfile = createAsyncThunk(
  'expense/deleteExpense',
  async () => {
    const token = getCookie('token');
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/profile`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }
);
