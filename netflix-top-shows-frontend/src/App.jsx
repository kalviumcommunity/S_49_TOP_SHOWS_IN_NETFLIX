import React, { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';
import AddShowForm from './Compounts/AddShowForm';
import NetflixLoginPage from './Compounts/NetflixLoginPage';
import Filter from './Compounts/Filter/Filter'

function App() {
  const [shows, setShows] = useState([]);
 
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

  const handleSignInClick = () => {
    setIsLoggingIn(true);
  };

  const handleDeleteClick = async (title) => {
    console.log("Deleting show with title:", title);
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(`Are you sure you want to delete the show ?`);
    if (!confirmDelete) {
      return; // If user cancels, do nothing
    }
    try {
      console.log(title)
      // Send a delete request to the server with the title of the show to be deleted
      await axios.delete(`http://localhost:3000/shows/${title}`);
      // If the delete request is successful, update the state to remove the show
      setShows(prevShows => prevShows.filter(show => show.title !== title));
      
      // Reload the page after deletion
      window.location.reload();

    } catch (error) {
      console.error('Error deleting show:', error);
    }
};


  return (
    <div className="App">
      <h1>TV Shows In Netflix</h1>
      <Filter></Filter>
      
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
                <button onClick={() => handleDeleteClick(show._id)}>Delete</button>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

