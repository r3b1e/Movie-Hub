import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeItems: (state, action) => {
      if (Array.isArray(state.items)) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});
export const { addItems, removeItems } = detailSlice.actions;
export default detailSlice.reducer;
