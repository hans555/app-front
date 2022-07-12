import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Papa from "papaparse";

function CreateAppointment() {
  const [file, setFile] = useState(null);

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

  const dateFormatter = (d) => {
    return d.slice(4, 8) + "-" + d.slice(2, 4) + "-" + d.slice(0, 2);
  };

  const handleConvertCSV = () => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(result) {
        var new_appointments = result.data.map((app) => {
          var arr = app.appointment_datetime.split(" ");
          return {
            appointment_id: app.appointment_id,
            appointment_date: dateFormatter(arr[0]),
            appointment_time: arr[1],
            doctor_id: app.doctor_id,
            patient_id: app.patient_id,
          };
        });
        handleCreateAppointments(new_appointments)
      },
    });
  };

  const handleCreateAppointments = (appointments) => {
    let payload = {
      appointments: appointments,
    };
    const requestUrl = "http://localhost:8080/appointment/create";
    fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("Appointments created");
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
            <Form.Label style={form_label_style}>Upload CSV File:</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
              accept=".csv"
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleConvertCSV}
            disabled={file === null}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateAppointment;
