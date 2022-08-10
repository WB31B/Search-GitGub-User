import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

const initialState = {
  repos: '',
}

export const getRepos = createAsyncThunk(
  'repos/getRepos',
  async (name, { rejectWithValue, dispatch }) => {
    const res = await axios.get(`https://api.github.com/users/${name}/repos`);
    dispatch(setRepos(res.data));
  }
)

export const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    setRepos: (state, action) => {
      state.repos = action.payload
    },
    // toggleRepos: (state, action) => {
    //   state.toggle = !action.payload
    // },
  },
  extraReducers: {
    [getRepos.fulfilled]: () => console.log('fulfilled'),
    [getRepos.pending]: () => console.log('pending'),
    [getRepos.rejected]: () => console.log('rejected'),
  }
})

export const { setRepos } = reposSlice.actions
export default reposSlice.reducer