import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPatient } from "../services/patient.service";
import ReadCard from "./read-card";
class Patient extends Component {
  state = {
    id: "",
    name: "",
    age: 0,
    reads: [],
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const server = await getPatient(id);
    const patient = server.data.patient;
    this.setState({
      id,
      name: patient.name,
      age: patient.age,
      reads: patient.reads,
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container text-white">
          <div className="row">
            <div className="col-2 text-left">
              <h1>Name:</h1>
            </div>
            <div className="col-8 d-flex align-items-center justify-content-start">
              <h3>{this.state.name}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-2 text-left">
              <h1>Age:</h1>
            </div>
            <div className="col-8  d-flex align-items-center justify-content-start">
              <h3>{this.state.age}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-4 text-left">
              <h1>Number Of Reads:</h1>
            </div>
            <div className="col-8  d-flex align-items-center justify-content-start">
              <h3>{this.state.reads.length}</h3>
            </div>
          </div>
          <hr className="bg-white" />
          <div className="row">
            <div className="col-12 text-left">
              <Link
                className="btn btn-primary"
                to={`/monitor/${this.state.id}/new`}
              >
                New Read
              </Link>
            </div>
          </div>
          <div className="row mt-3">
            {this.state.reads.map((r) => (
              <div key={r._id} className="col-6  mt-3">
                <ReadCard
                  id={this.state.id}
                  readId={r._id}
                  time={r.time}
                  xChart={r.xChart}
                  rChart={r.rChart}
                  duration={r.duration}
                />
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Patient;
