'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaRunning, FaClock, FaBurn, FaCalendarAlt } from 'react-icons/fa';

export default function AddActivityPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        calories: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:8000/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push('/dashboard/activities');
            } else {
                alert('Failed to save activity');
            }
        } catch (error) {
            console.error('Error saving activity:', error);
            alert('Error saving activity');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Log New Activity</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                    <div className="relative">
                        <FaRunning className="absolute left-3 top-3 text-gray-400" />
                        <select
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        >
                            <option value="">Select activity...</option>
                            <option value="Walking">Walking</option>
                            <option value="Running">Running</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Swimming">Swimming</option>
                            <option value="Gym">Gym Workout</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                        <div className="relative">
                            <FaClock className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="number"
                                required
                                min="1"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Calories (kcal)</label>
                        <div className="relative">
                            <FaBurn className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="number"
                                min="0"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                value={formData.calories}
                                onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="date"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Activity'}
                    </button>
                </div>
            </form>
        </div>
    );
}
