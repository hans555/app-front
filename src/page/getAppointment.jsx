import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function GetAppointment(props) {
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [appointment, setAppointment] = useState([]);

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
    width: "75px",
    textAlign: "right",
    marginRight: "20px",
  };

	const table_style = {
		border: "5px black",
		marginTop: "25px"

	}

	const table_entry_style = {
		border: "5px",
		borderColor: "black",
  	textAlign: "center"
	}

  const handleGetAppointments = () => {
    let payload = {
      doctor_id: id,
      date: date,
    };
    const requestUrl = "http://localhost:8080/appointment/get";
    fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((resp) => {
        if (resp.ok) {
					setId("")
					setDate("")
          resp.json().then((response) => {
            setAppointment(response.appointments);
          });
        } else {
          console.log("Failed to get appointments");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
		
    <div style={page_style}>
      <div>
        <h2>Input doctor ID and date</h2>
      </div>
      <div>
        <Form>
          <Form.Group style={form_style}>
            <Form.Label style={form_label_style}>Doctor ID:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Doctor ID"
              value={id}
              onChange={(event) => setId(event.target.value)}
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
          <Button
            variant="primary"
            onClick={handleGetAppointments}
            disabled={id === "" || date === ""}
          >
            Submit
          </Button>
        </Form>
      </div>
      <div>
        {appointment.length === 0 ? (
          <h3>No Appointment Found</h3>
        ) : (
          <table style={table_style}>
            <thead>
              <tr>
                <th style={table_entry_style}>Date</th>
                <th style={table_entry_style}>Time</th>
                <th style={table_entry_style}>Appointment_ID</th>
                <th style={table_entry_style}>Doctor ID</th>
                <th style={table_entry_style}>Patient ID</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((app, index) => {
                return (
                  <tr key={index}>
                    <td style={table_entry_style}>{app.date.slice(0, 10)}</td>
                    <td style={table_entry_style}>{app.time}</td>
                    <td style={table_entry_style}>{app.id}</td>
                    <td style={table_entry_style}>{app.doctor_id}</td>
                    <td style={table_entry_style}>{app.patient_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GetAppointment;
