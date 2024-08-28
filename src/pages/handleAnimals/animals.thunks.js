import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAnimals = createAsyncThunk(
  "/animals/getAnimal",
  async (_, ThunkAPI) => {
    try {
      const res = await fetch("api/v1/animals", {
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

export const postAnimal = createAsyncThunk(
  "animals/postAnimal",
  async (newAnimal, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify([newAnimal]),
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
        message: "An error occurred while posting the animal.",
      });
    }
  }
);

export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async (updatedAnimal, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/v1/animals/${updatedAnimal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify(updatedAnimal),
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
