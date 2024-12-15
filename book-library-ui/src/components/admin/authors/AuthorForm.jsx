import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAuthor, updateAuthor } from '../../../redux/actions/authorActions';

const AuthorForm = ({ selectedAuthor, onClose }) => {
    const dispatch = useDispatch();

    const [formState, setFormState] = useState({
        name: '',
        bio: '',
    });

    useEffect(() => {
        if (selectedAuthor) {
            setFormState(selectedAuthor);
        }
    }, [selectedAuthor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedAuthor) {
            dispatch(updateAuthor(formState));
        } else {
            dispatch(addAuthor(formState));
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedAuthor ? 'Edit Author' : 'Add Author'}</h2>
            
            <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Author Name"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    name="bio"
                    className="form-control"
                    value={formState.bio}
                    onChange={handleChange}
                    placeholder="Author Biography"
                    rows="3"
                    required
                ></textarea>
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

export default AuthorForm;