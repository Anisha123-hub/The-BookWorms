import { createContext } from "react";
import { useEffect, useState } from 'react';
import { Slide, toast } from 'react-toastify';
import axios from 'axios';

const Context = createContext();

const SharedState = (props) => {
    const hostname = 'http://localhost:9090'

    // Loading state
    const [loading, setLoading] = useState(true);

    // State For checking whether the user is loggedIn or not
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Storing loggedIn user details
    const [user, setUser] = useState({});

    // Storing entire bookclub details
    const [books, setBooks] = useState([]);

    // Storing Search Term
    const [searchTerm, setSearchTerm] = useState('');

    //For Modal Toggle (Members.js)
    const toggleModal = () => {
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
        modal.toggle()
    }


    // Getting user details of the loggedIn user
    const fetchUser = async () => {
        await axios.get(hostname + '/api/user/profile').then((res) => {
            if (res.data.success) {
                setIsAuthenticated(res.data.success);
                setUser(res.data.user);
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    transition: Slide
                });
            }

        }).catch((error) => {
            if (error.response?.status === 401) {
                console.log('User Not loggedIn');

            } else {
                toast.error(error.response?.data.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    theme: "dark",
                    transition: Slide
                });
            }
        });
    };

    //Getting all book details
    const fetchBooks = async () => {
        try {
            const response = await axios.get(hostname + '/api/book/all');
            setBooks(response.data.books);
        } catch (error) {
            console.error('Error fetching books:', error);
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 2000,
                theme: "dark",
                transition: Slide
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchUser(), fetchBooks()]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Set loading to false after both calls
            }
        };

        fetchData();
    }, [isAuthenticated]);


    const [recommendBooks, setRBooks] = useState([]);

    const genreQuery = books
        .filter(book => book.members.some(member => member.userId === user._id))  // Filter books by userId
        .map(book => book.genre)  // Map to return only the genre
        .join(' ');  // Join the genres into a single string with spaces

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true)
            try {
                const response = await axios.post(hostname + "/api/book/recommend", { genre: genreQuery });
                setRBooks(response.data);
            }
            catch (err) {
                console.error("Error fetching recommendations:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [genreQuery]);



    return (
        <Context.Provider value={{
            hostname,
            loading, setLoading,
            isAuthenticated, setIsAuthenticated,
            user, setUser,
            books, setBooks,
            searchTerm, setSearchTerm,
            recommendBooks, setRBooks, genreQuery,
            toggleModal
        }}>

            {props.children}

        </Context.Provider>
    );
};

export { Context, SharedState };
