const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// Load environment variables from .env
dotenv.config();
connectDB();
const userAuthRoutes = require('./Routes/userAuth');
const app = express();

// Test route
app.get('/', (req, res) => {
  res.send('DevConnector API Running');
});
app.use(express.json());
app.use('/api/user', userAuthRoutes);

// Port number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));