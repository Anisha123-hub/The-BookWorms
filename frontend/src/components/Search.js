import React, { useContext, useEffect } from 'react';
import { Context } from '../context/SharedState';
import { Link, useNavigate } from 'react-router-dom';

export default function Search() {
    const states = useContext(Context);
    const navigate = useNavigate();

    // Redirect to "home" if searchTerm is empty
    useEffect(() => {
        if (!states.searchTerm || states.searchTerm.trim() === '') {
            navigate('/');
        }
    }, [states.searchTerm, navigate]);

    const filteredBooks = states.books?.filter((book) =>
        book.title.toLowerCase().includes(states.searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            {states.searchTerm && (
                <h4 className="mb-4">Search Results for "{states.searchTerm}"</h4>
            )}
            <div className="row">
                {filteredBooks?.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div key={book._id} className="col-md-3 m-auto">
                            <Link to={`/meeting/` + book._id} className='text-decoration-none'>
                                <div className="card mb-4">
                                    <img src={book.imgSrc} className="card-img-top" alt={book.title}/>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{book.title}</h5>
                                        <p className="card-text text-muted">{book.genre}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No books found matching your search.</p>
                )}
            </div>
        </div>
    );
}
