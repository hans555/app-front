import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function FixAppointment() {
  const [doctor_id, setDoctor_id] = useState("");
  const [patient_id, setPatient_id] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointment_id, setAppointment_id] = useState("")

  const page_style = {
    marginTop: "50px",
  };
  const form_style = {
    marginTop: "25px",
    marginBottom: "25px",
  };
  const form_label_style = {
    display: "inline-block",
    float: "left",
    clear: "left",
    width: "125px",
    textAlign: "right",
    marginRight: "20px",
  };

  const handleFixAppointments = () => {
    let payload = {
      appointment_id: appointment_id,
      doctor_id: doctor_id,
      patient_id: patient_id,
      appointment_time: time,
      appointment_date: date,
    };
    const requestUrl = "http://localhost:8080/appointment/fix";
    fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("Appointment created");
          setDoctor_id("")
          setPatient_id("")
          setDate("")
          setTime("")
          setAppointment_id("")
        } else {
          console.log("Failed to create appointment");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div style={page_style}>
      <div>
        <h2>Fix Appoinment Detail</h2>
      </div>
      <div>
        <Form>
        <Form.Group style={form_style}>
            <Form.Label style={form_label_style}>Appoinment ID:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Appoinment ID"
              value={appointment_id}
              onChange={(event) => setAppointment_id(event.target.value)}
            />
          </Form.Group>
          <Form.Group style={form_style}>
            <Form.Label style={form_label_style}>Doctor ID:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Doctor ID"
              value={doctor_id}
              onChange={(event) => setDoctor_id(event.target.value)}
            />
          </Form.Group>
          <Form.Group style={form_style}>
            <Form.Label style={form_label_style}>Patient ID:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Patient ID"
              value={patient_id}
              onChange={(event) => setPatient_id(event.target.value)}
            />
          </Form.Group>
          <Form.Group style={form_style}>
            <Form.Label style={form_label_style}>Date:</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Form.Group>
          <Form.Group style={form_style}>
            <Form.Label style={form_label_style}>Time:</Form.Label>
            <Form.Control
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value.concat(":00"))}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleFixAppointments}
            disabled={
              appointment_id === "" ||
              doctor_id === "" ||
              patient_id === "" ||
              date === "" ||
              time === ""
            }
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default FixAppointment;
