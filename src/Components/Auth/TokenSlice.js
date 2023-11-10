import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    savetoken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { savetoken } = tokenSlice.actions;

export default tokenSlice.reducer;
