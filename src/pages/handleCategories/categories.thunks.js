import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "/categories/getCategory",
  async (_, ThunkAPI) => {
    try {
      const res = await fetch("api/v1/categories", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      });
      const data = await res.json();
      if (data) return ThunkAPI.fulfillWithValue(data.items);
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const postCategory = createAsyncThunk(
  "categories/postCategory",
  async (newCategory, { getState, rejectWithValue }) => {
    const { categories } = getState().categories;

    // Check if an animal with the same name (case-insensitive) already exists
    const existingcategory = categories.find(
      (category) =>
        category.name.toLowerCase() === newCategory.name.toLowerCase()
    );

    if (existingcategory) {
      return rejectWithValue({
        message: "A category with this name already exists.",
      });
    }
    try {
      const response = await fetch("/api/v1/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify([newCategory]),
      });

      if (!response.ok) {
        // If the response status is not ok, reject the request
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Catch any other errors and reject with a generic message
      return rejectWithValue({
        message: "An error occurred while posting the category.",
      });
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (updatedCategory, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/categories/${updatedCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify(updatedCategory),
      });

      if (!response.ok) {
        // If the response status is not ok, reject the request
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Catch any other errors and reject with a generic message
      return rejectWithValue({
        message: "An error occurred while updating the animal.",
      });
    }
  }
);
