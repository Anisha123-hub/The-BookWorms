import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../context/SharedState';
import axios from 'axios';
import { Slide, toast } from 'react-toastify';

export default function Navbar() {
    const states = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        const logoutRequest = axios.get(states.hostname + '/api/user/logout');

        toast.promise(
            logoutRequest, {
            pending: 'Logging out...',
            error: 'Network Error',
            success: "Account Logged out."
        }, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            transition: Slide,
        });

        logoutRequest.then((res) => {
            if (res.data.success) {
                states.setIsAuthenticated(false);
                states.setUser('');
                navigate('/login');
            } else {
                toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    transition: Slide
                });
            }
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        states.setSearchTerm(value);
        if (value.trim() !== '') {
            navigate('/search');
        }
    };

    return (
        <>
            <nav id="mainNavbar" className="navbar navbar-primary navbar-expand-md margin-auto">
                <Link to="/" className="navbar-brand ms-5">
                    <img src="/images/book club logo.png" style={{ width: '200px' }} alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        {location.pathname.includes('/join') ? "" :
                            <li className="nav-item">
                                <Link to="/join" className="nav-link me-3">Join Clubs</Link>
                            </li>
                        }
                    </ul>
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search books by title"
                            aria-label="Search"
                            value={states.searchTerm}
                            onChange={handleSearch}
                        />
                        <button className="btn me-4" type="button">
                            <img src="/images/mag_glass.png" />
                        </button>
                    </form>
                    {states.isAuthenticated ?
                        <ul className="navbar-nav">
                            {location.pathname.includes('/profile') ? "" :
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">{states.user.username}</Link>
                                </li>
                            }
                            <li className="nav-item">
                                <a onClick={handleLogout} className="btn nav-link text-danger">Log Out</a>
                            </li>
                        </ul> :
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/login' className="nav-link">Log In</Link>
                            </li>
                        </ul>
                    }
                </div>
            </nav>
        </>
    );
}
