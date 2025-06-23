import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import moment from "moment";
import sanitizeHtml from "sanitize-html";
import "./goals.css";

// Helper function to sanitize input
export const sanitizeInput = (input) => {
  let sanitizedText = sanitizeHtml(input, {
    allowedTags: [], // No HTML tags are allowed
    allowedAttributes: {}, // No attributes are allowed
  });

  sanitizedText = sanitizedText
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Convert links
    .replace(/[*_]{2}(.+?)[*_]{2}/g, "$1") // Remove bold
    .replace(/[*_](.+?)[*_]/g, "$1") // Remove italic
    .replace(/`{3,}.*?`{3,}/gs, "") // Remove code blocks
    .replace(/`(.+?)`/g, "$1") // Inline code
    .replace(/#{1,6}\s*(.+)$/gm, "$1") // Remove headers
    .replace(/>+\s*(.+)$/gm, "$1"); // Remove blockquotes

  return sanitizedText;
};

const Goals = ({ currentUser }) => {
  const [userGoals, setUserGoals] = useState([]);
  const [newGoalType, setNewGoalType] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");

  // Fetch goals from the goals microservice
  const fetchUserGoals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5020/goals?user_id=${currentUser}`
      );
      setUserGoals(response.data.goals);
    } catch (error) {
      console.error("Error fetching user goals:", error);
    }
  };

  const addNewGoal = async () => {
    if (!newGoalType || !newGoalDate) {
      alert("Please enter both a goal type and a target date.");
      return;
    }

    const sanitizedGoalType = sanitizeInput(newGoalType);

    try {
      const response = await axios.post("http://localhost:5020/goals", {
        user_id: currentUser,
        goal_type: sanitizedGoalType,
        date: newGoalDate,
      });
      console.log("New goal added:", response.data.goal); // Debugging line
      setUserGoals((prevGoals) => [...prevGoals, response.data.goal]);
      setNewGoalType("");
      setNewGoalDate("");
    } catch (error) {
      console.error("Error creating new goal:", error);
    }
  };

  const markGoalAsCompleted = async (goalId) => {
    try {
      const response = await axios.put(
        `http://localhost:5020/goals/${goalId}`,
        {
          status: "completed", // Update the status to completed
        }
      );

      // Update the local state to reflect the change
      setUserGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal._id === goalId ? { ...goal, status: response.data.status } : goal
        )
      );
    } catch (error) {
      console.error("Error updating goal status:", error);
    }
  };

  useEffect(() => {
    fetchUserGoals();
  }, [currentUser]);

  return (
    <div className="goal-container">
      <h4>Goals</h4>
      <h5>Your Goals</h5>
      <ul>
        {userGoals.length > 0 ? (
          userGoals.map((goal) => (
            <li key={goal._id}>
              <span aria-label="goal-status">
                {goal.goal_type} - Status: {goal.status}
              </span>
              <br />
              Set on: {moment(goal.date).format("YYYY-MM-DD")}
              {goal.status !== "completed" && (
                <Button
                  className="button-small"
                  variant="success"
                  onClick={() => markGoalAsCompleted(goal._id)}
                >
                  Mark as Completed
                </Button>
              )}
            </li>
          ))
        ) : (
          <li>No goals found.</li>
        )}
      </ul>

      <Form
        inline="true"
        onSubmit={(e) => {
          e.preventDefault();
          addNewGoal();
        }}
      >
        <Form.Control
          type="text"
          placeholder="Enter a new goal"
          value={newGoalType}
          onChange={(e) => setNewGoalType(e.target.value)}
        />
        <Form.Label htmlFor="goal-date">Set goal date</Form.Label>
        <Form.Control
          type="date"
          id="goal-date" // Make sure the id matches with the htmlFor in the label
          min={moment().format("YYYY-MM-DD")}
          value={newGoalDate}
          onChange={(e) => setNewGoalDate(e.target.value)}
        />
        <Button className="button-small" type="submit">
          Add Goal
        </Button>
      </Form>
    </div>
  );
};

export default Goals;
