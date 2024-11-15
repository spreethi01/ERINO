const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app and database
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(require('./middlewares/logger'));

// Routes
app.use('/contact', require('./routes/contactRoute'));

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
