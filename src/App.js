import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CancelAppointment from "./page/CancelAppointment";
import GetAppointment from "./page/GetAppointment";
import FixAppointment from "./page/FixAppointment";
import CreateAppointment from "./page/CreateAppoinment";

function App() {
  return (
    <div className="App-Container">
      <div>
        <h1>This is a simple app</h1>
      </div>
      <div>
        <Router>
          <div>
            <nav>
              <ul>
                <li className="List">
                  <Link to="/getAppointment">Get Appointment</Link>
                </li>
                <li className="List">
                  <Link to="/fixAppointment">Fix Appointment</Link>
                </li>
                <li className="List">
                  <Link to="/cancelAppointment">Cancel Appointment</Link>
                </li>
                <li className="List">
                  <Link to="/createAppointment">Convert CSV file</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/getAppointment" element={<GetAppointment />} />
              <Route path="/fixAppointment" element={<FixAppointment />} />
              <Route path="/cancelAppointment" element={<CancelAppointment />} />
              <Route path="/createAppointment" element={<CreateAppointment />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
