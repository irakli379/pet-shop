import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  postCategory,
  updateCategory,
} from "./categories.thunks";

const categoriesInitialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "animals",
  initialState: categoriesInitialState,
  reducers: {
    loaderTrue(state) {
      state.loading = true;
    },
    loaderFalse(state) {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.error = null;
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.loading = false;
        alert("A category with this title already exists.");
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (animal) => animal.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload; // Update the animal data in the array
        }
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
// export const { loaderFalse, loaderTrue } = categoriesSlice.actions;
