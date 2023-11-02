import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loguser: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loguser, logout } = loginSlice.actions

export default loginSlice.reducer