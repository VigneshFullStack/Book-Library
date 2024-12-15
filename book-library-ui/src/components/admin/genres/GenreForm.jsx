import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addGenre, updateGenre } from '../../../redux/actions/genreActions';

const GenreForm = ({ selectedGenre, onClose }) => {
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        name: '',
    });

    useEffect(() => {
        if (selectedGenre) {
            setFormState(selectedGenre);
        }
    }, [selectedGenre]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedGenre) {
            dispatch(updateGenre(formState));
        } else {
            dispatch(addGenre(formState));
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedGenre ? 'Edit Genre' : 'Add Genre'}</h2>

            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Genre Name"
                    required
                />
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

export default GenreForm;