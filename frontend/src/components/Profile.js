import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/SharedState'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import axios from 'axios'

export default function Profile() {
    const states = useContext(Context)
    const navigate = useNavigate()
    const [phone, setPhone] = useState()

    useEffect(() => {
        if (!states.isAuthenticated) {
            navigate('/');
        }
    }, [states.isAuthenticated]);

    const handleProfile = (e)=> {
        e.preventDefault();
        axios.put(states.hostname+'/api/user/update', {userId: states.user._id, phone:phone}).then((res)=> {
            if (res.data.success) {
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
                navigate('/')

            } else {
                toast.error(res.data.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        })
    }

    const handleDeleteProfile = (e)=> {
        const confirmDelete = window.confirm("Are your sure to Delete account permanently?");
        if (!confirmDelete) return;

        e.preventDefault();
        axios.delete(states.hostname+'/api/user/delete', {
            data: { userId: states.user._id }
        }).then((res)=> {
            if (res.data.success) {
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

            } else {
                toast.error(res.data.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        })
    }

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
                            <form id="signupform" class="justify-content-lg-center align-items-lg-center px-5 pt-4 signupform" onSubmit={handleProfile}>

                                <h3 class="text-center">Edit Profile ({states.user.role})</h3>

                                <div class="col-lg-4 col-m-4 col-sm-4" style={{ width: '100%' }}>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Username (cannot be changed)</label>
                                        <input type='text' class="form-control" value={states.user.username} disabled/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Email</label>
                                        <input type='email' class="form-control" value={states.user.email} disabled/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Phone</label>
                                        <input type='number' class="form-control" defaultValue={states.user.phone} onChange={(e)=> setPhone(e.target.value)}/>
                                    </div>
                                </div>

                                <br />
                                <div class="text-center">
                                    <button type="submit" class="btn btn-warning text-white text-decoration-none mb-4 me-4">Save Change</button>
                                    <div class="btn btn-outline-danger mb-4" onClick={handleDeleteProfile}>Delete account</div>
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
