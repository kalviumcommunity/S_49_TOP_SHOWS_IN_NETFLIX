import React, { useState } from "react";
import axios from 'axios';
import './AddShowForm.css'; // Importing CSS file for styling

const AddShowForm = ({ onShowAdded, onShowUpdated, onShowDeleted }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    year: "",
    certificate: "",
    runtime: "",
    genre: "",
    rating: "",
    description: "",
    director: "",
    stars: "",
    votes: "",
    url: ""
  });
  const [showModal, setShowModal] = useState(false); // State to toggle modal display

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Log form data
    try {
      if (formData.id) {
        // Update existing show
        const response = await axios.put(`http://localhost:3000/shows/${formData.id}`, formData);
        onShowUpdated(response.data);
      } else {
        // Add new show
        const response = await axios.post('http://localhost:3000/shows', formData);
        onShowAdded(response.data);
      }
      setFormData({
        title: "",
        image: "",
        year: "",
        certificate: "",
        runtime: "",
        genre: "",
        rating: "",
        description: "",
        director: "",
        stars: "",
        votes: "",
        url: ""
      });
      toggleModal();
    } catch (error) {
      console.error(error);
      // Handle error: display a message to the user or perform other actions
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/shows/${formData.id}`);
      onShowDeleted(formData.id);
      toggleModal();
    } catch (error) {
      console.error(error);
      // Handle error: display a message to the user or perform other actions
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="add-show-form">
      <button onClick={() => {setFormData({}); toggleModal();}} className="toggle-button">Add Show</button>
      {showModal &&
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <form onSubmit={handleSubmit} className="show-form">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
              <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
              <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
              <input type="text" name="certificate" value={formData.certificate} onChange={handleChange} placeholder="Certificate" required />
              <input type="text" name="runtime" value={formData.runtime} onChange={handleChange} placeholder="Runtime" required />
              <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required />
              <input type="text" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
              <input type="text" name="director" value={formData.director} onChange={handleChange} placeholder="Director" required />
              <input type="text" name="stars" value={formData.stars} onChange={handleChange} placeholder="Stars" required />
              <input type="text" name="votes" value={formData.votes} onChange={handleChange} placeholder="Votes" required />
              <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="IMDb URL" required />
              <button type="submit">{formData.id ? "Update Show" : "Add Show"}</button>
              {formData.id && <button type="button" onClick={handleDelete}>Delete Show</button>}
            </form>
          </div>
        </div>
      }
    </div>
  );
};

export default AddShowForm;
