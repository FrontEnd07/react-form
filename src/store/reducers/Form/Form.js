import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  form: null
};

const form = createSlice({
  name: 'form',
  initialState,
  reducers: {
    formAC(state, action) {
      state.form = action.payload;
    }
  }
});

export const { formAC } = form.actions;
export default form.reducer;
