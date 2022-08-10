import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from '../features/favorites/favoritesSlice';
import reposSlice from '../features/repos/reposSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesSlice,
    user: userSlice,
    repos: reposSlice
  }
})