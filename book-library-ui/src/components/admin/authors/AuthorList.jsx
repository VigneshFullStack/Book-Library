import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors, deleteAuthor } from '../../../redux/actions/authorActions';
import AuthorForm from './AuthorForm';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

const AuthorList = () => {
    const dispatch = useDispatch();
    const { authorsList: authors, status, error } = useSelector((state) => state.authors);
    const [open, setOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    // Fetch authors on initial load
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAuthors());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAuthor(id));
    };

    const handleEdit = (author) => {
        setSelectedAuthor(author);
        setOpen(true);
    };

    const handleAddAuthor = () => {
        setSelectedAuthor(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAuthor(null);
    };

    return (
        <div className="container mt-4">
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddAuthor}
                style={{ marginBottom: '20px' }}
            >
                Add Author
            </Button>

            <h2 className="mb-3">Author List</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p className="text-danger">{error}</p>}
            {status === 'succeeded' && (
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Bio</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors?.map((author, index) => (
                            <tr key={author.authorId}>
                                <td>{index + 1}</td>
                                <td>{author.name}</td>
                                <td>{author.bio}</td>
                                <td className="text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(author)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(author.authorId)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedAuthor ? 'Edit Author' : 'Add Author'}</DialogTitle>
                <DialogContent>
                    <AuthorForm selectedAuthor={selectedAuthor} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AuthorList;