const express = require('express');
const router = express.Router();

let users = [
    { id: 1, movie: 'hi pappa', rating: '10' },
    { id: 2, movie: 'yeh jawani hai deewani', rating: '10' }
];

// Read (GET) all users
router.get('/movie', (req, res) => {
    res.json(users);
});

// Read (GET) a single user by ID
router.get('/movie/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Create (POST) a new user
router.post('/movie', (req, res) => {
    const { movie, rating } = req.body;
    const newUser = {
        id: users.length + 1, 
        movie : movie,
        rating: rating
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update (PUT) an existing user
router.put('/movie/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const { movie, rating } = req.body;
    users[userIndex].movie = movie;
    users[userIndex].rating = rating;
    res.json(users[userIndex]);
});


// Delete (DELETE) a user by ID
router.delete('/movie/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;