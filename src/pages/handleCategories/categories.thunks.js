import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_API_URL;

export const getCategories = createAsyncThunk(
  "/categories/getCategory",
  async (_, ThunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/categories`, {
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

const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/api/v1/categories`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

export const postCategory = createAsyncThunk(
  "categories/postCategory",
  async (newCategory, { rejectWithValue }) => {
    try {
      const { items: categories } = await fetchCategories();

      const existingCategory = categories.find(
        (category) =>
          category.title.toLowerCase() === newCategory.title.toLowerCase()
      );

      if (existingCategory) {
        return rejectWithValue({
          message: "A category with this name already exists.",
        });
      }

      const response = await fetch(`${API_URL}/api/v1/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify([newCategory]),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.message || "An error occurred while posting the category.",
      });
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (updatedCategory, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/categories/${updatedCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({
        message: "An error occurred while updating the animal.",
      });
    }
  }
);
