import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
    
    const chartRef = useRef(null);
    let myChart = null;

    useEffect(() => {
       
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Satisfied', 'Nuetral', 'Unsatisfied'],
                    datasets: [{
                        label: 'Satisfaction',
                        data: [55.55,32.7,12.3],
                        backgroundColor: ['#4682b4','lightblue', 'grey'],
                    }],
                },
                
            });
        }

        // Cleanup function to destroy the chart when the component unmounts or re-renders
        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [data]);
    return (
        <div>
            <h>Overall Patient Satisfaction</h>
            <canvas ref={chartRef} style={{ maxWidth: '400px', display: '-ms-grid' }} />
        </div>
    );
};

export default PieChart;
