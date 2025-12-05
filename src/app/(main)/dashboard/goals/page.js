'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBullseye, FaCheckCircle, FaClock, FaPlus, FaWalking, FaTint, FaBed, FaLeaf, FaTimes, FaTrash, FaSearch, FaFilter, FaSort, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function GoalsPage() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [progressValue, setProgressValue] = useState('');

    // Filter and pagination states
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        fetchGoals();
    }, [selectedCategory, selectedStatus, searchQuery, sortBy, sortOrder, currentPage, itemsPerPage]);

    const fetchGoals = async () => {
        setLoading(true);
        try {
            // Build query parameters
            const params = new URLSearchParams();
            params.append('page', currentPage);
            params.append('limit', itemsPerPage);

            if (selectedCategory !== 'All') params.append('category', selectedCategory);
            if (selectedStatus !== 'All') params.append('status', selectedStatus);
            if (searchQuery) params.append('search', searchQuery);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals?${params.toString()}`, {
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                // Check if response has pagination (backend returns {data, pagination})
                if (data.data && data.pagination) {
                    setGoals(data.data);
                    setPagination(data.pagination);
                } else {
                    // Fallback for non-paginated response
                    setGoals(Array.isArray(data) ? data : []);
                    setPagination(null);
                }
            }
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateProgress = async (goalId, newCurrent) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals/${goalId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ current: newCurrent })
            });
            if (res.ok) {
                fetchGoals();
            }
        } catch (error) {
            console.error('Error updating goal:', error);
        }
    };

    const deleteGoal = async (goalId) => {
        if (!confirm('Are you sure you want to delete this goal?')) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals/${goalId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                fetchGoals();
            }
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleFilterChange = (filterType, value) => {
        if (filterType === 'category') setSelectedCategory(value);
        if (filterType === 'status') setSelectedStatus(value);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const goalsArray = Array.isArray(goals) ? goals : [];

    const getIconForCategory = (category) => {
        switch (category) {
            case 'Fitness': return FaWalking;
            case 'Nutrition': return FaTint;
            case 'Health': return FaBed;
            case 'Mindfulness': return FaLeaf;
            default: return FaBullseye;
        }
    };

    const getColorForCategory = (category) => {
        switch (category) {
            case 'Fitness': return { color: 'text-teal-600', bg: 'bg-teal-100' };
            case 'Nutrition': return { color: 'text-blue-600', bg: 'bg-blue-100' };
            case 'Health': return { color: 'text-purple-600', bg: 'bg-purple-100' };
            case 'Mindfulness': return { color: 'text-green-600', bg: 'bg-green-100' };
            default: return { color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
                    <p className="text-gray-600 mt-1">Set targets and track your achievements</p>
                </div>
                <Link href="/dashboard/goals/create" className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md">
                    <FaPlus /> Create New Goal
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search goals by title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaFilter className="inline mr-2" />Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="All">All Categories</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Nutrition">Nutrition</option>
                            <option value="Health">Health</option>
                            <option value="Mindfulness">Mindfulness</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaFilter className="inline mr-2" />Status
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {/* Items Per Page */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Items per page
                        </label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(parseInt(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="6">6 per page</option>
                            <option value="12">12 per page</option>
                            <option value="24">24 per page</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Info */}
            {pagination && (
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} goals
                    </span>
                    <span className="text-gray-500">
                        Page {currentPage} of {pagination.totalPages}
                    </span>
                </div>
            )}

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-2 text-center py-10 text-gray-500">Loading goals...</div>
                ) : goalsArray.length === 0 ? (
                    <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <FaBullseye className="mx-auto text-4xl text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No goals found</h3>
                        <p className="text-gray-500 mb-4">
                            {searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All'
                                ? 'Try adjusting your filters or search query'
                                : 'Create your first wellness goal!'}
                        </p>
                        <Link href="/dashboard/goals/create" className="text-teal-600 hover:text-teal-700 font-medium">
                            Create a goal now &rarr;
                        </Link>
                    </div>
                ) : (
                    goalsArray.map((goal) => {
                        const Icon = getIconForCategory(goal.category);
                        const colors = getColorForCategory(goal.category);
                        const progress = Math.round((goal.current / goal.target) * 100);
                        return (
                            <div key={goal.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 group hover:border-teal-200 transition-all">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                                            <Icon className={`text-xl ${colors.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{goal.title}</h3>
                                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                {goal.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-2xl font-bold text-gray-900">{progress}%</span>
                                        <span className={`text-xs font-medium ${goal.status === 'Completed' ? 'text-green-600' :
                                            goal.status === 'In Progress' ? 'text-blue-600' : 'text-gray-500'
                                            }`}>
                                            {goal.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${goal.status === 'Completed' ? 'bg-green-500' : 'bg-teal-600'
                                            }`}
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{goal.current} / {goal.target}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedGoal(goal);
                                                setProgressValue(goal.current);
                                                setShowModal(true);
                                            }}
                                            className="text-sm font-medium text-gray-400 hover:text-teal-600 transition-colors"
                                        >
                                            Update →
                                        </button>
                                        <button
                                            onClick={() => deleteGoal(goal.id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <FaChevronLeft size={12} /> Previous
                    </button>

                    <div className="flex gap-1">
                        {[...Array(pagination.totalPages)].map((_, idx) => {
                            const pageNum = idx + 1;
                            // Show first, last, current, and adjacent pages
                            if (
                                pageNum === 1 ||
                                pageNum === pagination.totalPages ||
                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === pageNum
                                                ? 'bg-teal-600 text-white'
                                                : 'border border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (
                                pageNum === currentPage - 2 ||
                                pageNum === currentPage + 2
                            ) {
                                return <span key={pageNum} className="px-2">...</span>;
                            }
                            return null;
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                        disabled={currentPage === pagination.totalPages}
                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        Next <FaChevronRight size={12} />
                    </button>
                </div>
            )}

            {/* Update Progress Modal */}
            {showModal && selectedGoal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Update Progress</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-600 mb-2">{selectedGoal.title}</p>
                            <p className="text-sm text-gray-500">Current: {selectedGoal.current} / Target: {selectedGoal.target}</p>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            updateProgress(selectedGoal.id, parseInt(progressValue));
                            setShowModal(false);
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Progress Value</label>
                                <input
                                    type="number"
                                    value={progressValue}
                                    onChange={(e) => setProgressValue(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
