import React from 'react'
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import { motion, AnimatePresence } from "framer-motion";
import Today from '../Today'
import useWeatherData from "../../hooks/useWeatherData";
import TemperatureChart from "../charts/TemperatureChart";
import WindSpeedGraph from "../charts/WindSpeedGraph";
import RainAmountChart from "../charts/RainAmountChart";
import { FaCloudSun, FaWind } from "react-icons/fa6";

export const Dashboard = () => {
    const { data, loading, error } = useWeatherData();
    const [featuredChart, setFeaturedChart] = useState('wind');
    const latestWindData = data.length > 0 ? data[data.length - 1]?.wind_speed : null;
    console.log("Weather Data:", data);

    const charts = [
        { key: 'wind', component: <WindSpeedGraph data={data} /> },
        { key: 'temperature', component: <TemperatureChart data={data} /> },
        { key: 'rain', component: <RainAmountChart data={data} /> }
    ];

    return (
        <div className='grid gap-4 md:grid-cols-12 p-4 grid-cols-1' >
            <div className='flex flex-col gap-4 col-span-4'>
                <div className='flex gap-4'>
                    <Sidebar />
                    <div className='bg-gray-900 rounded-lg p-4 flex flex-col justify-between flex-grow'>
                        <div className='flex justify-between items-center'>
                            <Today />
                            <FaCloudSun className='text-7xl ml-6' />
                        </div>
                        <p className='text-8xl'>26°C</p>
                    </div>
                </div>
                <div className="bg-gray-900 rounded-lg col-span-3 p-4">
      <div className="flex items-center mb-2 text-gray-500">
        <p className="text-sm mr-1">Wind</p>
        <FaWind />
      </div>
      {loading ? (
        <p className="text-3xl font-semibold text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-3xl font-semibold text-red-500">{error}</p>
      ) : latestWindData !== null ? (
        <p className="text-3xl font-semibold">{latestWindData} km/h</p>
      ) : (
        <p className="text-3xl font-semibold text-gray-500">No data</p>
      )}
    </div>
                <div className='bg-red-700 rounded-lg col-span-3 p-4 text-center font-semibold'>
                    <p>Beep bop it's hot outside ^-^</p>
                </div>
                <div className='bg-green-700 rounded-lg col-span-3 p-4 text-center font-semibold'>
                    <p>*R2-D2 scream* it's really windy \^o^/</p>
                </div>
            </div>
            <div className="grid gap-4 col-span-8 grid-cols-1 md:grid-cols-2">
                {/* Featured Chart */}
                <motion.div
                    key={featuredChart}
                    className="bg-gray-900 rounded-lg md:col-span-2 p-4 md:h-96 h-64"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setFeaturedChart(featuredChart)}
                >
                    {loading ? (
                    <div className="text-center text-gray-400">Loading charts...</div>
                    ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                    ) : (
                    <AnimatePresence mode="wait">
                        {charts.find((chart) => chart.key === featuredChart)?.component}
                    </AnimatePresence>
                    )}
                </motion.div>

                {/* Smaller Charts */}
                {charts
                    .filter((chart) => chart.key !== featuredChart)
                    .map((chart) => (
                    <motion.div
                        key={chart.key}
                        className="bg-gray-900 rounded-lg md:h-40 h-64 p-4 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setFeaturedChart(chart.key)}
                    >
                        {loading ? (
                        <div className="text-center text-gray-400">Loading charts...</div>
                        ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                        ) : (
                        chart.component
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}