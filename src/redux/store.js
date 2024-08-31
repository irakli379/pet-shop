import animalsReducer from "../pages/handleAnimals/animalsSlice";
import cartSlice from "../pages/handleCart/cartSlice";
import categoriesReducer from "../pages/handleCategories/categoriesSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    an: animalsReducer,
    ca: categoriesReducer,
    cart: cartSlice,
  },
});

export default store;
