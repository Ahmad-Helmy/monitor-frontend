import React from "react";
import { Chart } from "react-charts";

const XRChart = (props) => {
  const series = React.useMemo(
    () => ({
      showPoints: true,
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  const UCL = [];
  const CL = [];
  const LCL = [];
  for (let j = 1; j < props.data.length + 1; j++) {
    UCL.push([j, props.UCL]);
    CL.push([j, props.CL]);
    LCL.push([j, props.LCL]);
  }
  return (
    <div className="h-100 w-100 bg-dark p-3">
      <div className="h-100 w-100">
        <Chart
          data={[props.data, UCL, CL, LCL]}
          series={series}
          axes={axes}
          tooltip
          dark
        />
      </div>
    </div>
  );
};

export default XRChart;
