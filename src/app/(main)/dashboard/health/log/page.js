'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTint, FaBed, FaSmile } from 'react-icons/fa';

export default function LogHealthPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        water: '',
        sleep: '',
        mood: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const promises = [];

            if (formData.water) {
                promises.push(
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, {
                        method: 'POST',
                        headers,
                        credentials: 'include',
                        body: JSON.stringify({ type: 'Water', value: formData.water })
                    })
                );
            }

            if (formData.sleep) {
                promises.push(
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, {
                        method: 'POST',
                        headers,
                        credentials: 'include',
                        body: JSON.stringify({ type: 'Sleep', value: formData.sleep })
                    })
                );
            }

            if (formData.mood) {
                promises.push(
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`, {
                        method: 'POST',
                        headers,
                        credentials: 'include',
                        body: JSON.stringify({ type: 'Mood', value: formData.mood })
                    })
                );
            }

            await Promise.all(promises);
            router.push('/dashboard/health');
        } catch (error) {
            console.error('Error saving health metrics:', error);
            alert('Error saving health metrics');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Log Health Metrics</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Water Intake (cups)</label>
                    <div className="relative">
                        <FaTint className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="number"
                            min="0"
                            max="20"
                            step="1"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.water}
                            onChange={(e) => setFormData({ ...formData, water: e.target.value })}
                            placeholder="e.g., 6"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sleep Duration (hours)</label>
                    <div className="relative">
                        <FaBed className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={formData.sleep}
                            onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
                            placeholder="e.g., 7.5"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
                    <div className="relative">
                        <FaSmile className="absolute left-3 top-3 text-gray-400" />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                            value={formData.mood}
                            onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                        >
                            <option value="">Select mood...</option>
                            <option value="Excellent">Excellent 😄</option>
                            <option value="Good">Good 🙂</option>
                            <option value="Okay">Okay 😐</option>
                            <option value="Low">Low 😔</option>
                            <option value="Stressed">Stressed 😰</option>
                        </select>
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
                        disabled={loading || (!formData.water && !formData.sleep && !formData.mood)}
                        className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Metrics'}
                    </button>
                </div>
            </form>
        </div>
    );
}
