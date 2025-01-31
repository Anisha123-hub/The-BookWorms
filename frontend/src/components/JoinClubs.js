import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/SharedState';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JoinClubs() {
    const states = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!states.isAuthenticated) {
            navigate('/');
        } else {
            fetchBooks();
        }
    }, [states.isAuthenticated]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${states.hostname}/api/book/all`);
            states.setBooks(response.data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    return (
        <main className="container-xxl mb-5">
            <article className="flex-lg-column justify-content-lg-center mx-auto" id="Current">
                <img src="images/orangevectorthree.png" id="ovecfive" alt="decorative" />
                <br />
                <h1 className="text-center">Current Bookclubs</h1>

                <div className="col-lg-9 mx-auto">
                    <div className="container-lg">
                        <div 
                            data-bs-spy="scroll" 
                            data-bs-target="#navbar-example2" 
                            data-bs-offset="0" 
                            className="scrollspy-example" 
                            style={{ height: '450px', overflowY: 'auto' }} 
                            tabIndex="0"
                        >
                            {states.books?.length > 0 ? (
                                states.books.map((book) => ( //display the json value from backend
                                    <div className="row mb-4" key={book._id}>
                                        <div className="col-lg-3 col-sm-4">
                                            <img 
                                                src={book.imgSrc} 
                                                className="img-fluid custom-shadow"
                                                alt={book.title}
                                                style={{ width: '7em', height: '11em', objectFit: 'cover', marginBottom: '2em' }} 
                                            />
                                        </div>
                                        <div className="col-lg-9 col-sm-8 mt-lg-5">
                                            <h5 className='fw-bold'>{book.title}</h5>
                                            <h6 className='text-muted'>{book.genre}</h6>
                                            <p>{book.description}</p>
                                            <div>
                                                <Link 
                                                    to={`/meeting/${book._id}`} 
                                                    className="btn btn-warning text-white text-decoration-none mb-4"
                                                >
                                                    Join bookclub
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No books available</p>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}
