const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const Exercise = require('../models/exercise.model');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);  // Log the stack trace for debugging
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode,
    },
  });
};

// GET: Retrieve all exercises
router.get('/', async (req, res, next) => {
    try {
      const exercises = await Exercise.find();
      res.json({ success: true, data: exercises });
    } catch (error) {
      next(error);
    }  
  });
  
// POST: Add a new exercise
router.post('/add', 
  [
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('exerciseType').isString().notEmpty().withMessage('Exercise type is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    body('date').isISO8601().withMessage('Date must be a valid ISO8601 date'),
    handleValidationErrors,
  ],
  async (req, res, next) => {
  console.log(req.body)
  try {
    const { username, exerciseType, description, duration, date } = req.body;

    const newExercise = new Exercise({ 
      username,
      exerciseType,
      description,
      duration: Number(duration),
      date: new Date(date),
    });

    await newExercise.save();
    res.json({ success: true, message: 'Exercise added!', data: newExercise });
  } catch (error) {
    next(error);
  }
});

// GET: Retrieve an exercise by ID
router.get('/:id', 
  [
    param('id').isMongoId().withMessage('Invalid exercise ID'),
    handleValidationErrors,
  ],
  async (req, res, next) => {
    try {
      const exercise = await Exercise.findById(req.params.id);
      if (!exercise) {
        const error = new Error('Exercise not found');
        error.status = 404;
        throw error;
      }
      res.json({ success: true, data: exercise });
    } catch (error) {
      next(error);
    }
});

// DELETE: Delete an exercise by ID
router.delete('/:id', 
  [
    param('id').isMongoId().withMessage('Invalid exercise ID'),
    handleValidationErrors,
  ],
  async (req, res, next) => {
    try {
      const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
      if (!deletedExercise) {
        const error = new Error('Exercise not found');
        error.status = 404;
        throw error;
      }
      res.json({ success: true, message: 'Exercise deleted.' });
    } catch (error) {
      next(error);
    }
});

// PUT: Update an exercise by ID
router.put('/update/:id', 
  [
    param('id').isMongoId().withMessage('Invalid exercise ID'),
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('exerciseType').isString().notEmpty().withMessage('Exercise type is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    body('date').isISO8601().withMessage('Date must be a valid ISO8601 date'),
    handleValidationErrors,
  ],
  async (req, res, next) => {
    try {
      const { username, exerciseType, description, duration, date } = req.body;

      const exercise = await Exercise.findById(req.params.id);
      if (!exercise) {
        const error = new Error('Exercise not found');
        error.status = 404;
        throw error;
      }
  
      exercise.username = username;
      exercise.exerciseType = exerciseType;
      exercise.description = description;
      exercise.duration = Number(duration);
      exercise.date = new Date(date);
  
      await exercise.save();
      res.json({ success: true, message: 'Exercise updated!', data: exercise });
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = { router, errorHandler };
