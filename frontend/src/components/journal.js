import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import moment from "moment";
import "./journal.css";
import { logError } from "../utils/errorHandler";

const Journal = ({ currentUser }) => {
  const [weekStartDate, setWeekStartDate] = useState(
    moment().startOf("week").toDate()
  );
  const [weekEndDate, setWeekEndDate] = useState(
    moment().endOf("week").toDate()
  );
  const [weeklyExerciseData, setWeeklyExerciseData] = useState([]);

  const fetchWeeklyExerciseData = async () => {
    try {
      const apiUrl = `http://localhost:5050/stats/weekly/?user=${currentUser}&start=${moment(
        weekStartDate
      ).format("YYYY-MM-DD")}&end=${moment(weekEndDate).format("YYYY-MM-DD")}`;
      const response = await axios.get(apiUrl);

      console.log("API Response:", response.data);

      if (response.data.stats && Array.isArray(response.data.stats)) {
        setWeeklyExerciseData(response.data.stats);
      } else {
        logError("Unexpected response structure:", response.data);
        setWeeklyExerciseData([]);
      }
    } catch (error) {
      logError(
        "Failed to fetch weekly exercise data. Details:",
        error.message || error
      );
    }
  };

  useEffect(() => {
    fetchWeeklyExerciseData();
  }, [currentUser, weekStartDate, weekEndDate]);

  const navigateToPreviousWeek = () => {
    setWeekStartDate(
      moment(weekStartDate).subtract(1, "weeks").startOf("week").toDate()
    );
    setWeekEndDate(
      moment(weekEndDate).subtract(1, "weeks").endOf("week").toDate()
    );
  };

  const navigateToNextWeek = () => {
    setWeekStartDate(
      moment(weekStartDate).add(1, "weeks").startOf("week").toDate()
    );
    setWeekEndDate(moment(weekEndDate).add(1, "weeks").endOf("week").toDate());
  };

  return (
    <div className="journal-container">
      <h4>Weekly Exercise Journal</h4>
      <br />
      <div className="date-range">
        <Button className="button-small" onClick={navigateToPreviousWeek}>
          &larr; Previous
        </Button>
        <span>
          {moment(weekStartDate).format("YYYY-MM-DD")} to{" "}
          {moment(weekEndDate).format("YYYY-MM-DD")}
        </span>
        <Button className="button-small" onClick={navigateToNextWeek}>
          Next &rarr;
        </Button>
      </div>
      <ul>
        {weeklyExerciseData && weeklyExerciseData.length > 0 ? (
          weeklyExerciseData.map((exerciseData, index) => (
            <li key={index} className="exercise-journal-data">
              {exerciseData.exerciseType} - {exerciseData.totalDuration} minutes
            </li>
          ))
        ) : (
          <li>No exercises found for this period.</li>
        )}
      </ul>
    </div>
  );
};

export default Journal;
