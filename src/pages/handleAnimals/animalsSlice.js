import { createSlice } from "@reduxjs/toolkit";
import { getAnimals, postAnimal, updateAnimal } from "./animals.thunks";

const animalsInitialState = {
  animals: [],
  loading: false,
  error: null,
};

const animalsSlice = createSlice({
  name: "animals",
  initialState: animalsInitialState,
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
      .addCase(getAnimals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.animals = action.payload;
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(postAnimal.fulfilled, (state, action) => {
        state.loading = false;
        state.animals.push(action.payload);
        state.error = null;
      })
      .addCase(postAnimal.rejected, (state, action) => {
        state.loading = false;
        alert("Animal with that name already exists");
        state.error = action.payload?.message || "Failed to add the animal.";
      })
      .addCase(updateAnimal.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.animals.findIndex(
          (animal) => animal.id === action.payload.id
        );
        if (index !== -1) {
          state.animals[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default animalsSlice.reducer;
export const { loaderFalse, loaderTrue } = animalsSlice.actions;
