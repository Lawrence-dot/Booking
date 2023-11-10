import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import tokenReducer from "../src/Components/Auth/TokenSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
