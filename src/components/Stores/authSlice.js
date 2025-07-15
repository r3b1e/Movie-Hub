import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        items: [],
    },
    reducers: {
        addAuth: (state, action) => {
            state.items.push(action.payload);
        },
        removeAuth: (state, action) => {
            state.items.length = 0;
        }
    }
})

export const {addAuth, removeAuth} = authSlice.actions;
export default authSlice.reducer;
