const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Dummy user data (replace with actual user authentication logic)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Signin endpoint
app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    // Dummy authentication logic
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).send('Invalid username or password');
    }

    // Set username in cookie
    res.cookie('username', username, { httpOnly: true });
    res.send('Signin successful');
});

// Logout endpoint
app.post('/logout', (req, res) => {
    // Clear username cookie
    res.clearCookie('username');
    res.send('Logout successful');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
