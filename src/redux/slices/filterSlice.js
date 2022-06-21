import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  selectedSortType: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSelectedSortType: (state, action) => {
      state.selectedSortType = action.payload;
    },
  },
});

export const { setActiveCategory, setSelectedSortType } = filterSlice.actions;

export default filterSlice.reducer;
