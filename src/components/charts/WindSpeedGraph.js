import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const WindSpeedGraph = ({ data }) => {
  return (
    <div className="h-full"> {/* Ensures the chart container fills its parent */}
      <h3 className="text-white">Wind Speed (m/s)</h3>
      <ResponsiveContainer width="100%" height="100%"> {/* Makes the chart scale fully */}
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="wind_speed" stroke="#82ca9d" fill="url(#colorWind)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindSpeedGraph;
