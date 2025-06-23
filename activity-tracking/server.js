const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const promClient = require('prom-client');
const config = require("./config.json");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5300;

const mongoUri = config.mongoUri
  .replace(
    "${MONGO_INITDB_ROOT_USERNAME}",
    process.env.MONGO_INITDB_ROOT_USERNAME
  )
  .replace(
    "${MONGO_INITDB_ROOT_PASSWORD}",
    process.env.MONGO_INITDB_ROOT_PASSWORD
  );
const mongoDb = config.mongoDb;

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: mongoDb,

  })
  .then(() =>
    console.log("MongoDB database connection established successfully")
  )
  .catch((error) => console.error("MongoDB connection error:", error));

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

// Event listener for MongoDB connection errors
connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Enable the collection of default metrics
promClient.collectDefaultMetrics({ register });

// Add a route for the metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    // Retrieve metrics from the registry
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Routes
const { router: exercisesRouter, errorHandler } = require('./routes/exercises');

app.use("/exercises", exercisesRouter);
app.use(errorHandler);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send({ status: "healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
