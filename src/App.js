import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import GetAppointment from "./page/GetAppointment";

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
                <li>
                  <Link to="/getAppointment">Get Appointment</Link>
                </li>
                <li>
                  <Link to="/home">Home</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/getAppointment" element={<GetAppointment />} />
              <Route path="/Home" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
