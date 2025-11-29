'use client';
import { FaBullseye, FaCheckCircle, FaClock, FaPlus, FaWalking, FaTint, FaBed, FaLeaf } from 'react-icons/fa';

export default function GoalsPage() {
    const goals = [
        { title: 'Walk 10,000 steps daily', category: 'Fitness', progress: 85, status: 'In Progress', icon: FaWalking, color: 'text-teal-600', bg: 'bg-teal-100' },
        { title: 'Drink 8 glasses of water', category: 'Nutrition', progress: 100, status: 'Completed', icon: FaTint, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Sleep 8 hours', category: 'Health', progress: 60, status: 'In Progress', icon: FaBed, color: 'text-purple-600', bg: 'bg-purple-100' },
        { title: '15 min Meditation', category: 'Mindfulness', progress: 0, status: 'Not Started', icon: FaLeaf, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
                    <p className="text-gray-600 mt-1">Set targets and track your achievements</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md">
                    <FaPlus /> Create New Goal
                </button>
            </div>

            {/* Goal Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['All', 'Fitness', 'Nutrition', 'Mindfulness'].map((cat, i) => (
                    <button
                        key={cat}
                        className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((goal, index) => {
                    const Icon = goal.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 group hover:border-teal-200 transition-all">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${goal.bg} flex items-center justify-center`}>
                                        <Icon className={`text-xl ${goal.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">{goal.title}</h3>
                                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {goal.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-2xl font-bold text-gray-900">{goal.progress}%</span>
                                    <span className={`text-xs font-medium ${goal.status === 'Completed' ? 'text-green-600' :
                                            goal.status === 'In Progress' ? 'text-blue-600' : 'text-gray-500'
                                        }`}>
                                        {goal.status}
                                    </span>
                                </div>
                            </div>

                            <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${goal.status === 'Completed' ? 'bg-green-500' : 'bg-teal-600'
                                        }`}
                                    style={{ width: `${goal.progress}%` }}
                                />
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button className="text-sm font-medium text-gray-400 hover:text-teal-600 transition-colors">
                                    Update Progress →
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
