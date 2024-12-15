import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/actions/BooksActions";
import Loader from "../Loader";

const HomePage = () => {
    const dispatch = useDispatch();
    const { booksList, status } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (status === "loading") {
        return <Loader />;
    }

    if (status === "failed") {
        return <div className="alert alert-danger">Failed to load books.</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Books</h1>
            <div className="row">
                {booksList?.map((book) => (
                    <div key={book.bookId} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src="https://via.placeholder.com/150"
                                alt={book.title}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">
                                    <strong>Author:</strong> {book.authorName}
                                </p>
                                <p className="card-text">
                                    <strong>Genre:</strong> {book.genreName}
                                </p>
                                <p className="card-text">
                                    <strong>Published:</strong> {book.publicationYear}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;