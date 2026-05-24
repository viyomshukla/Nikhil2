const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    // For debugging, log the URI without password
    const uri = process.env.MONGO_URI;
    if (uri) {
      const maskedUri = uri.replace(/(:)[^:@]+(@)/g, '$1****$2');
      console.error(`MongoDB URI (masked): ${maskedUri}`);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
