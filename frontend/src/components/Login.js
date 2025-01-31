import React, { useContext, useState } from 'react'
import '../css/starter.css'
import '../css/footer.css'
import axios from 'axios';
import { Context } from '../context/SharedState'
import { useNavigate } from 'react-router-dom'
import { Bounce, Slide, toast } from 'react-toastify';

export default function Login() {

    const states = useContext(Context) //to take the state variable
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
        console.log(userInput)
    }

    const handleLogin = (e) => {
        e.preventDefault(); //prevents reloading of the page
        const loginRequest = axios.post(states.hostname + '/api/user/login', userInput)

        toast.promise(
            loginRequest.then((res) => {
                if (res.data.success) {
                    states.setIsAuthenticated(true);
                    if (res.data.user.role === 'admin') {
                        navigate('/join');
                    } else {
                        navigate('/join');
                    }
                    return 'Login successful!';
                } else {
                    throw new Error(res.data.message);
                }
            }),
            {
                pending: 'Logging in...',
                success: 'Login successful!',
                error: {
                    render({ data }) {
                        return data.message || 'Login failed!';
                    },
                },
            },
            {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }
        );
    }

    return (
        <>
            <header class="container-fluid" id="main-header"></header>
            <article>
                <main class="container-fluid">
                    <div class="row" style={{ marginTop: '27px', marginBottom: '50px' }}>
                        <img src="images/orange vector2.png" id="ovectwo" />
                        <div class="col-lg-4 col-sm-2 m-auto ps-5">
                            <img src="images/messages.svg" id="girlbookone" style={{ width: '400px', marginTop: '4em' }} />
                        </div>
                        <div class="col-lg-4 col-sm-8 mb-5">
                            <form id="signupform" class="px-5 p-4 m-auto" onSubmit={handleLogin}>
                                <h1 class="text-center">Log In</h1>

                                <div class="mb-3">
                                    <label class="form-label">Email address</label>
                                    <input name="email" type="email" class="form-control" onChange={handleInput} required />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Password</label>
                                    <input name="password" type="password" class="form-control" onChange={handleInput} required />
                                </div>

                                <div class="text-center"
                                    style={{ marginTop: '40px' }}>
                                    <button type="submit" class="btn btn-warning text-white text-decoration-none mb-4">Log In</button>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-4 col-lg-2 d-md-none d-sm-none d-none d-lg-block m-auto ps-5">
                            <img src="images/influencer.svg" id="girlbooktwo" style={{ width: '400px' }} />
                        </div>
                    </div>
                </main>
            </article>

        </>
    )
}
