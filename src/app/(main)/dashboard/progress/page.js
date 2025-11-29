'use client';
import { FaChartLine, FaTrophy, FaFire, FaMedal, FaCalendarCheck } from 'react-icons/fa';

export default function ProgressPage() {
    const stats = [
        { title: 'Total Activities', value: '156', icon: FaChartLine, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Goals Achieved', value: '23', icon: FaTrophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
        { title: 'Current Streak', value: '12 Days', icon: FaFire, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    const badges = [
        { name: 'Early Bird', desc: 'Completed 5 morning workouts', icon: '🌅', unlocked: true },
        { name: 'Hydration Hero', desc: 'Hit water goal for 7 days', icon: '💧', unlocked: true },
        { name: 'Zen Master', desc: 'Meditated for 10 hours total', icon: '🧘', unlocked: false },
        { name: 'Marathoner', desc: 'Walked 50,000 steps in a week', icon: '🏃', unlocked: false },
    ];

    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
                <p className="text-gray-600 mt-1">Celebrate your wins and track your journey</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
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

            <div className="grid md:grid-cols-3 gap-8">
                {/* Weekly Summary */}
                <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Consistency</h2>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Steps Goal (Avg 85%)</span>
                                <span className="text-sm text-gray-500">65,432 / 70,000</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div className="bg-teal-500 h-3 rounded-full" style={{ width: '93%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Water Intake (Avg 90%)</span>
                                <span className="text-sm text-gray-500">48 / 56 glasses</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full" style={{ width: '86%' }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Sleep Duration (Avg 95%)</span>
                                <span className="text-sm text-gray-500">52 / 56 hours</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3">
                                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '93%' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Streak Calendar Placeholder */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <FaCalendarCheck className="text-teal-600 text-xl" />
                        <h2 className="text-xl font-bold text-gray-900">Streak</h2>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={i} className="text-xs font-bold text-gray-400 mb-2">{d}</div>
                        ))}
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-full flex items-center justify-center text-xs font-medium ${[1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16].includes(i)
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-gray-50 text-gray-400'
                                    }`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {badges.map((badge, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-xl border text-center transition-all ${badge.unlocked
                                ? 'border-yellow-200 bg-yellow-50'
                                : 'border-gray-200 bg-gray-50 opacity-60 grayscale'
                                }`}
                        >
                            <div className="text-4xl mb-3">{badge.icon}</div>
                            <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
                            <p className="text-xs text-gray-500">{badge.desc}</p>
                            {badge.unlocked && (
                                <div className="mt-2 inline-block px-2 py-0.5 bg-yellow-200 text-yellow-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                    Unlocked
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
