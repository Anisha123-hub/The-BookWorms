import React, { useContext, useEffect } from 'react';
import { Context } from '../context/SharedState';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

export default function MyClubs() {
    const states = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        if (!states.isAuthenticated) {
            navigate('/');
        }
    }, [states.isAuthenticated]);

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

    const handleLeaveClub = async (bookId) => {
        axios.post(states.hostname + "/api/book/leaveclub", { bookId })
            .then((res) => {
                toast.warning(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });

                // Update state to remove the book
                states.setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            });
    };


    return (
        <main className="container-xxl mb-5">
            <article className="flex-lg-column justify-content-lg-center mx-auto" id="Current">
                <img src="images/orangevectorthree.png" id="ovecfive" alt="decorative" />
                <br />
                <h1 className="text-center">Bookclubs you have joined</h1>

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
                                states.books
                                    .filter(book => book.members.some(member => member.userId === states.user._id))
                                    .map((book) => (
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
                                                    <Link to={`/meeting/${book._id}`} className="btn btn-warning text-white text-decoration-none mb-4 me-3">
                                                        Visit bookclub
                                                    </Link>
                                                    <div onClick={() => handleLeaveClub(book._id)} className="btn btn-danger text-white text-decoration-none mb-4">
                                                        - Leave Club
                                                    </div>
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
