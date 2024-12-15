import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/booksSlice';
import authorReducer from './reducers/authorSlice';
import genreReducer from './reducers/genreSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    authors: authorReducer,
    genres: genreReducer,
  },
});

export default store;