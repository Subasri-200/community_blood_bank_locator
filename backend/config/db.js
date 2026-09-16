const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/community_blood_bank';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500, // Quick check for local MongoDB daemon
    });
    console.log(`[Database] MongoDB Connected to external/local instance: ${conn.connection.host}`);
  } catch (error) {
    console.log(`[Database] Local MongoDB server not available at ${mongoUri}. Falling back to in-memory MongoDB server...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[Database] Connected successfully to In-Memory MongoDB server at: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`[Database Error] Could not connect to MongoDB: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
