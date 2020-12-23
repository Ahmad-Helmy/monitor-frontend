import React, { Component } from "react";
import { postPatient } from "../services/patient.service";
class CreatePatient extends Component {
  state = {
    name: "",
    age: 0,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await postPatient(this.state.name, this.state.age);
    this.props.history.push("/patients");
  };

  renderInput(label, type, name) {
    return (
      <div className="form-group text-left">
        <label className="font-weight-bold" htmlFor="name">
          {label}
        </label>
        <input
          type={type}
          className="form-control"
          placeholder={label}
          id={name}
          name={name}
          value={this.state[name]}
          onChange={this.handleChange}
        />
      </div>
    );
  }
  render() {
    return (
      <div
        style={{ width: "600px" }}
        className="container bg-light p-5 mt-5 rounded"
      >
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-12">
              {this.renderInput("Patient Name:", "text", "name")}
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12">
              {this.renderInput("Patient Age:", "number", "age")}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePatient;
