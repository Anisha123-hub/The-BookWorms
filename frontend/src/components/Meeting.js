import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context/SharedState';
import { Bounce, Slide, toast } from 'react-toastify';
import axios from 'axios';
import Chatbox from './Chatbox';
import Members from './Members';

export default function Meeting() {
    const states = useContext(Context)
    const { bookId } = useParams();

    // Storing a specific book details
    const [book, setBook] = useState(null);

    // Storing whether the user is member or not
    const [isMember, setIsMember] = useState(false);

    // Storing the total number of members
    const [memberCount, setMemberCount] = useState(0);

    // Storing all the chats, reviews and rating input of a book
    const [reviewDesc, setReviewDesc] = useState('');
    const [rating, setRating] = useState(null);
    const [chatText, setChatText] = useState('');

    useEffect(() => {
        const bookData = states.books.find(book => book._id === bookId);

        if (bookData) {
            setBook(bookData);
            setMemberCount(bookData.members.length);

            setIsMember(bookData.members.some(member => member.userId.toString() === states.user._id));
        }
    }, [book, bookId, states.books, states.user._id]);


    const handleJoinClub = async () => {
        axios.post(states.hostname + "/api/book/joinclub", { bookId }).then((res) => {
            toast.success(res.data.message, {
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
            setIsMember(true);
            setReviewDesc('');

        }).catch((error) => {
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
            setReviewDesc('');
        });
    };

    const handleLeaveClub = async () => {
        axios.post(states.hostname + "/api/book/leaveclub", { bookId }).then((res) => {
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
            setIsMember(false);
            setReviewDesc('');
            // Update state
            states.setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));

        }).catch((error) => {
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
            setReviewDesc('');
        });
    };

    const handleSubmitReview = () => {
        axios.post(states.hostname + "/api/book/addreview", {
            userId: states.user._id, username: states.user.username,
            bookId: bookId, reviewDesc: reviewDesc, rating: rating
        }).then((res) => {
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setReviewDesc('')
            setRating(null)
            window.location.reload()

        }).catch((error) => {
            console.log(error.response)
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setReviewDesc('')
            setRating(null)

        })
    }

    const handleChat = () => {
        axios.post(states.hostname + "/api/book/addchat", {
            userId: states.user._id, username: states.user.username,
            bookId: bookId, chatText: chatText
        }).then((res) => {
            toast.success(res.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setReviewDesc('')
        }).catch((error) => {
            console.log(error.response)
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setReviewDesc('')
        })
    }

    if (states.loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Book not found!</div>;
    }

    return (
        <main className="container-xxl">
            <Members bookData={book} memberCount={memberCount}/>
            <img src="/images/orange vector2.png" id="ovecsix" />
            <img src="/images/purplevectortwo.png" id="pvecseven" />
            <article className="col-sm-12 col-md-12 flex-lg-column" id="Current">
                <div style={{ backgroundColor: 'rgb(254,172,94)' }}>
                    <br />
                    <div className='d-flex justify-content-between align-items-center w-100' >
                        <div>
                            <h1 className="my-2 mx-2 pb-4 ps-4 text-white">{book.title}</h1>
                        </div>

                        <div>
                            <div>
                                <div>
                                    {isMember ? (
                                        <div className="me-4 btn btn-danger text-light" onClick={handleLeaveClub}>- Leave Club</div>
                                    ) : (
                                        <div className="me-4 btn btn-success text-light" onClick={handleJoinClub}>+ Join Club</div>
                                    )}
                                    <div className="me-4 mt-2 nav-link btn"
                                        onClick={states.toggleModal} style={{ cursor: 'pointer' }}>
                                        {memberCount} Members
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xxl">
                    <div className="row justify-content-center align-items-start my-5 mx-4 pb-3" id="meetingbox">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-3 col-md-8 col-sm-8" id="meetingOne">
                                <div>
                                    <div className="oneOne">
                                        <img src={book.imgSrc} style={{ width: '70%' }} alt={book.title} />
                                    </div>
                                    <div className="oneTwo">
                                        <p><b>Summary</b>: {book.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-8 col-sm-8" id="meetingTwo">
                                <div className="twoOne">
                                    <img src={book.author_img} style={{ width: '70%' }} alt="author" />
                                </div>
                                <h5>Author:</h5>
                                <span>{book.author}</span>
                            </div>


                            <div className="col-lg-3 col-md-8 col-sm-8">
                                <h4 className='fw-bold'>Total Reviews ({book?.reviews.length})</h4>

                                <h6 className='d-flex align-items-center'>
                                    <span class="material-symbols-outlined me-1">sentiment_satisfied</span>
                                    Positive reviews ({book?.reviews?.filter(review => review.rating >= 4).length})
                                </h6>

                                <h6 className='d-flex align-items-center'>
                                    <span class="material-symbols-outlined me-1">sentiment_dissatisfied</span>
                                    Negative reviews ({book?.reviews?.filter(review => review.rating <= 3).length})
                                </h6>

                                <div class="d-flex justify-content-start flex-column">
                                    <a href={book.buy_link} target="_blank"><button class="btn text-white mb-2">Buy on Amazon</button></a>
                                    <a href="https://www.amazon.in/hz/wishlist/intro" target="_blank"><button class="btn">Add to Wishlist</button></a>
                                </div>
                            </div>


                            <div className="col-lg-3 pt-5 p-0 mt-2 m-0 row text-center align-items-start justify-content-center">
                                <div>
                                    <div className="schedulebox p-4">
                                        <h4>Book club Meet</h4>
                                        <div className="threeOne">
                                            <div className="threemember">
                                                <img src="/images/check.png" alt="check" />
                                            </div>
                                            <div className="threeSchedule">
                                                <p>Next meeting starts <b>{new Date(book.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}</b> on Zoom</p>
                                            </div>
                                            <div className="btn btn-warning">
                                                <a href={book.meetingLink} target="_blank">Join meeting</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <div class="container-fluid mt-5 mb-5" id="discussionpanel">
                <div class="row">

                    <Chatbox book={book}
                        isMember={isMember}
                        handleChat={handleChat}
                        chatText={chatText}
                        setChatText={setChatText} />

                    <div class="col-sm-0 col-md-0 col-lg-1 col-xl-1 col-xxl-1"></div>
                    <div class="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7">
                        <div class="row">
                            <div class="col-12" id="review-list">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 bg-primary text-white" id="reviewsection">
                                                <h2>{book.title} - Reviews</h2>
                                            </div>
                                            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-examplethree" tabindex="0">

                                                <ul>
                                                    {[...book.reviews] // Create a shallow copy to avoid mutating the original state
                                                        .sort((a, b) => b.rating - a.rating) // Sort in descending order of rating
                                                        .map((review) => (
                                                            <li key={review.id}>
                                                                <div className="col-12" id="reviewbg">
                                                                    <div className="row">
                                                                        <div className="col-1">
                                                                            <img src="https://static.vecteezy.com/system/resources/previews/009/267/048/non_2x/user-icon-design-free-png.png" alt="User" id="userOne" />
                                                                        </div>
                                                                        <div className="col-11">
                                                                            <div className="col-12" id="usernameandrate">
                                                                                <span className='fw-bold'>{review.username}</span>
                                                                                <p>{new Date(review.createdAt).toLocaleDateString('en-US', {
                                                                                    year: 'numeric',
                                                                                    month: 'short',
                                                                                    day: 'numeric',
                                                                                })}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="rating d-flex">
                                                                        {[5, 4, 3, 2, 1].map((rating) => (
                                                                            <React.Fragment key={rating}>
                                                                                <input
                                                                                    type="radio"
                                                                                    checked={rating === review.rating}
                                                                                    disabled
                                                                                />
                                                                                <label title={`Rating ${rating}`}></label>
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </div>
                                                                    <p>{review.reviewDesc}</p>
                                                                </div>
                                                                <hr className='w-75' />
                                                            </li>
                                                        ))
                                                    }

                                                </ul>

                                            </div>
                                            <div class="col-12" id="comment-box-holder">
                                                <div className='row p-2 align-items-center justify-content-start'>

                                                    {isMember ?
                                                        <>
                                                            <div className='col-10'>
                                                                <div className="rating">
                                                                    {[5, 4, 3, 2, 1].map((value) => (
                                                                        <React.Fragment key={value}>
                                                                            <input
                                                                                value={value}
                                                                                name={`rate-${value}`}
                                                                                id={`star${value}`}
                                                                                type="radio"
                                                                                checked={rating === value}
                                                                                onChange={() => setRating(value)}
                                                                            />
                                                                            <label title={`Rate ${value}`} htmlFor={`star${value}`}></label>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </div>
                                                                <input class="form-control" type="text" placeholder="Write a review" value={reviewDesc} onChange={(e) => setReviewDesc(e.target.value)} />
                                                            </div>
                                                            <div className='col-2'>
                                                                <button id="poston" class="btn btn-primary btn-sm text-white" onClick={handleSubmitReview}>Submit Review</button>
                                                            </div>
                                                        </> :
                                                        <>
                                                            <div className='col-10'>
                                                                <input class="form-control" type="text" placeholder="Only Members can write the review" disabled />
                                                            </div>
                                                            <div className='col-2'>
                                                                <button id="poston" class="btn btn-danger btn-sm text-white" disabled>Members Only</button>
                                                            </div>
                                                        </>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
