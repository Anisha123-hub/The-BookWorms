import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/SharedState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

export default function JoinClubs() {
    const states = useContext(Context);

    const validBooks = states.recommendBooks.filter(book => book !== null && !book.members.some(member => member.userId === states.user._id));

    const handleDeleteBook = (bookId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return; // Stop deleting book if user cancels

        axios.post(states.hostname + '/api/book/delete', { bookId }).then((res) => {
            toast.success(res.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        })
    }
    if (states.loading) return <p>Loading recommendations...</p>;

    return (
        <main className="container-xxl mb-5" style={{ width: 'auto' }}>

            {validBooks.length > 0 && (
                <article className="flex-lg-column justify-content-lg-center mx-auto" id="Current">
                    <br />
                    <div className="row flex-xxl-row flex-xl-row flex-lg-column m-auto">
                        <h1 className="text-start mb-5">Our Recommendations</h1>

                        <div className="col-lg-12 text-center">
                            <div className="row justify-content-lg-center align-items-lg-end">
                                {validBooks.slice(0, 3).map((book, index) => (
                                    <div className="col-lg-4" key={index}>
                                        <img
                                            src={book.imgSrc}
                                            style={{ width: "9rem" }}
                                            alt={book.title}
                                        />
                                        <p className="text-center">{book.title}</p>
                                        <p className="text-center">{book.genre}</p>
                                        <Link to={`/meeting/${book._id}`} className="btn btn-primary text-white text-decoration-none mb-4">
                                            Visit bookclub
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <br />
                    </div>
                </article>
            )}


            <article className="flex-lg-column justify-content-lg-center mx-auto" id="Current">
                <img src="images/orangevectorthree.png" id="ovecfive" alt="decorative" />
                <br />
                <h1 className="text-center mb-4">Available Bookclubs</h1>

                <div className="col-lg-10 mx-auto">
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
                                states.books
                                    .filter(book => !book.members.some(member => member.userId === states.user._id))
                                    .map((book) => (
                                        <div className="row mb-4" key={book._id}>
                                            <div className="col-lg-3 col-sm-4">
                                                <img
                                                    src={book.imgSrc}
                                                    className="img-fluid custom-shadow"
                                                    alt={book.title}
                                                    style={{ width: '8em', height: '12em', objectFit: 'cover', marginBottom: '2em' }}
                                                />
                                            </div>
                                            <div className="col-lg-9 col-sm-8 mt-lg-5">
                                                <h5 className='fw-bold'>{book.title}</h5>
                                                <h6 className='text-muted'>{book.genre}</h6>
                                                <p>{book.description}</p>
                                                <div>
                                                    <Link to={`/meeting/${book._id}`} className="btn btn-warning text-white text-decoration-none mb-4">
                                                        Visit bookclub
                                                    </Link>
                                                    {states.user.role === 'admin' ?
                                                        <div onClick={() => handleDeleteBook(book._id)} className="btn btn-outline-danger mb-4 ms-3">
                                                            Delete
                                                        </div> : ''}
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
