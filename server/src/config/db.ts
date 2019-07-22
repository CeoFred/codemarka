import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "../util/secrets";

// // Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true} ).then(
    () => { 
        console.log("Connected to mongo");
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
const db = mongoose.connection;

db.on("error", () => {
    // debug(`MongoDB connection error ${config.database.url} \nPlease make sure MongoDB is running.`);
    process.exit();
});

db.once("open", () => {
    // debug("MongoDB connection with database succeeded.");
});

process.on("SIGINT", () => {
    db.close(() => {
        // debug("MongoDB connection disconnected through app termination.");
        process.exit();
    });
});

export default  db;
