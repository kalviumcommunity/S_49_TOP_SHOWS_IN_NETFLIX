import React from 'react';
import axios from 'axios';

const UpdateDeleteEntityForm = ({ entity, onUpdate, onDelete }) => {

  const handleUpdate = async () => {
    // Add update logic here
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/entity/${entity.id}`);
      onDelete(entity.id);
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  return (
    <div>
      {/* Your update form elements here */}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default UpdateDeleteEntityForm;
