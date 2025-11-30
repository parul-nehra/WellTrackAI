'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBullseye } from 'react-icons/fa';

export default function CreateGoalPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        target: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('Creating goal with data:', formData);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            console.log('Response status:', res.status);
            const data = await res.json();
            console.log('Response data:', data);

            if (res.ok) {
                router.push('/dashboard/goals');
            } else {
                alert(`Failed to create goal: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error creating goal:', error);
            alert(`Error creating goal: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Goal</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                    <div className="relative">
                        <FaBullseye className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., Walk 10,000 steps daily"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="">Select category...</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Health">Health</option>
                        <option value="Mindfulness">Mindfulness</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                    <input
                        type="number"
                        required
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.target}
                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                        placeholder="e.g., 10000"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter the target value you want to achieve</p>
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
                        {loading ? 'Creating...' : 'Create Goal'}
                    </button>
                </div>
            </form>
        </div>
    );
}
