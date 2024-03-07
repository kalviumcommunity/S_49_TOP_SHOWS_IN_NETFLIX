import React, { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
import AddShowForm from './Compounts/AddShowForm';
import NetflixLoginPage from './Compounts/NetflixLoginPage';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Filter from "./Compounts/Filter";
import Cookies from 'js-cookie'; // Import Cookies

function App() {
  const [emails, setemails] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate(); // Import useNavigate

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/signups');
        const userEmails = response.data.map(user => user.email);
        setemails(userEmails);
  
        // Set initial value of selectedUser from cookie
        const emailFromCookie = Cookies.get('email');
        if (emailFromCookie && userEmails.includes(emailFromCookie)) {
          setSelectedUser(emailFromCookie);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };
  
    fetchUsernames();
  }, []);
  

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('token');
    window.location.reload();
  };

  const handleUserChange = (event) => {
    const selectedemail = event.target.value;
    setSelectedUser(selectedemail);
    navigate(`/shows/${selectedemail}`); // Navigate to ReviewsByUser component
  };

  const [shows, setShows] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await axios.get('http://localhost:3000/shows');
      setShows(response.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  const handleShowAdded = (newShow) => {
    setShows([...shows, newShow]);
  };

  const handleSignInClick = () => {
    setIsLoggingIn(true);
  };

  const handleDeleteClick = async (id) => {
    console.log("Deleting show with ID:", id);
    const confirmDelete = window.confirm(`Are you sure you want to delete the show ?`);
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/shows/${id}`);
      setShows(prevShows => prevShows.filter(show => show._id !== id));
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  };

  return (
    <div className="App">
      <h1>TV Shows In Netflix</h1>
      <div className="header">
        {!isLoggingIn ? (
          <button onClick={handleSignInClick}>Sign In</button>
        ) : null}
      </div>
      {isLoggingIn ? (
        <NetflixLoginPage />
      ) : (
        <>
          <AddShowForm
            onShowAdded={handleShowAdded}
          />
          <div className="navbar-item">
            <Link to="/" onClick={handleLogout}>
              <span className="link-text">Log out</span>
            </Link>
          </div>
          <div className="navbar-item dropdown">
            <span className="link-text">{selectedUser}</span>
            <div className="dropdown-content">
              <select name="dropdown-content" id="dropdown-content" value={selectedUser} onChange={handleUserChange}>
                <option value="">Select email</option>
                {emails.map((email, index) => (
                  <option key={index} value={email}>{email}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="show-container">
            {shows.map(show => (
              <div className="show-card" key={show._id}>
                <h2>{show.title}</h2>
                <img src={show.image} alt={show.title} />
                <p><strong>Year:</strong> {show.year}</p>
                <p><strong>Certificate:</strong> {show.certificate}</p>
                <p><strong>Runtime:</strong> {show.runtime}</p>
                <p><strong>Genre:</strong> {show.genre.join(', ')}</p>
                <p><strong>Rating:</strong> {show.rating}</p>
                <p><strong>Description:</strong> {show.description}</p>
                <p><strong>Director:</strong> {show.director}</p>
                <p><strong>Stars:</strong> {show.stars.join(', ')}</p>
                <p><strong>Votes:</strong> {show.votes}</p>
                <a href={show.url} target="_blank" rel="noopener noreferrer">IMDb Link</a>
                <button onClick={() => handleDeleteClick(show._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
      <Routes>
      <Route path="/shows/:email" element={<Filter/>} />
      </Routes>
    </div>
  );
}

export default App;
