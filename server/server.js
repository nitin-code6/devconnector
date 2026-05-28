const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// Load environment variables from .env
const cookieParser = require('cookie-parser');
dotenv.config();
const client=require('./config/redis');
const userAuthRoutes = require('./Routes/userAuth');
const profileRoutes = require('./Routes/profile');
const app = express();

// Test route
// app.get('/', (req, res) => {
//   res.send('DevConnector API Running');
// });
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userAuthRoutes);
app.use('/api/profile', profileRoutes);
const startServer = async () => {
  try {
    await connectDB(); // DB connect

    await client.connect(); // Redis connect
//     await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result) 
    console.log("Redis connected");


    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


  } catch (err) {
    console.error("Error occurred:", err);
  }
};

startServer();