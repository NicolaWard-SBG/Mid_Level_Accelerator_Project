import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ShortcutModal from "./shortcutModal";
import "./navbar.css";

const NavbarComponent = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showShortcutModal, setShowShortcutModal] = useState(false);

  // Create refs for each Nav.Link so that when the user navigates using the keyboard shortcuts, the corresponding Nav.Link will be focused
  const trackExerciseRef = useRef(null);
  const statisticsRef = useRef(null);
  const journalRef = useRef(null);
  const goalsRef = useRef(null);
  const logoutRef = useRef(null);
  const shortcutsRef = useRef(null);

  const onNavigate = (route, ref) => {
    console.log("Navigating to:", route);

    switch (route) {
      case "TrackExercise":
        navigate("/trackExercise");
        break;
      case "Statistics":
        navigate("/statistics");
        break;
      case "Journal":
        navigate("/journal");
        break;
      case "Goals":
        navigate("/goals");
        break;
      default:
        console.error("Invalid route:", route);
    }

    // Set focus to the corresponding Nav.Link
    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Do you want to logout?");
    if (isConfirmed) {
      onLogout();
      if (logoutRef.current) {
        logoutRef.current.focus();
      }
    }
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Custom key mapping object
  const keyMappings = {
    t: () => onNavigate("TrackExercise", trackExerciseRef), // 't' for Track Exercise
    s: () => onNavigate("Statistics", statisticsRef), // 's' for Statistics
    j: () => onNavigate("Journal", journalRef), // 'j' for Weekly Journal
    g: () => onNavigate("Goals", goalsRef), // 'g' for Goals
    l: handleLogout, // 'l' for Logout
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the target is an input or text area element, this will prevent the custom key mapping from firing when typing in an input field
      const tagName = event.target.tagName.toLowerCase();
      if (tagName === "input" || tagName === "textarea") {
        return;
      }

      const action = keyMappings[event.key];
      if (action) {
        event.preventDefault();
        action();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyMappings]);

  return (
    <Navbar className="nav-back custom-navbar" expand="lg">
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        aria-expanded={!isCollapsed}
        className={`custom-navbar-toggler ${!isCollapsed ? "active" : ""}`}
        onClick={handleToggle}
        tabIndex="0"
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Nav.Link
              ref={trackExerciseRef}
              className="custom-nav-link"
              onClick={() => onNavigate("TrackExercise", trackExerciseRef)}
            >
              Track New Exercise
            </Nav.Link>

            <Nav.Link
              ref={statisticsRef}
              className="custom-nav-link"
              onClick={() => onNavigate("Statistics", statisticsRef)}
            >
              Statistics
            </Nav.Link>

            <Nav.Link
              ref={journalRef}
              className="custom-nav-link"
              onClick={() => onNavigate("Journal", journalRef)}
            >
              Weekly Journal
            </Nav.Link>

            <Nav.Link
              ref={goalsRef}
              className="custom-nav-link"
              onClick={() => onNavigate("Goals", goalsRef)}
            >
              Goals
            </Nav.Link>

            <Nav.Link
              ref={logoutRef}
              className="custom-nav-link"
              onClick={handleLogout}
            >
              Logout
            </Nav.Link>

            <Nav.Link
              ref={shortcutsRef}
              className="custom-nav-link"
              onClick={() => setShowShortcutModal(true)}
            >
              Keyboard Shortcuts
            </Nav.Link>
          </Nav>
        </Nav>
      </Navbar.Collapse>

      <ShortcutModal
        show={showShortcutModal}
        onClose={() => setShowShortcutModal(false)}
      />
    </Navbar>
  );
};

export default NavbarComponent;
