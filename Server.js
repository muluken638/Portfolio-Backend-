const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./connection/db'); // Import the DB connection function
const path = require('path');

dotenv.config();
const app = express();

// Connect to the Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
app.use('/api/auth', authRoutes);
app.use('/api', portfolioRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the portfolio routes
app.use(portfolioRoutes);
// Start the Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
