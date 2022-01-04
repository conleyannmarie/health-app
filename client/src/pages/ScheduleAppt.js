import React from "react";
import Auth from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";

const ScheduleAppt = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <h1>Schedule An Appointment</h1>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Specialty
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Cardio</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Endocrine</Dropdown.Item>
            <Dropdown.Item href="#/action-3">birth</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Provider
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Chris</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Conley</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Johnson</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </main>
  );
};

export default ScheduleAppt;
