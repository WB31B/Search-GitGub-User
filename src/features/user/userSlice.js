import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  value: '',
}

export const getUser = createAsyncThunk(
  'users/getUser',
  async (name, { rejectWithValue, dispatch }) => {
    const res = await axios.get(`https://api.github.com/users/${name}`);
    dispatch(setUser(res.data));
  }
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
  },
  extraReducers: {
    [getUser.fulfilled]: () => console.log('fulfilled'),
    [getUser.pending]: () => console.log('pending'),
    [getUser.rejected]: () => console.log('rejected'),
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
