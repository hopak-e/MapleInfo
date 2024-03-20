import { configureStore } from "@reduxjs/toolkit";
import darkSlice from "./darkSlice";
import tabSlice from "./tabSlice";

const store = configureStore({
  reducer: {
    dark: darkSlice.reducer,
    tab: tabSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
