import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavotite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload)
    },
  }
})

export const { addFavotite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer;