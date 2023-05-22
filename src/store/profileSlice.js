import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from '../constants/statuses';
import { getCookie } from '../utils/cookie';

const initialState = {
  profile: null,
  status: STATUSES.IDLE,
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
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        console.log(action);
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
        console.log(action);
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
        console.log(action);
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
        console.log(action);
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
    const data = await res.json();
    return data;
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
    const data = await res.json();

    return data;
  }
);
