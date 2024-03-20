import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  tab: string;
}

const initialState: TabState = {
  tab: "메인",
};

const tabSlice = createSlice({
  name: "tabSlice",
  initialState,
  reducers: {
    toggleTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
  },
});

export const { toggleTab } = tabSlice.actions;
export default tabSlice;
