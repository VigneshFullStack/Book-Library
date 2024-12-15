import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "../../api/Api";

// Fetch all genres
export const fetchGenres = createAsyncThunk(
  "genres/fetchGenres",
  async () => {
    try {
      const response = await baseApi.get("/Genre");
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Fetch a genre by ID
export const fetchGenreById = createAsyncThunk(
  "genres/fetchGenreById",
  async (genreId) => {
    try {
      const response = await baseApi.get(`/Genre/${genreId}`);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Add a new genre
export const addGenre = createAsyncThunk(
  "genres/addGenre",
  async (genreData) => {
    try {
      const response = await baseApi.post("/Genre", genreData);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Update an existing genre
export const updateGenre = createAsyncThunk(
  "genres/updateGenre",
  async (genreData) => {
    try {
      const response = await baseApi.put(`/Genre/${genreData.genreId}`, genreData);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Delete a genre
export const deleteGenre = createAsyncThunk(
  "genres/deleteGenre",
  async (genreId) => {
    try {
      await baseApi.delete(`/Genre/${genreId}`);
      return genreId;
    } catch (error) {
      alert(error.response?.data?.message);
      throw new Error("Failed to delete genre: " + error.response.data);
    }
  }
);