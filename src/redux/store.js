import animalsReducer from "../pages/handleAnimals/animalsSlice";
import categoriesReducer from "../pages/handleCategories/categoriesSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    an: animalsReducer,
    ca: categoriesReducer,
  },
});

export default store;
