import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseApi } from "../../api/Api";

// Fetch all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    try {
      const response = await baseApi.get("/Books");
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Fetch an book by ID
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId) => {
    try {
      const response = await baseApi.get(`/Books/${bookId}`);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Add a new book
export const addBook = createAsyncThunk(
  "books/addBook",
  async (bookData) => {
    try {
      const response = await baseApi.post("/Books", bookData);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Update an existing book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (bookData) => {
    try {
      const response = await baseApi.put(`/Books/${bookData.bookId}`, bookData);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

// Delete an book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId) => {
    try {
      await baseApi.delete(`/Books/${bookId}`);
      return bookId;
    } catch (error) {
      alert(error.response?.data?.message);
      throw new Error("Failed to delete book: " + error.response.data);
    }
  }
);