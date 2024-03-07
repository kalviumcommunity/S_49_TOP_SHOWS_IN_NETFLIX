import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const showsByUser = () => {
  const [shows, setshows] = useState([]);
  const { email } = useParams();

  useEffect(() => {
    const fetchshows = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/shows?email=${email}`);
        const filteredshows = response.data.filter(shows => shows.email === email);
        setshows(filteredshows);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchshows();
  }, [email]);

  return (
    <div>
      <h1 className="shows">shows by {email}</h1>
      <div className="shows-list">
        {shows.map((shows, index) => (
          <div key={index} className="shows-card">
            <h2>{shows.title}</h2>
            <p>{shows.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default showsByUser;