import { configureStore } from '@reduxjs/toolkit';
import form from './reducers/Form/Form';

export const store = configureStore({
  reducer: {
    app: form
  },
  devTools: true
});

window.store = store;
