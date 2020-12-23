import React from "react";
import { Link } from "react-router-dom";

const PatientCard = (props) => {
  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header ">
          <h5>{props.name}</h5>
        </div>
        <div className="card-body text-left">
          <p>
            <span className="">Age:</span> {props.age}
          </p>
          <p>
            <span className="">Number Of Reads:</span> {props.numberOfReads}
          </p>
        </div>
        <div className="card-footer">
          <Link className="btn btn-primary" to={`/patient/${props.id}`}>
            See Profile
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PatientCard;
