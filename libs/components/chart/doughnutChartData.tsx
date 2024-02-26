import React from 'react';
import { Card } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'; 
ChartJS.register(...registerables);
const doughnutChartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      data: [10, 20, 15, 25, 30],
      backgroundColor: ['#f5222d', '#1890ff', '#ffc53d', '#52c41a', '#722ed1'],
    },
  ],
};

const DoughnutChartExample = () => {
  return (
    <Card title="Doughnut Chart">
      <Doughnut data={doughnutChartData} />
    </Card>
  );
};

export default DoughnutChartExample;
