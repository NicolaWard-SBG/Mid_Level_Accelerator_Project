import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/navbar";
import TrackExercise from "./components/trackExercise";
import Goals from "./components/goals";
import Statistics from "./components/statistics";
import Footer from "./components/footer";
import Login from "./components/login";
import Signup from "./components/signup";
import Journal from "./components/journal";
import logo from "./img/fitsync_full_logo.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  return (
    <div className="App">
      <Router>
        <header className="appTitle" role="banner">
          <img src={logo} alt="FitSync Logo" id="appLogo" />
        </header>

        {isLoggedIn && <nav aria-label="Main navigation"><NavbarComponent onLogout={handleLogout} /></nav>}

        <main className="componentContainer">
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Signup
                    onUserSignup={(username) => {
                      setIsLoggedIn(true);
                      setCurrentUser(username);
                    }}
                  />
                )
              }
            />
            <Route
              path="/goals"
              element={
                isLoggedIn ? (
                  <Goals currentUser={currentUser} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ message: "Please log in to access this page." }}
                  />
                )
              }
            />
            <Route
              path="/trackExercise"
              element={
                isLoggedIn ? (
                  <TrackExercise currentUser={currentUser} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ message: "Please log in to access this page." }}
                  />
                )
              }
            />
            <Route
              path="/statistics"
              element={
                isLoggedIn ? (
                  <Statistics currentUser={currentUser} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ message: "Please log in to access this page." }}
                  />
                )
              }
            />
            <Route
              path="/journal"
              element={
                isLoggedIn ? (
                  <Journal currentUser={currentUser} />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ message: "Please log in to access this page." }}
                  />
                )
              }
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/trackExercise" />
                ) : (
                  <Navigate
                    to="/login"
                    state={{ message: "Please log in to access this page." }}
                  />
                )
              }
            />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default App;
