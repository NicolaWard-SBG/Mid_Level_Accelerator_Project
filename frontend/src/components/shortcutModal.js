import React from "react";
import { Modal, Button } from "react-bootstrap";

const ShortcutModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Keyboard Shortcuts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>
            <strong>T</strong>: Track New Exercise
          </li>
          <li>
            <strong>S</strong>: Statistics
          </li>
          <li>
            <strong>J</strong>: Weekly Journal
          </li>
          <li>
            <strong>G</strong>: Goals
          </li>
          <li>
            <strong>L</strong>: Logout
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShortcutModal;
