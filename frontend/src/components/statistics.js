import React, { useState, useEffect } from "react";
import axios from "axios";
import "./statistics.css";

const Statistics = ({ currentUser }) => {
  const [exerciseStatistics, setExerciseStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchExerciseStatistics = async () => {
      const graphqlRequestPayload = {
        query: `
          query FilteredStats($name: String!) {
            filteredStats(name: $name) {
              success
              errors
              results {
                username
                exercises {
                  exerciseType
                  totalDuration
                }
              }
            }
          }
        `,
        variables: {
          name: currentUser,
        },
      };

      try {
        const response = await axios.post(
          "http://localhost:5050/api/graphql",
          graphqlRequestPayload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const {
          data: {
            data: { filteredStats },
          },
        } = response;

        if (filteredStats.success) {
          setExerciseStatistics(filteredStats.results);
        } else {
          setFetchError("Failed to fetch exercise statistics.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error during GraphQL data fetch:", error);
        setFetchError("An error occurred while fetching exercise statistics.");
        setIsLoading(false);
      }
    };

    fetchExerciseStatistics();
  }, [currentUser]);

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div className="error-message">{fetchError}</div>;

  const currentUserStats = exerciseStatistics.find(
    (userStats) => userStats.username === currentUser
  );

  return (
    <div className="stats-container">
      <h4>Great work, {currentUser}! Here's your exercise summary:</h4>
      {currentUserStats ? (
        currentUserStats.exercises.map((exerciseData, index) => (
          <div key={index} className="exercise-data">
            <div>
              <strong>{exerciseData.exerciseType}</strong>
            </div>
            <div>Total Duration: {exerciseData.totalDuration} min</div>
          </div>
        ))
      ) : (
        <p>No exercise data available for you yet.</p>
      )}
    </div>
  );
};

export default Statistics;
