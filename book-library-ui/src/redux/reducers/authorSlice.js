import { createSlice } from "@reduxjs/toolkit";
import { addAuthor, deleteAuthor, fetchAuthorById, fetchAuthors, updateAuthor } from "../actions/authorActions";

const initialState = {
  authorsList: [],
  author: null,
  status: "idle",
  error: null,
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all authors
      .addCase(fetchAuthors.pending, (state) => {
        state.status = "loading";
        state.authorsList = [];
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authorsList = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch authors";
        state.authorsList = null;
      })

      // Fetch a single author by ID
      .addCase(fetchAuthorById.pending, (state) => {
        state.status = "loading";
        state.author = null;
      })
      .addCase(fetchAuthorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.author = action.payload;
      })
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch the author";
        state.author = null;
      })

      // Add a new author
      .addCase(addAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authorsList = [...(state.authorsList || []), action.payload];
      })
      .addCase(addAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to add the author";
      })

      // Update an author
      .addCase(updateAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.authorsList?.findIndex(
          (author) => author.authorId === action.payload.authorId
        );
        if (index !== -1) {
          state.authorsList[index] = action.payload;
        }
      })
      .addCase(updateAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to update the author";
      })

      // Delete an author
      .addCase(deleteAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authorsList = state.authorsList?.filter(
          (author) => author.authorId !== action.meta.arg
        );
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to delete the author";
      });
  },
});

export default authorsSlice.reducer;