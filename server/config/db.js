const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.connection_string);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;