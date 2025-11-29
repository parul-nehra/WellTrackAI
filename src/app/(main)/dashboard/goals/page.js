'use client';
import { FaBullseye, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function GoalsPage() {
    const goals = [
        { title: 'Walk 10,000 steps daily', progress: 85, status: 'In Progress', icon: FaBullseye },
        { title: 'Drink 8 glasses of water', progress: 100, status: 'Completed', icon: FaCheckCircle },
        { title: 'Sleep 8 hours', progress: 60, status: 'In Progress', icon: FaClock },
    ];

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Goals</h1>
                <p className="text-gray-600 mt-1">Track and manage your wellness goals</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <button className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                    + Add New Goal
                </button>
            </div>

            <div className="space-y-4">
                {goals.map((goal, index) => {
                    const Icon = goal.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Icon className="text-2xl text-teal-600" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{goal.title}</h3>
                                        <p className="text-sm text-gray-600">{goal.status}</p>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-teal-600">{goal.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-teal-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${goal.progress}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
