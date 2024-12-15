import { createSlice } from "@reduxjs/toolkit";
import { addGenre, deleteGenre, fetchGenreById, fetchGenres, updateGenre } from "../actions/genreActions";

const initialState = {
  genresList: [],
  genre: null,
  status: "idle",
  error: null,
};

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all genres
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
        state.genresList = [];
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genresList = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch genres";
        state.genresList = null;
      })

      // Fetch a single genre by ID
      .addCase(fetchGenreById.pending, (state) => {
        state.status = "loading";
        state.genre = null;
      })
      .addCase(fetchGenreById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genre = action.payload;
      })
      .addCase(fetchGenreById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch the genre";
        state.genre = null;
      })

      // Add a new genre
      .addCase(addGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genresList = [...(state.genresList || []), action.payload];
      })
      .addCase(addGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to add the genre";
      })

      // Update a genre
      .addCase(updateGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.genresList?.findIndex(
          (genre) => genre.genreId === action.payload.genreId
        );
        if (index !== -1) {
          state.genresList[index] = action.payload;
        }
      })
      .addCase(updateGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to update the genre";
      })

      // Delete a genre
      .addCase(deleteGenre.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGenre.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genresList = state.genresList?.filter(
          (genre) => genre.genreId !== action.meta.arg
        );
      })
      .addCase(deleteGenre.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to delete the genre";
      });
  },
});

export default genresSlice.reducer;