'use client';
import { FaHeartbeat, FaRunning, FaAppleAlt, FaFire, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function HealthPage() {
    const healthMetrics = [
        { title: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', icon: FaHeartbeat, color: 'text-red-500', bg: 'bg-red-50' },
        { title: 'Active Calories', value: '450', unit: 'kcal', status: 'On Track', icon: FaFire, color: 'text-orange-500', bg: 'bg-orange-50' },
        { title: 'Active Minutes', value: '45', unit: 'min', status: 'Great', icon: FaClock, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    const activities = [
        { name: 'Morning Yoga', type: 'Flexibility', duration: '30 min', calories: '120 kcal', time: '07:00 AM', date: 'Today' },
        { name: 'Evening Walk', type: 'Cardio', duration: '45 min', calories: '210 kcal', time: '06:30 PM', date: 'Yesterday' },
        { name: 'HIIT Workout', type: 'Cardio', duration: '20 min', calories: '180 kcal', time: '08:00 AM', date: 'Yesterday' },
        { name: 'Meditation', type: 'Mindfulness', duration: '15 min', calories: '10 kcal', time: '09:00 PM', date: '2 days ago' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Health Metrics</h1>
                    <p className="text-gray-600 mt-1">Track your vitals and daily activities</p>
                </div>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors">
                    Sync Device
                </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {healthMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-full ${metric.bg} flex items-center justify-center`}>
                                    <Icon className={`text-xl ${metric.color}`} />
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${metric.status === 'Normal' || metric.status === 'Great' || metric.status === 'On Track'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {metric.status}
                                </span>
                            </div>
                            <h3 className="text-gray-500 font-medium mb-1">{metric.title}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                                <span className="text-sm text-gray-500 font-medium">{metric.unit}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Weekly Activity Chart Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Weekly Activity</h2>
                <div className="h-64 flex items-end justify-between gap-2 px-4">
                    {[65, 45, 75, 50, 85, 30, 60].map((height, i) => (
                        <div key={i} className="w-full flex flex-col items-center gap-2 group">
                            <div className="relative w-full max-w-[40px] bg-gray-100 rounded-t-lg h-full overflow-hidden">
                                <div
                                    className="absolute bottom-0 w-full bg-teal-500 rounded-t-lg transition-all duration-500 group-hover:bg-teal-600"
                                    style={{ height: `${height}%` }}
                                />
                            </div>
                            <span className="text-xs text-gray-500 font-medium">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
                    <button className="text-teal-600 text-sm font-medium hover:text-teal-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Calories</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {activities.map((activity, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${activity.type === 'Cardio' ? 'bg-orange-100 text-orange-600' :
                                                    activity.type === 'Mindfulness' ? 'bg-purple-100 text-purple-600' :
                                                        'bg-teal-100 text-teal-600'
                                                }`}>
                                                {activity.type === 'Cardio' ? <FaRunning /> :
                                                    activity.type === 'Mindfulness' ? <FaAppleAlt /> : <FaRunning />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                                                <div className="text-xs text-gray-500">{activity.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.calories}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {activity.date} • {activity.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
