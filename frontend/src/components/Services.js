import React, { useContext } from 'react'
import { Context } from '../context/SharedState'
import { Link } from 'react-router-dom'

export default function Services() {
    const states = useContext(Context)
    return (
        <>
        <div className={`d-flex justify-content-end align-items-center mt-4 text-${states.mode === 'dark' ? 'light' : 'dark'}`}>
            <Link className='me-5 appearfromTop d-flex align-items-center nav-link' to="/"><span class="material-symbols-outlined fs-3 me-2">keyboard_backspace</span>Back to home</Link>
            <h1 className='pacifico-regular fw-bold appearfromRight me-5'>Our Services</h1>
        </div>
            <div className={`container-fluid mt-5 appearfromTop d-flex justify-content-end  text-${states.mode === 'dark' ? 'light' : 'dark'}`}>
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-9'>

                        <div className='row row-cols-2 row-cols-md-4 g-4'>
                            <div className='col'>
                                <div class="card pt-5">
                                    <span class="material-symbols-outlined fs-2">domain_add</span>
                                    <div className='card-title'>Domain Registration</div>
                                    <div className='card-body'>We provicd .np domain registration service for free.</div>
                                </div>
                            </div>

                            <div className='col'>
                                <div class="card pt-5">
                                    <span class="material-symbols-outlined fs-2">view_cozy</span>
                                    <div className='card-title'>Website Designing</div>
                                    <div className='card-body'>We help you design your website according to your requirements.</div>
                                </div>
                            </div>

                            <div className='col'>
                                <div class="card pt-5">
                                    <span class="material-symbols-outlined fs-2">query_stats</span>
                                    <div className='card-title'>SEO optimization</div>
                                    <div className='card-body'>We provide Search Engine Optmization (SEO) service for your website.</div>
                                </div>
                            </div>

                            <div className='col'>
                                <div class="card pt-5">
                                    <span class="material-symbols-outlined fs-2">badge</span>
                                    <div className='card-title'>ECommerce Website</div>
                                    <div className='card-body'>We provide user friendly website for your ecommerce business.</div>
                                </div>
                            </div>

                            <div className='col'>
                                <div class="card pt-5">
                                    <span class="material-symbols-outlined fs-2">contract_edit</span>
                                    <div className='card-title'>Resume Building</div>
                                    <div className='card-body'>We will built your resume using various AI tools.</div>
                                </div>
                            </div>

                            <div className='col'>
                                <div class="card pt-5">
                                    <span class="material-symbols-outlined fs-2">badge</span>
                                    <div className='card-title'>Personal Portfolio</div>
                                    <div className='card-body'>We help you design a personal portfolio to showcase your skills.</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
