import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Today from '../Today'
import { FaCloudSun, FaWind } from "react-icons/fa6";

export const Dashboard = () => {
    return (
        <div className='grid gap-4 md:grid-cols-2 p-4 grid-cols-1' >
            <div className='grid gap-4 grid-cols-[64px,_1fr]'>
                <Sidebar />
                <div className='bg-gray-900 rounded-lg -mr-4 p-4 flex flex-col'>
                    <div className='flex justify-between'>
                        <Today />
                        <FaCloudSun className='text-7xl' />
                    </div>
                    <p className='text-6xl'>26°C</p>
                </div>
                <div className='bg-gray-900 rounded-lg col-span-3 p-4 '>
                    <div className='flex items-center mb-2 text-gray-500'>
                        <p className='text-sm mr-1 '>Wind</p>
                        <FaWind className='' />
                    </div>
                    <p className='text-3xl font-semibold'>11.24km/h</p>
                </div>
                <div className='bg-red-700 rounded-lg col-span-3 p-4 text-center font-semibold'>
                    <p>Beep bop it's hot outside ^-^</p>
                </div>
                <div className='bg-green-700 rounded-lg col-span-3 p-4 text-center font-semibold'>
                    <p>*R2-D2 scream* it's really windy \^o^/</p>
                </div>
            </div>
            <div className='grid gap-4'>
                <div className='bg-gray-900 rounded-lg h-32'> 
                    <p>wind chart</p>
                </div>
                <div className='bg-gray-900 rounded-lg h-32'> 
                    <p>temp chart</p>
                </div>
                <div className='bg-gray-900 rounded-lg h-32'> 
                    <p>rain chart</p>
                </div>
            </div>
        </div>
    )
}