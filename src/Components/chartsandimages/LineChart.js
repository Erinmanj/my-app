import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({}) {  
    const chartData = {
        labels: ["Week 03", "Week 04", "Week 05", "Week 06", "Week 07","Week 08"],
        datasets: [
          {
            label: "In-Patients",
            data: [4, 44, 72, 30, 54,10],
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "darkblue",
            borderWidth: 1
          },
          {
                label:"Out-Patients",
                data:[8,16,36,14,16,10],
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "red",
                borderWidth: 1
          }
          
        ]
        
      };
      
  return (
    <div className="linecontainer">
      <h>In-patients Vs Out-patients</h>
      <Line
        data={chartData}
        options={{
         
            title: {
              display: true,
              text: "Patients by Week"
            },
        
        }}
      />
    </div>
  );
 
}
export default LineChart;