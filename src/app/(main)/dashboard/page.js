'use client';
import { useEffect, useState } from 'react';
import { FaWalking, FaTint, FaBed, FaSmile } from 'react-icons/fa';

export default function DashboardPage() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
    }, []);

    const metrics = [
        { title: 'Steps', value: '8,547', goal: '10,000', icon: FaWalking, color: 'text-teal-600' },
        { title: 'Water', value: '6 cups', goal: '8 cups', icon: FaTint, color: 'text-blue-600' },
        { title: 'Sleep', value: '7.5 hrs', goal: '8 hrs', icon: FaBed, color: 'text-purple-600' },
        { title: 'Mood', value: 'Good', goal: 'Great', icon: FaSmile, color: 'text-yellow-600' },
    ];

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, {userName}
                </h1>
                <p className="text-gray-600 mt-1">Here's your wellness overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <Icon className={`text-3xl ${metric.color}`} />
                            </div>
                            <h3 className="text-sm text-gray-600 mb-1">{metric.title}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                                <span className="text-sm text-gray-500">/ {metric.goal}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                        Log Activity
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Set Goal
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        View Reports
                    </button>
                </div>
            </div>
        </>
    );
}
