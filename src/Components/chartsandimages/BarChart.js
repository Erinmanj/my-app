import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart({}) {
  const chartData = {
    labels: ["cardiology", "nuerology", "dermatology", "dental"],
    datasets: [
      {
        label: "waitingtime",
        data: [40, 30, 10, 20],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      },
    ]
  };

  return (
    <div className="barcontainer">
      <h>Average Waiting</h>
      
      
      <Bar
        data={chartData}
        options={{
            title: {
              display: true,
              text: "Average Waiting Time"
            },
          }
        }
      />
    </div>
  );
}

export default BarChart;


