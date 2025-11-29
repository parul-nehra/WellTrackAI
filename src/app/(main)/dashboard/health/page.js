'use client';
import { FaHeartbeat, FaRunning, FaAppleAlt } from 'react-icons/fa';

export default function HealthPage() {
    const healthMetrics = [
        { title: 'Heart Rate', value: '72 bpm', status: 'Normal', icon: FaHeartbeat, color: 'text-red-500' },
        { title: 'Exercise', value: '45 min', status: 'Active', icon: FaRunning, color: 'text-green-500' },
        { title: 'Nutrition', value: '1,800 cal', status: 'On Track', icon: FaAppleAlt, color: 'text-orange-500' },
    ];

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Health Metrics</h1>
                <p className="text-gray-600 mt-1">Track your daily health activities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {healthMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm">
                            <Icon className={`text-4xl ${metric.color} mb-4`} />
                            <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                            <p className="text-sm text-gray-600">{metric.status}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b">
                        <div>
                            <p className="font-medium">Morning Run</p>
                            <p className="text-sm text-gray-600">5.2 km • 30 minutes</p>
                        </div>
                        <span className="text-sm text-gray-500">Today, 7:00 AM</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                        <div>
                            <p className="font-medium">Yoga Session</p>
                            <p className="text-sm text-gray-600">45 minutes</p>
                        </div>
                        <span className="text-sm text-gray-500">Yesterday, 6:30 PM</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium">Cycling</p>
                            <p className="text-sm text-gray-600">10 km • 25 minutes</p>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                </div>
            </div>
        </>
    );
}
