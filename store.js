import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user'; // Assure-toi que le chemin est correct

const store = configureStore({
  reducer: {
    user: userReducer,
    // Ajoute d'autres reducers si nécessaire
  },
});

export default store;
