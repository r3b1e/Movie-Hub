import { createSlice } from "@reduxjs/toolkit";

const recomendationSlice = createSlice({
    name: "recomend",
    initialState: {
        items: null,
    },
    reducers: {
        addRecomend :(state, action) => {
            state.items = action.payload;
        },
        deleteRecomend : (state, action) => {
            return {items: null};
        }
    }
});

export const {addRecomend, deleteRecomend} = recomendationSlice.actions;
export default recomendationSlice.reducer;