// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [topShows, setTopShows] = useState([]);

  useEffect(() => {
    fetchTopShows();
  }, []);

  const fetchTopShows = async () => {
    try {
      const response = await axios.get('mongodb+srv://vidhvathj:vajh2005@cluster0.gef69tl.mongodb.net/'); // Assuming your API endpoint is '/api/shows'
      setTopShows(response.data);
    } catch (error) {
      console.error('Error fetching top shows:', error);
    }
  };

  return (
    <div>
      <h1>Top Shows on Netflix</h1>
      <ul>
        {topShows.map((genre) => (
          <li key={genre.id}> {/* Use genre id as key */}
            {genre.name} {/* Display genre name */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
