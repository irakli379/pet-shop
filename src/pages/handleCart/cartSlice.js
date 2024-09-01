import { createSlice } from "@reduxjs/toolkit";
import { getAnimals, updateAnimal } from "../handleAnimals/animals.thunks";

// { animalName: "", amount: 0 }

const cartInitialState = {
  animals: [],
  //   animals: { name: "", count: 0, stock: 0, id: '' },
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addOneToCart(state, action) {
      const animal = state.animals.find((anp) => anp.id === action.payload.id);
      if (animal) {
        animal.count += 1;
      }
    },
    subtractOneFromCart(state, action) {
      const animal = state.animals.find((anp) => anp.id === action.payload.id);
      if (animal) {
        animal.count -= 1;
      }
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
        // state.animals = action.payload;
        state.animals = action.payload.map((anim) => {
          return {
            name: anim.name,
            stock: anim.stock,
            count: 0,
            id: anim._uuid,
          };
        });
      })
      .addCase(getAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
          state.animals[index] = action.payload; // Update the animal data in the array
        }
        state.error = null;
      })
      .addCase(updateAnimal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const { addOneToCart, subtractOneFromCart } = cartSlice.actions;
