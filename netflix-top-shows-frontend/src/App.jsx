import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EntityForm from './EntityForm';

function App() {
  const [topShows, setTopShows] = useState([]);

  useEffect(() => {
    fetchTopShows();
  }, []);

  const fetchTopShows = async () => {
    try {
      const response = await axios.get('/api/shows'); // Assuming your API endpoint is '/api/shows'
      setTopShows(response.data);
    } catch (error) {
      console.error('Error fetching top shows:', error);
    }
  };

  const handleEntityAdded = (newEntity) => {
    setTopShows([...topShows, newEntity]);
  };

  return (
    <div>
      <h1>Top Shows on Netflix</h1>
      <EntityForm onEntityAdded={handleEntityAdded} />
      
    </div>
  );
}

export default App;
