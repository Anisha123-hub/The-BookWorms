import axios from 'axios';
import { useEffect, useState } from 'react';
import { createContext } from "react";
import { Slide, toast } from 'react-toastify';

const Context = createContext();

const SharedState = (props) => {
    let hostname;
    if (process.env.NODE_ENV === 'production') {
        hostname = process.env.REACT_APP_HOSTNAME
    } else {
        hostname = process.env.REACT_APP_LOCALHOST
    }

    //check whether it is desktop or phone
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 992);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Loading state
    const [loading, setLoading] = useState(false);

    // Storing user details
    const [user, setUser] = useState({});

    //Storing all book details
    const [books, setBooks] = useState([]);

    //Storing Search Term
    const [searchTerm, setSearchTerm] = useState('');

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Dark Mode toggle
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');

    //For Mode Switch
    const switchMode = () => {
        if (mode === 'dark') {
            setMode('light')
        }
        else {
            setMode('dark')
        }
    };
    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode]);


    useEffect(() => {
        const fetchuser = async () => {
            console.log("Fetching user...")
            axios.get(hostname + '/api/user/profile').then((res) => {
                if (res.data.success) {
                    setIsAuthenticated(res.data.success);
                    setUser(res.data.user);
                    toast.success(res.data.message, {
                        position: "bottom-right",
                        autoClose: 2000,
                        theme: "colored",
                        transition: Slide
                    });
                }

            }).catch((error) => {
                console.error('Error backend response:', error);
                toast.error(error.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    theme: "dark",
                    transition: Slide
                });
            });
        };

        fetchuser();

    }, [isAuthenticated]);


    return (
        <Context.Provider value={{
            hostname,
            mode, switchMode,
            isDesktop, setIsDesktop,
            loading, setLoading,
            isAuthenticated, setIsAuthenticated,
            user, setUser,
            books, setBooks,
            searchTerm, setSearchTerm

        }}>

            {props.children}

        </Context.Provider>
    );
};

export { Context, SharedState };
