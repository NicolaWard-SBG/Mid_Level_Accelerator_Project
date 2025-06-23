import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { trackExercise } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import IconButton from "@mui/material/IconButton";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BikeIcon from "@mui/icons-material/DirectionsBike";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import OtherIcon from "@mui/icons-material/HelpOutline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./trackExercise.css";

const TrackExercise = ({ currentUser }) => {
  const [exerciseDetails, setExerciseDetails] = useState({
    exerciseType: "",
    description: "",
    duration: 0,
    date: new Date(),
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    description: "",
    duration: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track whether the form has been submitted

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!exerciseDetails.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (exerciseDetails.duration <= 0) {
      newErrors.duration = "Please enter a valid duration.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set submitted flag to true when form is submitted

    if (!validate()) {
      return; // If validation fails, don't submit the form
    }

    const exerciseData = {
      username: currentUser,
      ...exerciseDetails,
    };

    try {
      const response = await trackExercise(exerciseData);
      console.log("Activity logged successfully:", response.data);

      // Clear the form and reset error messages after successful submission
      setExerciseDetails({
        exerciseType: "",
        description: "",
        duration: 0,
        date: new Date(),
      });

      setErrors({
        description: "",
        duration: "",
      });

      setMessage("Activity logged successfully! Well done!");
      setIsSubmitted(false); // Reset the form submission status
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error logging activity:", error);
      console.error("Request data:", exerciseData);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setMessage("There was an error logging your activity. Please try again.");
    }
  };

  const handleDateChange = (date) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, date }));
  };

  const handleTypeSelection = (exerciseType) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, exerciseType }));
  };

  const handleInputChange = (field, value) => {
    setExerciseDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  return (
    <div className="track-exercise-container">
      <h3>Track exercise</h3>
      <Form onSubmit={handleFormSubmit} className="track-exercise-form">
        <Form.Group controlId="exerciseDate" className="form-margin">
          <Form.Label>Select Date:</Form.Label>
          <DatePicker
            selected={exerciseDetails.date}
            onChange={handleDateChange}
            className="date-picker"
            dateFormat="yyyy/MM/dd"
            id="exerciseDate"
            aria-labelledby="exerciseDate"
            aria-describedby="date-format-help"
          />
          <div className="date-format-help">Expected format: YYYY/MM/DD</div>
        </Form.Group>

        {/* Grouping Exercise Type Buttons */}
        <fieldset role="group" aria-labelledby="exerciseTypeGroup">
          <legend id="exerciseTypeGroup">Select exercise type:</legend>
          <div className="exercise-type-selection">
            <IconButton
              aria-label="Running icon button"
              className={`icon-button ${
                exerciseDetails.exerciseType === "Running" ? "selected" : ""
              }`}
              onClick={() => handleTypeSelection("Running")}
            >
              <DirectionsRunIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Cycling"
              className={`icon-button ${
                exerciseDetails.exerciseType === "Cycling" ? "selected" : ""
              }`}
              onClick={() => handleTypeSelection("Cycling")}
            >
              <BikeIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Swimming"
              className={`icon-button ${
                exerciseDetails.exerciseType === "Swimming" ? "selected" : ""
              }`}
              onClick={() => handleTypeSelection("Swimming")}
            >
              <PoolIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Gym"
              className={`icon-button ${
                exerciseDetails.exerciseType === "Gym" ? "selected" : ""
              }`}
              onClick={() => handleTypeSelection("Gym")}
            >
              <FitnessCenterIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="Other exercise type"
              className={`icon-button ${
                exerciseDetails.exerciseType === "Other" ? "selected" : ""
              }`}
              onClick={() => handleTypeSelection("Other")}
            >
              <OtherIcon fontSize="large" />
            </IconButton>
          </div>
        </fieldset>

        <Form.Group controlId="exerciseDescription" className="form-group">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={exerciseDetails.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            name="description"
            aria-invalid={
              exerciseDetails.description.trim() === "" ? "true" : "false"
            }
            aria-describedby="description-error"
          />
          {isSubmitted && errors.description && (
            <div id="description-error" style={{ color: "red" }}>
              {errors.description}
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="exerciseDuration" className="form-group">
          <Form.Label>Duration (minutes):</Form.Label>
          <Form.Control
            type="number"
            required
            value={exerciseDetails.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            name="duration"
            aria-invalid={exerciseDetails.duration <= 0 ? "true" : "false"}
            aria-describedby="duration-error"
          />
          {isSubmitted && errors.duration && (
            <div id="duration-error" style={{ color: "red" }}>
              {errors.duration}
            </div>
          )}
        </Form.Group>
        <Button variant="success" type="submit" className="submit-button">
          Save Activity
        </Button>
      </Form>
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default TrackExercise;
