import React, { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
import AddShowForm from './Compounts/AddShowForm';
import NetflixLoginPage from './Compounts/NetflixLoginPage';

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State to manage login page display

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

  const handleShowUpdated = async (updatedShow) => {
    try {
      await axios.put(`http://localhost:3000/shows/${updatedShow.id}`, updatedShow);
      const updatedShows = shows.map(show => (show.id === updatedShow.id ? updatedShow : show));
      setShows(updatedShows);
      setSelectedShow(null); // Clear selected show after update
    } catch (error) {
      console.error('Error updating show:', error);
    }
  };

  const handleEditShow = (show) => {
    setSelectedShow(show);
  };

  const handleSignInClick = () => {
    setIsLoggingIn(true);
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
            onShowUpdated={handleShowUpdated}
            selectedShow={selectedShow}
          />
          <div className="show-container">
            {shows.map(show => (
              <div className="show-card" key={show.id}>
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
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
