import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

const { Option } = Select;

const CurrencyWidgets = () => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState('1');
  const [currency, setCurrency] = useState('bitcoin');

  const currencies = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano', 'polkadot', 'bitcoin-cash', 'stellar', 'chainlink', 'binancecoin']; 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=${days}`
      );

      setData(result.data.prices);
    };

    fetchData();
  }, [currency, days]);

  const formattedData = data.map(item => ({ time: new Date(item[0]).toLocaleDateString(), price: item[1] }));

  return (
    <div>
      <Select defaultValue="bitcoin" style={{ width: 120 }} onChange={value => setCurrency(value)}>
        {currencies.map(currency => <Option key={currency} value={currency}>{currency.toUpperCase()}</Option>)}
      </Select>
      <Select defaultValue="90" style={{ width: 120 }} onChange={value => setDays(value)}>
        <Option value="1">1 Day</Option>
        <Option value="7">7 Days</Option>
        <Option value="30">1 Month</Option>
        <Option value="90">3 Months</Option>
        <Option value="180">6 Months</Option>
        <Option value="360">12 Months</Option>
      </Select>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{
            top: 10, right: 30, left: 0, bottom: 50, // Increase the bottom margin to prevent the dates from being cut off
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" angle={-90} textAnchor="end" /> 
          <YAxis dataKey="price" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyWidgets;