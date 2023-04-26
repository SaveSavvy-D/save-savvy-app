import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../constants/statuses";

const initialState = {
  data: [],
  status: STATUSES.IDLE
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
})

export default userSlice.reducer;
