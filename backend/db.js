const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/"

const connectToMongo = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/inotebook');
        console.log("Connected to Mongo Successfully");
    } 
    catch (error) {
        console.error("MongoDB connection failed:", error);
        // process.exit(1); // optional: exit if unable to connect
  }
}

module.exports = connectToMongo;