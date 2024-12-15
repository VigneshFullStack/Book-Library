import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Books from "../admin/books/BookList";
import Authors from "../admin/authors/AuthorList";
import Genres from "../admin/genres/GenreList";

const AdminPage = () => {
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Admin Dashboard</h1>
                {/* Home Button */}
                <Link to="/" className="btn btn-primary">
                    Home
                </Link>
            </div>
            <div className="my-3">
                {/* Use absolute paths */}
                <Link to="/admin/books" className="btn btn-outline-primary me-2">
                    Books
                </Link>
                <Link to="/admin/authors" className="btn btn-outline-secondary me-2">
                    Authors
                </Link>
                <Link to="/admin/genres" className="btn btn-outline-success">
                    Genres
                </Link>
            </div>
            <Routes>
                {/* Default Route for Admin */}
                <Route path="/" element={<Books />} />
                <Route path="books" element={<Books />} />
                <Route path="authors" element={<Authors />} />
                <Route path="genres" element={<Genres />} />
            </Routes>
        </div>
    );
};

export default AdminPage;