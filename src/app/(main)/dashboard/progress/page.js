'use client';
import { FaChartLine, FaTrophy, FaFire } from 'react-icons/fa';

export default function ProgressPage() {
    const stats = [
        { title: 'Total Activities', value: '156', icon: FaChartLine, color: 'text-blue-600' },
        { title: 'Goals Achieved', value: '23', icon: FaTrophy, color: 'text-yellow-600' },
        { title: 'Current Streak', value: '12 days', icon: FaFire, color: 'text-orange-600' },
    ];

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Progress</h1>
                <p className="text-gray-600 mt-1">View your wellness journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                            <Icon className={`text-4xl ${stat.color} mx-auto mb-3`} />
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Weekly Summary</h2>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Steps</span>
                            <span className="text-sm text-gray-600">65,432 / 70,000</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-teal-600 h-2 rounded-full" style={{ width: '93%' }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Water Intake</span>
                            <span className="text-sm text-gray-600">48 / 56 glasses</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '86%' }} />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Sleep Hours</span>
                            <span className="text-sm text-gray-600">52 / 56 hours</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '93%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
