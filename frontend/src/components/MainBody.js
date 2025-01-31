import React, { useContext } from 'react'
import { Context } from '../context/SharedState'
import { Link } from 'react-router-dom'

export default function MainBody() {
    const states = useContext(Context)
    return (
        <>
            <main>
                <article>
                    <section class="container-fluid">
                        <div class="row align-items-center">
                            <div class="col-lg-7">
                                <div class="text-center justify-content-center row">
                                    <div class="col-8 text-center">
                                        <h2 class="text-center lh-lg">Welcome Book lovers,</h2>
                                        <p class="lh-lg">
                                            Welcome to The BookWorms, a platform where readers can
                                            connect and dive into meaningful discussions about their
                                            favorite books. Whether you're excited to unravel a plot
                                            twist or share your thoughts on a compelling character, The
                                            BookWorms is the perfect space for you. Join today to
                                            connect with fellow readers, share your reading experiences,
                                            and discover new books. Sign up now to become a part of our
                                            vibrant book-loving community!
                                        </p>
                                        {states.isAuthenticated?
                                        <div class="text-center">
                                            <Link
                                                to='/join'
                                                class="btn btn-warning text-white text-decoration-none mb-4">Join Clubs</Link>
                                        </div>:
                                        <div class="text-center">
                                            <Link
                                                to='/signup'
                                                class="btn btn-warning text-white text-decoration-none mb-4">Sign Up</Link>
                                        </div>}

                                    </div>
                                </div>
                            </div>

                            <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12">
                                <img src="images/orange vector.png" id="ovec" />
                                <img src="images/purple vector.png" id="pvec" />
                                <div class="row">
                                    <div class="col-xxl-9 col-lg-12 col-md-12 col-sm-12 col-none-4 mt-1">
                                        <div class="card p-4" id="bcm">
                                            <h2 class="card-title text-center">
                                                Monthly Book Club Feature
                                            </h2>
                                            <div class="container-fluid">
                                                <div
                                                    class="row justify-content-start align-items-start flex-md-row flex-md-nowrap flex-sm-column flex-sm-wrap flex-column flex-wrap mt-3"
                                                >
                                                    <div class="col-6">
                                                        <img
                                                            src="images/alchemist.jpg"
                                                            style={{ width: '11em' }}
                                                            class="pe-md-2 pe-lg-5 pe-xxl-1"
                                                            alt="..."
                                                        />
                                                    </div>
                                                    <div class="col-6">
                                                        <h2 class="card-title text-center">
                                                            Monthly Book Club Feature
                                                        </h2>
                                                        <p>
                                                            Over
                                                            <span style={{ color: '#c779d0' }}> 100</span> Passionate
                                                            Readers
                                                        </p>
                                                        <img className='ms-3' src="images/group profiles.png" />
                                                        <a
                                                            href="https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005/ref=sr_1_1?sr=8-1"
                                                            target="_blank"
                                                            class="btn btn-secondary text-white mt-2 ms-4">Buy on Amazon</a>
                                                        <br /><a href="https://www.amazon.com/hz/wishlist/intro"
                                                            target="_blank"
                                                            class="btn mt-2 ms-4" id="card-btn"
                                                        >Add to Wishlist</a>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <h3 class="card-title">The Alchemist</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="container-fluid" id="secTwo">
                        <section class="row">
                            <div
                                class="col-xxl-6 col-lg-6 col-md-none col-sm-none mt-5 text-center d-none d-lg-block"
                                id="pickgenre"
                            >
                                <img
                                    style={{ width: '33em' }}
                                    src="images/2.png"
                                    alt="picture of friends and popular books behind them"
                                />
                            </div>
                            <div
                                class="col-xxl-6 col-lg-6 col-md-12 col-sm-12 col-none-4 text-center"
                            >
                                <div class="card border-0" id="genrebg">
                                    <div class="card-body">
                                        <h4>Book Genre</h4>
                                        <div class="row">
                                            <div class="col-md-4" id="mysteryThrill">
                                                <img
                                                    src="images/Mystery and thriller 1.png"
                                                    class="img-fluid custom-shadow"
                                                    style={{ width: '7em', height: '11em', objectFit: 'cover' }}
                                                    alt="Mystery and Thriller"
                                                />
                                                <p class="pt-2">Mystery & Thriller</p>
                                            </div>
                                            <div class="col-md-4" id="fiction">
                                                <img
                                                    src="images/fiction 1.png"
                                                    class="img-fluid custom-shadow"
                                                    style={{ width: '7em', height: '11em', objectFit: 'cover' }}
                                                    alt="Fiction"
                                                />
                                                <p class="pt-2">Fiction</p>
                                            </div>
                                            <div class="col-md-4" id="memior">
                                                <img
                                                    src="images/Memior 1.png"
                                                    class="img-fluid custom-shadow"
                                                    style={{ width: '7em', height: '11em', objectFit: 'cover' }}
                                                    alt="memior"
                                                />
                                                <p class="pt-2">Memior</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4" id="horror">
                                                <img
                                                    src="images/Horror 1.png"
                                                    class="img-fluid custom-shadow"
                                                    style={{ width: '7em', height: '11em', objectFit: 'cover' }}
                                                    alt="horror"
                                                />
                                                <p class="pt-2">Horror</p>
                                            </div>
                                            <div class="col-md-4" id="historyBio">
                                                <img
                                                    src="images/History & Biography 1.png"
                                                    class="img-fluid custom-shadow"
                                                    style={{ width: '7em', height: '11em', objectFit: 'cover' }}
                                                    alt="historyBio"
                                                />
                                                <p class="pt-2">History & Biography</p>
                                            </div>
                                            <div class="col-md-4" id="humor">
                                                <img
                                                    src="images/Humor 1.png"
                                                    class="img-fluid custom-shadow"
                                                    style={{ width: '7em', height: '11em', objectFit: 'cover' }}
                                                    alt="humor"
                                                />
                                                <p class="pt-2">Humor</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </article>
            </main>
        </>
    )
}
