'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHeartbeat, FaRunning, FaAppleAlt, FaFire, FaClock, FaMapMarkerAlt, FaPlus } from 'react-icons/fa';

export default function HealthPage() {
    const [activities, setActivities] = useState([]);
    const [healthMetrics, setHealthMetrics] = useState([]);
    const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

            const [activitiesRes, metricsRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, { credentials: 'include', headers }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, { credentials: 'include', headers })
            ]);

            if (activitiesRes.ok) {
                const data = await activitiesRes.json();
                const activitiesArray = Array.isArray(data) ? data : [];
                setActivities(activitiesArray.slice(0, 4));
                
                const weekly = [0, 0, 0, 0, 0, 0, 0];
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                activitiesArray.forEach(activity => {
                    const activityDate = new Date(activity.date);
                    activityDate.setHours(0, 0, 0, 0);
                    const daysDiff = Math.floor((today - activityDate) / (1000 * 60 * 60 * 24));
                    if (daysDiff >= 0 && daysDiff < 7) {
                        weekly[6 - daysDiff] += activity.duration;
                    }
                });
                setWeeklyData(weekly);
            }

            if (metricsRes.ok) {
                const data = await metricsRes.json();
                setHealthMetrics(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const metricsArray = Array.isArray(healthMetrics) ? healthMetrics : [];
    const waterToday = metricsArray.filter(m => m.type === 'Water' && new Date(m.date).toDateString() === new Date().toDateString()).reduce((sum, m) => sum + parseInt(m.value), 0);
    const sleepToday = metricsArray.filter(m => m.type === 'Sleep' && new Date(m.date).toDateString() === new Date().toDateString()).reduce((sum, m) => sum + parseFloat(m.value), 0);
    
    const metricsDisplay = [
        { title: 'Water Intake', value: waterToday.toString(), unit: 'cups', status: waterToday >= 8 ? 'Great' : 'On Track', icon: FaHeartbeat, color: 'text-blue-500', bg: 'bg-blue-50' },
        { title: 'Active Calories', value: activities.reduce((sum, a) => sum + (a.calories || 0), 0).toString(), unit: 'kcal', status: 'On Track', icon: FaFire, color: 'text-orange-500', bg: 'bg-orange-50' },
        { title: 'Sleep Hours', value: sleepToday.toFixed(1), unit: 'hrs', status: sleepToday >= 7 ? 'Great' : 'Low', icon: FaClock, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Health Metrics</h1>
                    <p className="text-gray-600 mt-1">Track your vitals and daily activities</p>
                </div>
                <Link href="/dashboard/health/log" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors flex items-center gap-2">
                    <FaPlus /> Log Metrics
                </Link>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metricsDisplay.map((metric) => {
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

            {/* Weekly Activity Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Weekly Activity (Minutes)</h2>
                <div className="h-64 flex items-end justify-between gap-2">
                    {weeklyData.map((minutes, i) => {
                        const maxMinutes = Math.max(...weeklyData, 60);
                        const heightPercent = maxMinutes > 0 ? (minutes / maxMinutes) * 100 : 0;
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col items-center justify-end" style={{ height: '240px' }}>
                                    <span className="text-xs text-gray-600 mb-1">{minutes}</span>
                                    <div
                                        className="w-full max-w-[50px] bg-teal-500 rounded-t-lg hover:bg-teal-600 transition-all cursor-pointer"
                                        style={{ height: `${heightPercent}%`, minHeight: minutes > 0 ? '4px' : '0px' }}
                                    />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        );
                    })}
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
                            {loading ? (
                                <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">Loading...</td></tr>
                            ) : activities.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No activities yet</td></tr>
                            ) : (
                                activities.map((activity, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-teal-100 text-teal-600">
                                                    <FaRunning />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                                                    <div className="text-xs text-gray-500">Activity</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.duration} min</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{activity.calories || '-'} kcal</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(activity.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
