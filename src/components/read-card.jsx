import React from "react";
import { Link } from "react-router-dom";
import XRChart from "./x-r-chart";

const ReadCard = (props) => {
  const date = props.time.split("T")[0].split("-");
  return (
    <React.Fragment>
      <div className="card text-dark">
        <div className="card-header text-left">
          <p>
            <span>Duration: </span> {props.duration}s
          </p>
          <p>
            <span>Data: </span>
            {`${date[0]}/${date[1]}/${date[2]}`}
          </p>
        </div>
        <div className="card-body">
          <div className="w-100" style={{ height: "200px" }}>
            <XRChart
              UCL={props.xChart.UCL}
              CL={props.xChart.CL}
              LCL={props.xChart.LCL}
              data={props.xChart.avg}
            />
          </div>
          <div className="w-100" style={{ height: "200px" }}>
            <XRChart
              UCL={props.rChart.UCL}
              CL={props.rChart.CL}
              LCL={props.rChart.LCL}
              data={props.rChart.range}
            />
          </div>
        </div>
        <div className="card-footer">
          <Link
            className="btn btn-primary"
            to={`/monitor/${props.id}/show?readId=${props.readId}`}
          >
            See Read
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReadCard;
