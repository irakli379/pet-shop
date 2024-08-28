import { createSlice } from "@reduxjs/toolkit";
import { getAnimals, postAnimal } from "./animals.thunks";

const animalsInitialState = {
  animals: [],
  loading: false,
  error: null,
};

//   id: "",
//   name: "",
//   price: "",
//   description: "",
//   isPopular: false,
//   stock: false,
//   habitat: "",
//   domestic: false,
//   carnivore: false,
//   endangered: false,

const animalsSlice = createSlice({
  name: "animals",
  initialState: animalsInitialState,
  reducers: {},
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
        state.error = action.payload;
      });
  },

  //   {
  //     [getAnimals.pending.type]: (state) => {
  //       state.loading = true;
  //     },
  //     [getAnimals.fulfilled.type]: (state, action) => {
  //       state.loading = false;
  //       state.error = null;
  //       state.animals = action.payload;
  //     },
  //     [getAnimals.rejected.type]: (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     },
  //   },
});

export default animalsSlice.reducer;

// export const { addAnimal } = animalsSlice.actions;

// export default function animalsReducer(state = animalsInitialState, action) {
//   switch (action.type) {
//     case "animal/add":
//       return { ...state, animals: [...state.animals, action.payload] };
//     default:
//       return state;
//   }
// }

// export function addAnimal(animal) {
//   return { type: "animal/add", payload: animal };
// }
