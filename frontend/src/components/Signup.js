import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/SharedState'
import { Bounce, toast } from 'react-toastify'
import axios from 'axios'

export default function Signup() {
    const states = useContext(Context)
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({})
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post(states.hostname+'/api/user/register', userInput).then((res)=> {
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
                navigate('/login')

            } else {
                toast.error(res.data.message, {
                    position: "top-right",
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
                <main class="container-fluid">
                    <div class="row mb-5" style={{marginTop: '5px', marginBottom: '10px'}}>
                        <img src="images/orange vector2.png" id="ovectwo" />
                        <div class="col-lg-4 col-sm-2 m-auto ps-5">
                            <img src="images/messages.svg" id="girlbookone" style={{width: '400px', marginTop: '4em'}} />
                        </div>
                        <div class="col-lg-4 col-sm-8">
                            <form id="signupform" class="px-5 p-4 m-auto signupform" onSubmit={handleSignup}>
                                <h1 class="text-center mb-3">Sign Up</h1>

                                <div class="mb-3">
                                    <label class="form-label">Username</label>
                                    <input name="username" type="username" class="form-control" onChange={handleInput}/>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email address</label>
                                    <input name="email" type="email" class="form-control" onChange={handleInput}/>
                                    <div id="emailHelp" class="form-text">
                                        We'll never share your email with anyone else.
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Phone Number</label>
                                    <input name="phone" type="phone" class="form-control" onChange={handleInput}/>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input name="password" type="password" class="form-control" onChange={handleInput}/>
                                </div>

                                <div class="text-center">
                                    <button type="submit" class="btn btn-warning text-white text-decoration-none mb-1 mt-2">Create Account</button>
                                </div>
                                <p class="text-center pt-3 mb-1">
                                    Already have an account?
                                    <Link to='/login'><span class="text-primary">Log In</span></Link>
                                </p>
                            </form>
                        </div>
                        <div
                            class="col-lg-4 col-lg-2 d-md-none d-sm-none d-none d-lg-block m-auto ps-5">
                            <img src="images/influencer.svg" id="girlbooktwo" style={{width: '400px'}}/>
                        </div>
                    </div>
                </main>
            </article>
        </>
    )
}
