'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaRunning, FaBurn, FaClock, FaCalendarAlt } from 'react-icons/fa';

export default function ActivitiesPage() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setActivities(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Activities</h1>
                    <p className="text-gray-600">Track your fitness journey</p>
                </div>
                <Link
                    href="/dashboard/activities/add"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                    <FaPlus />
                    <span>Log Activity</span>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading activities...</div>
            ) : activities.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <FaRunning className="mx-auto text-4xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No activities yet</h3>
                    <p className="text-gray-500 mb-4">Start moving and log your first activity!</p>
                    <Link
                        href="/dashboard/activities/add"
                        className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                        Log an activity now &rarr;
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 text-xl">
                                    <FaRunning />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <FaCalendarAlt className="text-xs" />
                                            {new Date(activity.date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FaClock className="text-xs" />
                                            {activity.duration} min
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-orange-500 font-medium">
                                    <FaBurn />
                                    <span>{activity.calories || '-'} kcal</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
