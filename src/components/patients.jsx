import React, { Component } from "react";
import { getPatients } from "../services/patient.service";
import PatientCard from "./patient-card";
class Patients extends Component {
  state = {
    patients: [],
  };
  async componentDidMount() {
    const server = await getPatients();
    const data = server.data;
    this.setState({ patients: data.patients });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            {this.state.patients.map((p) => (
              <div key={p._id} className="col-3 mt-3">
                <PatientCard
                  id={p._id}
                  name={p.name}
                  age={p.age}
                  numberOfReads={p.reads.length}
                />
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Patients;
