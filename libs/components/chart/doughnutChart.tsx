import React from 'react';
import { Card } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'; 
ChartJS.register(...registerables);


const DoughnutChart = (props :any) => {
    const {doughnutChartData} = props;
    return ( 
        <Doughnut data={doughnutChartData} /> 
    );
  };
  
  export default DoughnutChart;
  