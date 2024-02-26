import React from 'react';
import { Card } from 'antd';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'; 
ChartJS.register(...registerables);
const barChartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [120, 150, 200, 180, 250],
      backgroundColor: '#1890ff',
    },
  ],
};

const BarChartExample = () => {
  return (
    <Card title="Bar Chart">
      <Bar data={barChartData} />
    </Card>
  );
};

export default BarChartExample;
