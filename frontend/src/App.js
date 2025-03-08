import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Context, SharedState } from './context/SharedState';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import MainBody from './components/MainBody';
import Login from './components/Login';
import Footer from './components/Footer';
import Signup from './components/Signup';
import JoinClubs from './components/JoinClubs';
import Meeting from './components/Meeting';
import Profile from './components/Profile';
import Search from './components/Search';
import axios from 'axios';
import './css/Fonts.css'
import './css/App.css'
import './css/starter.css'
import './css/footer.css'
import './css/Rating.css'
import Admin from './components/Admin';
import Loading from './components/Loading';
import MyClubs from './components/MyClubs';
axios.defaults.withCredentials = true // imp for httpOnly Cookies

function App() {
  const { loading } = useContext(Context)

  return (
    <>
      {loading ? (

        <Loading/>

      ) : (

        <Router>
            <Navbar />
            <ToastContainer />

            <Routes>
              <Route exact path="/" element={<MainBody />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/search" element={<Search />} />
              <Route exact path="/join" element={<JoinClubs />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/clubs" element={<MyClubs />} />
              <Route exact path="/meeting/:bookId" element={<Meeting />} />
              <Route exact path="/admin" element={<Admin />} />
            </Routes>

            <Footer />
        </Router>

      )}
    </>
  );
}

export default App;
