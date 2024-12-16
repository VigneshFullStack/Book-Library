import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, deleteGenre } from '../../../redux/actions/genreActions';
import GenreForm from './GenreForm';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';

const GenreList = () => {
    const dispatch = useDispatch();
    const { genresList: genres, status, error } = useSelector((state) => state.genres);
    const [open, setOpen] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(null);

    // New state for managing delete confirmation dialog
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
    const [genreToDelete, setGenreToDelete] = useState(null); 

    // Fetch genres on initial load
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGenres());
        }
    }, [status, dispatch]);

    // Open the delete confirmation dialog
    const handleDelete = (genre) => {
        setGenreToDelete(genre); 
        setDeleteDialogOpen(true); 
    };

    // Confirm deletion and dispatch the delete action
    const confirmDelete = () => {
        if (genreToDelete) {
            dispatch(deleteGenre(genreToDelete.genreId)); 
        }
        setDeleteDialogOpen(false); 
    };

    // Cancel deletion and close the dialog
    const cancelDelete = () => {
        setDeleteDialogOpen(false); 
        setGenreToDelete(null); 
    };

    const handleEdit = (genre) => {
        setSelectedGenre(genre);
        setOpen(true);
    };

    const handleAddGenre = () => {
        setSelectedGenre(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedGenre(null);
    };

    return (
        <div className="container mt-4">
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddGenre}
                style={{ marginBottom: '20px' }}
            >
                Add Genre
            </Button>

            <h2 className="mb-3">Genre List</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p className="text-danger">{error}</p>}
            {status === 'succeeded' && (
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '65%' }}>Name</th>
                            <th style={{ width: '30%' }} className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres?.map((genre, index) => (
                            <tr key={genre.genreId}>
                                <td style={{ width: '5%' }}>{index + 1}</td>
                                <td style={{ width: '65%' }}>{genre.name}</td>
                                <td style={{ width: '30%' }} className="text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleEdit(genre)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(genre)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Material-UI Modal for editing or adding a genre */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedGenre ? 'Edit Genre' : 'Add Genre'}</DialogTitle>
                <DialogContent>
                    <GenreForm selectedGenre={selectedGenre} onClose={handleClose} />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this genre?</p>
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

export default GenreList;