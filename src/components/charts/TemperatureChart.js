import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const TemperatureChart = ({ data }) => {
  return (
    <div className="h-full">
      <h3>Temperature (°C)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="url(#colorTemp)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
