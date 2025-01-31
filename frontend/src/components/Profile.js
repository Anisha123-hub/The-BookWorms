import React, { useContext, useEffect } from 'react'
import { Context } from '../context/SharedState'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const states = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (!states?.isAuthenticated) {
            navigate('/');
        }
    }, [states.isAuthenticated, navigate]);

    return (
        <>

            <article>
                <img src="images/purplevectortwo.png" id="pvecone" />
                <div class="container-fluid" style={{ marginTop: '110px', marginBottom: '188px' }}>
                    <div class="row align-items-center justify-content-center mx-auto">
                        <div class="col-lg-4 col-sm-3 col-md-2 m-auto d-none d-lg-block d-xl-block text-center">
                            <img src="images/girl holding book 2.png" style={{ width: '20rem' }} />
                        </div>

                        <div class="col-lg-6 col-sm-6 col-md-8 me-auto">
                            <form id="signupform" class="justify-content-lg-center align-items-lg-center px-5 pt-4 signupform">

                                <h3 class="text-center">Edit Profile</h3>

                                <div class="col-lg-4 col-m-4 col-sm-4" style={{ width: '100%' }}>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Username (cannot be changed)</label>
                                        <input type='text' class="form-control" value={states.user.username} disabled/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Email</label>
                                        <input type='email' class="form-control" value={states.user.email}/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Phone</label>
                                        <input type='email' class="form-control" value={states.user.phone}/>
                                    </div>
                                </div>

                                <br />
                                <div class="text-center">
                                    <a href="#" type="submit" class="btn btn-warning text-white text-decoration-none mb-4 me-4">Save Change</a>
                                    <a href="#" type="submit" class="btn btn-outline-danger mb-4">Delete account</a>
                                    </div>
                                <br />

                            </form>
                            <div class="col-lg-4 col-sm-3 col-md-2 m-auto d-none d-lg-block d-xl-block text-center">
                                <img src="images/girl holding book 1.svg" style={{ width: '10rem' }} />
                            </div>

                        </div>
                    </div>
                </div>
            </article>

        </>
    )
}
