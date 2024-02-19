import React, { useState } from 'react';
import axios from 'axios';

const EntityForm = ({ onEntityAdded }) => {
  const [entityName, setEntityName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/entity', { name: entityName });
      onEntityAdded(response.data);
      setEntityName('');
    } catch (error) {
      console.error('Error adding entity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Entity Name"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
      />
      <button type="submit">Add Entity</button>
    </form>
  );
};

export default EntityForm;
