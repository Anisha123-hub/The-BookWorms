import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/SharedState';
import { Bounce, toast } from 'react-toastify';

export default function Meeting() {
    const states = useContext(Context)
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewDesc, setReviewDesc] = useState('');
    const [chatText, setChatText] = useState('');

    useEffect(() => {
        // Fetch the book details and reviews from MongoDB
        const fetchBookDetails = async () => {
            try {
                const bookResponse = await axios.get(states.hostname + `/api/book/${bookId}`);
                setBook(bookResponse.data.book);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching book details", error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    const handleSubmitReview = () => {
        axios.post(states.hostname + "/api/book/addreview", {
            userId: states.user._id, username: states.user.username,
            bookId: bookId, reviewDesc: reviewDesc
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
            window.location.reload();
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
            window.location.reload()
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!book) {
        return <div>Book not found!</div>;
    }

    return (
        <main className="container-xxl">
            <img src="/images/orange vector2.png" id="ovecsix" />
            <img src="/images/purplevectortwo.png" id="pvecseven" />
            <article className="col-sm-12 col-md-12 flex-lg-column mx-auto align-items-start justify-content-start mb-2" id="Current">
                <div className="col-12 titlebanner">
                    <br />
                    <h1 className="my-2 mx-2 pb-4 ps-4 text-white">{book.title}</h1>
                </div>
                <div className="container-xxl">
                    <div className="row justify-content-center align-items-start my-5 mx-4 pb-3" id="meetingbox">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-lg-3 col-md-8 col-sm-8" id="meetingOne">
                                <div>
                                    <div className="oneOne">
                                        <img src={book.imgSrc} style={{ width: '60%' }} alt={book.title} />
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
                                <h4>Reviews ({book.reviews.length})</h4>
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
            <div class="container-fluid mt-5" id="discussionpanel">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4" id="livechat">
                        <div class="row">
                            <div class="col-12 text-white bg-primary text-center p-3">
                                <h2>Chat feed</h2>
                            </div>
                        </div>
                        <div class="row" id="chatdisclosure">
                            <div class="col-12 text-secondary text-center">
                                <p><b><span class="text-danger">***ALERT***</span></b><br /> This is a public live discussion that may include spoilers.</p>

                            </div>
                        </div>
                        <div class="row">
                            <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-examplethree" tabindex="0"
                                style={{ height: '420px' }}>
                                <div class="col-12 p-0" id="chatbox">
                                    <ul id="unordered">
                                        <li>What do you think of the book everyone?</li>

                                        {book.chats.map((chat) => (
                                            <li key={chat.id}>
                                                <div className="mt-3">
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        <img className='me-2' src="https://static.vecteezy.com/system/resources/previews/009/267/048/non_2x/user-icon-design-free-png.png" height={30} />
                                                        <span>{chat.username} ({new Date(chat.createdAt).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: true
                                                        })})</span>
                                                    </div>
                                                    <p className='mt-2 fw-bold'>{chat.chatText}</p>
                                                    <hr />
                                                </div>
                                            </li>
                                        ))}

                                    </ul>
                                </div>
                            </div>
                            <div class="col-12" id="comment-box-holder">
                                <div className='row p-2 align-items-center'>

                                    <div className='col-9'>
                                        <input class="form-control" type="text" placeholder="Write a message" value={chatText} onChange={(e) => setChatText(e.target.value)} />
                                    </div>

                                    <div className='col-2'>
                                        <button id="poston" type="button" class="btn btn-primary btn-sm text-white" onClick={handleChat}>Send Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                    {book.reviews.map((review) => (
                                                        <li key={review.id}>
                                                            <div className="col-12" id="reviewbg">
                                                                <div className="row">

                                                                    <div className="col-1">
                                                                        <img src="https://static.vecteezy.com/system/resources/previews/009/267/048/non_2x/user-icon-design-free-png.png" alt="User" id="userOne" />
                                                                    </div>
                                                                    <div className="col-11">
                                                                        <div className="col-12" id="usernameandrate">
                                                                            <span>{review.username}</span>
                                                                            <p>{new Date(review.createdAt).toLocaleDateString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: 'numeric',
                                                                            })}</p>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <br />
                                                                        <p>{review.reviewDesc}</p>
                                                                    </div>
                                                                </div>
                                                                <hr className='w-75' />
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>
                                            <div class="col-12" id="comment-box-holder">
                                                <div className='row p-2 align-items-center'>

                                                    <div className='col-10'>
                                                        <input class="form-control" type="text" placeholder="Write a message" value={reviewDesc} onChange={(e) => setReviewDesc(e.target.value)} />
                                                    </div>

                                                    <div className='col-2'>
                                                        <button id="poston" class="btn btn-primary btn-sm text-white" onClick={handleSubmitReview}>Submit Review</button>
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
            </div>
        </main>
    );
}
