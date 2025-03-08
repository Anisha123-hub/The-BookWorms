import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/SharedState'
import { Bounce, toast } from 'react-toastify'
import axios from 'axios'

export default function Admin() {
    const states = useContext(Context)
    const navigate = useNavigate()

    useEffect(()=> {
        
        if(states.user.role !== 'admin'){
            navigate('/')
        }
    })

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
        axios.post(states.hostname+'/api/book/add', userInput).then((res)=> {
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
                <main class="container-fluid">
                    <div class="row mb-5" style={{marginTop: '5px', marginBottom: '10px'}}>
                        <img src="images/orange vector2.png" id="ovectwo" />
                        <div class="col-lg-4 col-sm-2 m-auto ps-5">
                            <img src="images/messages.svg" id="girlbookone" style={{width: '400px', marginTop: '4em'}} />
                        </div>
                        <div class="col-lg-4 col-sm-8">
                            <form id="signupform" class="px-5 p-4 m-auto signupform" onSubmit={handleSignup}>
                                <h1 class="text-center mb-3">Adding new books</h1>

                                <div class="mb-3">
                                    <label class="form-label">Book Title</label>
                                    <input name="title" type="text" class="form-control" onChange={handleInput} required/>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Book Image URL</label>
                                    <input name="imgSrc" type="text" class="form-control" onChange={handleInput} required/>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Short Summary or Description</label>
                                    <input name="description" type="text" class="form-control" onChange={handleInput} required/>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Genre</label>
                                    <input name="genre" type="text" class="form-control" onChange={handleInput} required/>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Author Name</label>
                                    <input name="author" type="text" class="form-control" onChange={handleInput} required/>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Author Image URL</label>
                                    <input name="author_img" type="text" class="form-control" onChange={handleInput} required/>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Buying Link</label>
                                    <input name="buy_link" type="text" class="form-control" onChange={handleInput} required/>
                                </div>

                                <div class="text-center">
                                    <button type="submit" class="btn btn-warning text-white text-decoration-none mb-1 mt-2">Save book details</button>
                                </div>
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
