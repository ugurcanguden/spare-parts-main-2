import React from 'react';
import { Card } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'; 
ChartJS.register(...registerables);

const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [120, 150, 200, 180, 250],
      borderColor: '#1890ff',
      fill: false,
    },
  ],
};

const LineChartExample = () => {
  return (
    <Card title="Line Chart">
      <Line data={lineChartData} />
    </Card>
  );
};

export default LineChartExample;
