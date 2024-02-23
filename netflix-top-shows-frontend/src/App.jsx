
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [shows, setShows] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:3000/shows')
      .then(response => {
        setShows(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>TV Shows In Netflix</h1>
      <div className="show-container">
        {shows.map(show => (
          <div className="show-card" key={show.title}>
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
    </div>
  );
}

export default App;
