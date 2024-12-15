import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "../../api/Api";

// Fetch all authors
export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    try {
      const response = await baseApi.get("/Author");
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Fetch an author by ID
export const fetchAuthorById = createAsyncThunk(
  "authors/fetchAuthorById",
  async (authorId) => {
    try {
      const response = await baseApi.get(`/Author/${authorId}`);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Add a new author
export const addAuthor = createAsyncThunk(
  "authors/addAuthor",
  async (authorData) => {
    try {
      const response = await baseApi.post("/Author", authorData);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Update an existing author
export const updateAuthor = createAsyncThunk(
  "authors/updateAuthor",
  async (authorData) => {
    try {
      const response = await baseApi.put(`/Author/${authorData.authorId}`, authorData);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Delete an author
export const deleteAuthor = createAsyncThunk(
  "authors/deleteAuthor",
  async (authorId) => {
    try {
      await baseApi.delete(`/Author/${authorId}`);
      return authorId;
    } catch (error) {
      alert(error.response?.data?.message);
      throw new Error("Failed to delete author: " + error.response.data);
    }
  }
);