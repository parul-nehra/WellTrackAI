'use client';
import { useState, useEffect } from 'react';
import { FaChartLine, FaTrophy, FaFire, FaCalendarCheck } from 'react-icons/fa';

export default function ProgressPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalActivities: 0, goalsAchieved: 0, currentStreak: 0 });
    const [weeklyData, setWeeklyData] = useState({ water: 0, sleep: 0, activities: 0 });
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        fetchProgressData();
    }, []);

    const fetchProgressData = async () => {
        try {
            const [activitiesRes, goalsRes, healthRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, { credentials: 'include' }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`, { credentials: 'include' }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, { credentials: 'include' })
            ]);

            const activities = activitiesRes.ok ? await activitiesRes.json() : [];
            const goalsData = goalsRes.ok ? await goalsRes.json() : [];
            const health = healthRes.ok ? await healthRes.json() : [];

            const activitiesArray = Array.isArray(activities) ? activities : [];
            const goalsArray = Array.isArray(goalsData) ? goalsData : [];
            const healthArray = Array.isArray(health) ? health : [];

            const completedGoals = goalsArray.filter(g => g.status === 'Completed').length;
            
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const recentActivities = activitiesArray.filter(a => new Date(a.date) >= weekAgo);
            
            const waterThisWeek = healthArray.filter(h => h.type === 'Water' && new Date(h.date) >= weekAgo)
                .reduce((sum, h) => sum + parseInt(h.value || 0), 0);
            const sleepThisWeek = healthArray.filter(h => h.type === 'Sleep' && new Date(h.date) >= weekAgo)
                .reduce((sum, h) => sum + parseFloat(h.value || 0), 0);

            setStats({
                totalActivities: activitiesArray.length,
                goalsAchieved: completedGoals,
                currentStreak: recentActivities.length
            });

            setWeeklyData({
                water: waterThisWeek,
                sleep: sleepThisWeek.toFixed(1),
                activities: recentActivities.length
            });

            setGoals(goalsArray);
        } catch (err) {
            console.error('Error fetching progress data:', err);
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        { title: 'Total Activities', value: stats.totalActivities, icon: FaChartLine, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Goals Achieved', value: stats.goalsAchieved, icon: FaTrophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { title: 'Current Streak', value: `${stats.currentStreak} Days`, icon: FaFire, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your progress...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
                <p className="text-gray-600 mt-1">Track your wellness journey</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className={`w-16 h-16 rounded-full ${stat.bg} flex items-center justify-center`}>
                                <Icon className={`text-2xl ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Summary</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                            <span className="font-medium text-gray-700">Water Intake</span>
                            <span className="text-2xl font-bold text-blue-600">{weeklyData.water} cups</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                            <span className="font-medium text-gray-700">Sleep Hours</span>
                            <span className="text-2xl font-bold text-purple-600">{weeklyData.sleep} hrs</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-teal-50 rounded-lg">
                            <span className="font-medium text-gray-700">Activities</span>
                            <span className="text-2xl font-bold text-teal-600">{weeklyData.activities}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <FaCalendarCheck className="text-teal-600 text-xl" />
                        <h2 className="text-xl font-bold text-gray-900">Active Goals</h2>
                    </div>
                    <div className="space-y-3">
                        {goals.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No goals yet. Create one to get started!</p>
                        ) : (
                            goals.slice(0, 5).map((goal) => {
                                const progress = Math.round((goal.current / goal.target) * 100);
                                return (
                                    <div key={goal.id} className="p-3 border border-gray-200 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-gray-900">{goal.title}</span>
                                            <span className="text-sm font-bold text-teal-600">{progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }} />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
