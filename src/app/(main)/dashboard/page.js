'use client';
import { useEffect, useState } from 'react';
import { FaWalking, FaTint, FaBed, FaSmile, FaPlus, FaQuoteLeft } from 'react-icons/fa';

export default function DashboardPage() {
    const [userName, setUserName] = useState('');
    const [hydration, setHydration] = useState(6);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
    }, []);

    const metrics = [
        { title: 'Steps', value: '8,547', goal: '10,000', unit: 'steps', icon: FaWalking, color: 'text-teal-600', bg: 'bg-teal-50' },
        { title: 'Water', value: `${hydration}`, goal: '8', unit: 'cups', icon: FaTint, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Sleep', value: '7.5', goal: '8', unit: 'hrs', icon: FaBed, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Mood', value: 'Good', goal: 'Great', unit: '', icon: FaSmile, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    ];

    const quotes = [
        "The groundwork for all happiness is health. – Leigh Hunt",
        "Take care of your body. It's the only place you have to live. – Jim Rohn",
        "Health is a state of body. Wellness is a state of being. – J. Stanford",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="space-y-8">
            {/* Welcome & Quote Section */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Namaste, {userName} 🙏
                    </h1>
                    <p className="text-gray-600 mt-2">Here's your daily wellness overview. You're doing great!</p>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white relative overflow-hidden">
                    <FaQuoteLeft className="absolute top-4 left-4 text-teal-400 text-4xl opacity-50" />
                    <p className="relative z-10 font-medium italic text-lg pt-4">"{randomQuote}"</p>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-full ${metric.bg} flex items-center justify-center`}>
                                    <Icon className={`text-xl ${metric.color}`} />
                                </div>
                                {metric.title === 'Water' && (
                                    <button
                                        onClick={() => setHydration(prev => Math.min(prev + 1, 8))}
                                        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors"
                                    >
                                        <FaPlus className="text-xs" />
                                    </button>
                                )}
                            </div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">{metric.title}</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                                <span className="text-sm text-gray-400">/ {metric.goal} {metric.unit}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions & Daily Tips */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50 transition-all group text-center">
                            <div className="w-10 h-10 mx-auto bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                                <FaWalking />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-teal-700">Log Activity</span>
                        </button>
                        <button className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all group text-center">
                            <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                                <FaTint />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-blue-700">Log Water</span>
                        </button>
                        <button className="p-4 rounded-xl border border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all group text-center">
                            <div className="w-10 h-10 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                                <FaBed />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-purple-700">Log Sleep</span>
                        </button>
                    </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                    <h2 className="text-lg font-bold text-orange-800 mb-4">Daily Tip 💡</h2>
                    <p className="text-orange-700 text-sm leading-relaxed">
                        "Drink a glass of warm water with lemon first thing in the morning to aid digestion and boost your immune system."
                    </p>
                    <div className="mt-4 pt-4 border-t border-orange-200">
                        <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Ayurveda Wisdom</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
