import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, fetchBooks } from '../../../redux/actions/BooksActions';
import BookForm from './BookForm';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

const BookList = () => {
    const dispatch = useDispatch();
    const { booksList: books, status, error } = useSelector((state) => state.books);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
    const [bookToDelete, setBookToDelete] = useState(null);

    // Fetch books on initial load
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBooks());
        }
        console.log("books : ", books);
    }, [status, dispatch]);

    const handleDelete = (book) => {
        setBookToDelete(book); 
        setDeleteDialogOpen(true); 
    };

    const confirmDelete = () => {
        if (bookToDelete) {
            dispatch(deleteBook(bookToDelete.bookId)); 
        }
        setDeleteDialogOpen(false); 
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false); 
        setBookToDelete(null); 
    };

    const handleEdit = (book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleAddBook = () => {
        setSelectedBook(null); 
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBook(null);
    };

    return (
        <div className="container mt-4">
            {/* Add Book Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddBook}
                style={{ marginBottom: '20px' }}
            >
                Add Book
            </Button>

            <h2 className="mb-3">Book List</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p className="text-danger">{error}</p>}
            {status === 'succeeded' && (
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Publication Year</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((book, index) => (
                            <tr key={book.bookId}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.authorName}</td>
                                <td>{book.genreName}</td>
                                <td>{book.publicationYear}</td>
                                <td className='text-center'>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(book)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(book)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Material-UI Modal for editing or adding a book */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedBook ? 'Edit Book' : 'Add Book'}</DialogTitle>
                <DialogContent>
                    <BookForm selectedBook={selectedBook} onClose={handleClose} />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this book?</p>
                    <div className="d-flex justify-content-end">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={cancelDelete}
                            style={{ marginRight: '8px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={confirmDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BookList;