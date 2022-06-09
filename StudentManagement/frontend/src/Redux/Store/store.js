import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "../Events/reducer";
import AuthReducer from "../Auth/AuthReducer";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    auth: AuthReducer,
  },
});
