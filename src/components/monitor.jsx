import React, { Component } from "react";
import PlotChart from "./plot-chart";
import openSocket from "socket.io-client";
import queryString from "query-string";
import { getPatient } from "../services/patient.service";

import "./monitor.css";
const socket = openSocket("localhost:4200");

class Monitor extends Component {
  state = {
    id: "",
    mode: "",
    name: "",
    age: "",
    puls: 0,
    status: "Relax",
    tempreture: 0,
    readNumber: 0,
    ecg: {
      title: "ECG",
      last: 0,
      start: 0,
      current: 0,
      length: 3000,
      limit: 100,
      data: [],
    },
    emg: {
      title: "EMG",
      start: 0,
      current: 0,
      length: 3000,
      limit: 100,
      data: [],
    },
    temp: {
      title: "Tempreture",
      start: 0,
      current: 0,
      length: 35,
      limit: 1,
      data: [],
    },
  };

  async componentDidMount() {
    const { id, mode } = this.props.match.params;
    let query = { readId: "" };
    if (mode === "show") {
      query = queryString.parse(this.props.location.search);
    }
    const server = await getPatient(id);
    const patient = server.data.patient;
    socket.connect();
    socket.emit("initialize", { id, mode, readId: query.readId });
    this.initializeData("ecg", 0);
    this.initializeData("emg", 5);
    this.initializeData("temp", 37);
    this.startSocketListener("ecg", (data) => {
      let max = data[0][1];
      for (let i = 0; i < data.length; i++) {
        if (data[i][1] > max) max = data[i][1];
      }
      if (+max > 1.5) {
        this.setState({ puls: this.state.puls + 1 });
      }
    });
    this.startSocketListener("emg", (data) => {
      let max = data[0][1];
      for (let i = 0; i < data.length; i++) {
        if (data[i][1] > max) max = data[i][1];
      }
      if (max > 4.3 || max < 4.07) {
        this.setState({ status: "Move" });
      } else {
        this.setState({ status: "Relax" });
      }
    });
    this.startSocketListener("temp", (data) => {
      this.setState({ tempreture: data[0][1] });
    });
    this.setState({
      id,
      mode,
      name: patient.name,
      age: patient.age,
      readNumber: patient.reads.length + 1,
    });
  }

  startSocketListener(event, callBack = (data) => {}) {
    socket.on(event, (read) => {
      const reads = read.data;
      if (reads.length === 0) {
        socket.off(event);
        return;
      }
      callBack(reads);
      const eventData = { ...this.state[event] };
      const newData = [...eventData.data[0]];

      for (
        let i = eventData.current, j = 0;
        i < eventData.current + eventData.limit;
        i++, j++
      ) {
        newData[i] = [String(i), reads[j][1]];
      }

      for (
        let i = eventData.current + eventData.limit;
        i < eventData.current + 2 * eventData.limit;
        i++
      ) {
        newData[i] = [i, null];
      }

      eventData.data = [newData];
      eventData.start = eventData.start + eventData.limit;
      eventData.current =
        eventData.current < eventData.length - eventData.limit
          ? eventData.current + eventData.limit
          : 0;
      this.setState({ [event]: eventData });
    });
  }

  initializeData = (event, start) => {
    const eventData = { ...this.state[event] };

    const data = [];
    for (let i = 0; i < this.state[event].length; i++) {
      data.push([i, start]);
    }
    eventData.data = [data];
    this.setState({ [event]: eventData });
  };

  componentWillUnmount() {
    this.handleStop();
    socket.off("ecg");
    socket.off("emg");
    socket.off("temp");
    socket.off("saved");
    socket.disconnect();
  }

  handleStart = async () => {
    socket.emit("getData");
  };
  handleStop = async () => {
    socket.emit("stopData");
  };
  handleSave = async () => {
    socket.emit("saveData");
    socket.on("saved", () => {
      this.props.history.push(`/patient/${this.state.id}`);
    });
  };
  handleBack = () => {
    this.props.history.goBack();
  };
  renderChart = (label, color, data) => {
    return (
      <React.Fragment>
        <div className="col-2 label">
          <h3 style={{ color }}>{label}</h3>
        </div>
        <div className="col-8">
          <PlotChart data={data} />
        </div>
      </React.Fragment>
    );
  };

  renderButton(title, handleFunction, color) {
    return (
      <button
        className="btn btn-primary btn-lg mx-2"
        style={{ backgroundColor: color, borderColor: color }}
        onClick={handleFunction}
      >
        {title}
      </button>
    );
  }
  render() {
    const {
      temp,
      ecg,
      emg,
      name,
      age,
      readNumber,
      status,
      puls,
      tempreture,
    } = this.state;
    const date = new Date();
    return (
      <React.Fragment>
        <div className="container-flued text-white mt-2">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 d-flex justify-content-between ">
              <p>Patient Name: {name}</p>
              <p>Patient Age: {age}</p>
              <p>Read Number: {readNumber}</p>
              <p>
                Date:
                {`${date.getFullYear()}/${
                  date.getMonth() + 1
                }/${date.getDate()}`}
              </p>
            </div>
          </div>
          <div className="row chart-area">
            {this.renderChart(ecg.title, "greenyellow", ecg.data)}
            <div className="col-1 text-left">
              <h3 style={{ color: "greenyellow" }}>Pulse</h3>
              <h1 className="text-right" style={{ color: "greenyellow" }}>
                {puls}
              </h1>
            </div>
          </div>

          <div className="row chart-area">
            {this.renderChart(emg.title, "rgb(114, 155, 243)", emg.data)}
            <div className="col-1 text-left">
              <h5 style={{ color: "rgb(114, 155, 243)" }}>Status</h5>
              <h1
                className="text-right"
                style={{ color: "rgb(114, 155, 243)" }}
              >
                {status}
              </h1>
            </div>
          </div>

          <div className="row chart-area">
            {this.renderChart(temp.title, "yellow", temp.data)}
            <div className="col-2" style={{ color: "yellow" }}>
              <div className="row m-0">
                <div className="col-4">
                  <h5>Temp</h5>
                  <p className="m-0 text-right">38.5</p>
                  <p className="m-0 text-right">36.5</p>
                </div>
                <div className="col-3 text-left">
                  <p
                    style={{
                      fontSize: "50px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    {tempreture}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              {this.renderButton("start", this.handleStart, "coral")}
              {this.renderButton("stop", this.handleStop, "coral")}

              {this.state.mode === "new"
                ? this.renderButton("save", this.handleSave, "coral")
                : this.renderButton("back", this.handleBack, "coral")}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Monitor;
