import React from "react";
import { Chart } from "react-charts";

const PlotChart = (props) => {
  const series = React.useMemo(
    () => ({
      showPoints: false,
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
  return (
    <div className="h-100 w-100 bg-dark p-3">
      <div className="h-100 w-100">
        <Chart data={props.data} series={series} axes={axes} dark />
      </div>
    </div>
  );
};

export default PlotChart;
