import { createSlice } from "@reduxjs/toolkit";
import { addBook, deleteBook, fetchBookById, fetchBooks, updateBook } from "../actions/BooksActions";

const initialState = {
  booksList: [],
  book: null,
  status: "idle",
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all books
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.booksList = [];
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.booksList = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch books";
        state.booksList = null;
      })

      // Fetch a single book by ID
      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
        state.book = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch the book";
        state.book = null;
      })

      // Add a book
      .addCase(addBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.booksList = [...(state.booksList || []), action.payload];
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to add the book";
      })

      // Update a book
      .addCase(updateBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.booksList?.findIndex(
          (book) => book.bookId === action.payload.bookId
        );
        if (index !== -1) {
          state.booksList[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to update the book";
      })

      // Delete a book
      .addCase(deleteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.booksList = state.booksList?.filter(
          (book) => book.bookId !== action.meta.arg
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to delete the book";
      });
  },
});

export default booksSlice.reducer;
