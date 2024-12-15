import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook } from '../../../redux/actions/BooksActions';
import { fetchAuthors } from '../../../redux/actions/authorActions';
import { fetchGenres } from '../../../redux/actions/genreActions';

const BookForm = ({ selectedBook, onClose }) => {
  const dispatch = useDispatch();
  
  // Fetch authors and genres from Redux store
  const { authorsList } = useSelector((state) => state.authors);
  const { genresList } = useSelector((state) => state.genres);
  
  const [formState, setFormState] = useState({
    title: '',
    authorId: '',
    genreId: '',
    publicationYear: '',
  });

  useEffect(() => {
    // Fetch authors and genres when the component mounts
    dispatch(fetchAuthors());
    dispatch(fetchGenres());

    if (selectedBook) {
      setFormState(selectedBook);
    }
    console.log("authorsList : ", authorsList);
    console.log("genresList : ", genresList);
  }, [dispatch, selectedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBook) {
      dispatch(updateBook(formState));
    } else {
      dispatch(addBook(formState));
    }
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formState.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="authorId">Author</label>
          <select
            id="authorId"
            name="authorId"
            className="form-control"
            value={formState.authorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Author</option>
            {authorsList?.map((author) => (
              <option key={author.authorId} value={author.authorId}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="genreId">Genre</label>
          <select
            id="genreId"
            name="genreId"
            className="form-control"
            value={formState.genreId}
            onChange={handleChange}
            required
          >
            <option value="">Select Genre</option>
            {genresList?.map((genre) => (
              <option key={genre.genreId} value={genre.genreId}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="publicationYear">Publication Year</label>
          <input
            type="number"
            id="publicationYear"
            name="publicationYear"
            className="form-control"
            value={formState.publicationYear}
            onChange={handleChange}
            placeholder="Year"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BookForm;