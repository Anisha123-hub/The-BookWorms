import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../context/SharedState';


export default function Members(props) {
    const states = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className="modal fade" id="exampleModal"
                aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme={`${states.mode === 'dark' ? 'dark' : 'light'}`}>
                <div className="modal-dialog">
                    <div className="modal-content" style={{ overflowY: 'auto', minHeight: '85vh' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Total Members ({props.memberCount})</h1>

                            <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close"></button>

                        </div>

                        <div className='modal-body'>
                            {props.bookData.members.map((members, index) => (
                                <>
                                    <li key={members.id} className='nav-link btn text-dark'>
                                        <div className="mt-3">
                                            <div className="d-flex justify-content-start align-items-center">
                                                <img
                                                    className="me-2"
                                                    src="https://static.vecteezy.com/system/resources/previews/009/267/048/non_2x/user-icon-design-free-png.png"
                                                    height={30}
                                                />
                                                <span>
                                                    {members.username}
                                                </span>
                                            </div>
                                            <p className="mt-2 fw-bold">{members.chatText}</p>
                                            <hr className='w-100' />
                                        </div>
                                    </li>
                                </>
                            ))}
                        </div>


                        <div className={`modal-footer text-muted sticky-bottom bg-${states.mode === 'dark' ? 'dark' : 'light'}`}>
                            {props.bookData.title} | {props.bookData.author}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
