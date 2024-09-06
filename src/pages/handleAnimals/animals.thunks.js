import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const getAnimals = createAsyncThunk(
  "/animals/getAnimal",
  async (_, ThunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/animals`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${API_KEY}`,
        },
      });
      const data = await res.json();
      if (data) return ThunkAPI.fulfillWithValue(data.items);
    } catch (error) {
      return ThunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const fetchAnimals = async () => {
  const response = await fetch(`${API_URL}/api/v1/animals`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
};

export const postAnimal = createAsyncThunk(
  "animals/postAnimal",
  async (newAnimal, { rejectWithValue }) => {
    try {
      const { items: animals } = await fetchAnimals();

      const existingAnimal = animals.find(
        (animal) => animal.name.toLowerCase() === newAnimal.name.toLowerCase()
      );

      if (existingAnimal) {
        return rejectWithValue({
          message: "An animal with this name already exists.",
        });
      }

      const response = await fetch(`${API_URL}/api/v1/animals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify([newAnimal]),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "An error occurred while posting the animal.",
      });
    }
  }
);

export const updateAnimal = createAsyncThunk(
  "animals/updateAnimal",
  async (updatedAnimal, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/animals/${updatedAnimal.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify(updatedAnimal),
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
