const request = require('supertest');
const express = require('express');
const { router, errorHandler } = require('../../routes/exercises');
const Exercise = require('../../models/exercise.model');

// Mock the Exercise model
jest.mock('../../models/exercise.model');

const validObjectId = '507f191e810c19729de860ea'; // Valid MongoDB ObjectId
const app = express();
app.use(express.json());
app.use('/api/exercises', router);
app.use(errorHandler);

// Suppress console.error during tests
jest.spyOn(console, 'error').mockImplementation(() => {});

describe('Exercise API Endpoints', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/exercises', () => {
    it('should return all exercises', async () => {
      const mockExercises = [
        { id: validObjectId, username: 'John', exerciseType: 'Run', description: 'Morning jog', duration: 30, date: '2023-01-01' },
        { id: validObjectId, username: 'Jane', exerciseType: 'Yoga', description: 'Evening yoga', duration: 45, date: '2023-01-02' },
      ];
      Exercise.find.mockResolvedValue(mockExercises);

      const res = await request(app).get('/api/exercises');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockExercises);
    });
  });

  describe('POST /api/exercises/add', () => {
    it('should return validation errors for invalid input', async () => {
      const res = await request(app).post('/api/exercises/add').send({});

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('GET /api/exercises/:id', () => {
    it('should return an exercise by ID', async () => {
      const mockExercise = { id: validObjectId, username: 'John', exerciseType: 'Run', description: 'Morning jog', duration: 30, date: '2023-01-01' };
      Exercise.findById.mockResolvedValue(mockExercise);

      const res = await request(app).get(`/api/exercises/${validObjectId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockExercise);
    });

    it('should return 404 if exercise not found', async () => {
      Exercise.findById.mockResolvedValue(null);

      const res = await request(app).get(`/api/exercises/${validObjectId}`);

      expect(res.status).toBe(404);
      expect(res.body.error.message).toBe('Exercise not found');
    });
  });

  describe('DELETE /api/exercises/:id', () => {
    it('should delete an exercise by ID', async () => {
      Exercise.findByIdAndDelete.mockResolvedValue(true);

      const res = await request(app).delete(`/api/exercises/${validObjectId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Exercise deleted.');
    });

    it('should return 404 if exercise not found', async () => {
      Exercise.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete(`/api/exercises/${validObjectId}`);

      expect(res.status).toBe(404);
      expect(res.body.error.message).toBe('Exercise not found');
    });
  });

  describe('PUT /api/exercises/update/:id', () => {
    it('should update an exercise by ID', async () => {
      const existingExercise = {
        id: validObjectId,
        username: 'John',
        exerciseType: 'Run',
        description: 'Morning jog',
        duration: 30,
        date: '2023-01-01',
        save: jest.fn().mockResolvedValue({
          id: validObjectId,
          username: 'John',
          exerciseType: 'Run',
          description: 'Evening jog',
          duration: 35,
          date: new Date('2023-01-01').toISOString(),
        }),
      };

      const updatedExercise = {
        username: 'John',
        exerciseType: 'Run',
        description: 'Evening jog',
        duration: 35,
        date: '2023-01-01',
      };

      Exercise.findById.mockResolvedValue(existingExercise);

      const res = await request(app).put(`/api/exercises/update/${validObjectId}`).send(updatedExercise);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Exercise updated!');
      expect(res.body.data).toMatchObject({
        ...updatedExercise,
        date: expect.any(String), // Allow ISO 8601 string
      });

      // Verify save was called
      expect(existingExercise.save).toHaveBeenCalled();
    });

    it('should return 404 if exercise not found', async () => {
      Exercise.findById.mockResolvedValue(null);

      const res = await request(app).put(`/api/exercises/update/${validObjectId}`).send({
        username: 'John',
        exerciseType: 'Run',
        description: 'Morning jog',
        duration: 30,
        date: '2023-01-01',
      });

      expect(res.status).toBe(404);
      expect(res.body.error.message).toBe('Exercise not found');
    });
  });
});