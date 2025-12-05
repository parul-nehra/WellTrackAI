'use client';
import { useEffect, useState } from 'react';
import { FaTrophy, FaMedal, FaBullseye, FaRunning, FaAward, FaChevronLeft, FaChevronRight, FaSort, FaCrown, FaStar } from 'react-icons/fa';

export default function CompetePage() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);

    // Pagination and sorting states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('score');
    const [sortOrder, setSortOrder] = useState('desc');
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        fetchLeaderboard();
    }, [currentPage, itemsPerPage, sortBy, sortOrder]);

    const fetchCurrentUser = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setCurrentUserId(data.id);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('page', currentPage);
            params.append('limit', itemsPerPage);
            params.append('sortBy', sortBy);
            params.append('order', sortOrder);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard?${params.toString()}`, {
                credentials: 'include'
            });

            if (res.ok) {
                const data = await res.json();
                setLeaderboard(data.data || []);
                setPagination(data.pagination || null);
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRankBadge = (rank) => {
        if (rank === 1) {
            return <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold shadow-lg">
                <FaCrown className="text-lg" />
            </div>;
        } else if (rank === 2) {
            return <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 text-white font-bold shadow-lg">
                <FaMedal className="text-lg" />
            </div>;
        } else if (rank === 3) {
            return <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold shadow-lg">
                <FaMedal className="text-lg" />
            </div>;
        }
        return <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold">
            {rank}
        </div>;
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('desc');
        }
        setCurrentPage(1);
    };

    const findMyRank = () => {
        // This would require fetching all data or a separate endpoint
        // For now, we'll just scroll to the user if they're on the current page
        const userIndex = leaderboard.findIndex(user => user.userId === currentUserId);
        if (userIndex !== -1) {
            const element = document.getElementById(`user-${currentUserId}`);
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <FaTrophy className="text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Competition Leaderboard</h1>
                        <p className="text-teal-100 mt-1">See how you rank against other wellness champions</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <FaBullseye className="text-2xl mb-2" />
                        <p className="text-sm text-teal-100">Goals Completed</p>
                        <p className="text-2xl font-bold">Track Progress</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <FaRunning className="text-2xl mb-2" />
                        <p className="text-sm text-teal-100">Activities</p>
                        <p className="text-2xl font-bold">Stay Active</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <FaAward className="text-2xl mb-2" />
                        <p className="text-sm text-teal-100">Achievements</p>
                        <p className="text-2xl font-bold">Earn Rewards</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Sort Options */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <FaSort /> Sort by:
                        </span>
                        {[
                            { value: 'score', label: 'Overall Score' },
                            { value: 'goals', label: 'Goals' },
                            { value: 'activities', label: 'Activities' },
                            { value: 'achievements', label: 'Achievements' }
                        ].map(option => (
                            <button
                                key={option.value}
                                onClick={() => handleSortChange(option.value)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${sortBy === option.value
                                        ? 'bg-teal-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {option.label}
                                {sortBy === option.value && (
                                    <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Items Per Page */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(parseInt(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading leaderboard...</div>
                ) : leaderboard.length === 0 ? (
                    <div className="text-center py-12">
                        <FaTrophy className="mx-auto text-4xl text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No data yet</h3>
                        <p className="text-gray-500">Start completing goals and activities to appear on the leaderboard!</p>
                    </div>
                ) : (
                    <>
                        {/* Table Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-700">
                                <div className="col-span-1">Rank</div>
                                <div className="col-span-4">User</div>
                                <div className="col-span-2 text-center">Score</div>
                                <div className="col-span-2 text-center">Goals</div>
                                <div className="col-span-2 text-center">Activities</div>
                                <div className="col-span-1 text-center">🏆</div>
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-gray-100">
                            {leaderboard.map((user) => {
                                const isCurrentUser = user.userId === currentUserId;
                                return (
                                    <div
                                        key={user.userId}
                                        id={`user-${user.userId}`}
                                        className={`px-6 py-4 transition-colors ${isCurrentUser
                                                ? 'bg-teal-50 border-l-4 border-teal-600'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            {/* Rank */}
                                            <div className="col-span-1">
                                                {getRankBadge(user.rank)}
                                            </div>

                                            {/* User Info */}
                                            <div className="col-span-4 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold">
                                                    {getInitials(user.name)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {user.name}
                                                        {isCurrentUser && (
                                                            <span className="ml-2 text-xs bg-teal-600 text-white px-2 py-1 rounded-full">
                                                                You
                                                            </span>
                                                        )}
                                                    </p>
                                                    {user.rank <= 3 && (
                                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                                            <FaStar className="text-yellow-500" />
                                                            Top Performer
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Score */}
                                            <div className="col-span-2 text-center">
                                                <p className="text-2xl font-bold text-teal-600">{user.score}</p>
                                            </div>

                                            {/* Goals */}
                                            <div className="col-span-2 text-center">
                                                <p className="text-lg font-semibold text-gray-900">{user.goalsCompleted}</p>
                                                <p className="text-xs text-gray-500">completed</p>
                                            </div>

                                            {/* Activities */}
                                            <div className="col-span-2 text-center">
                                                <p className="text-lg font-semibold text-gray-900">{user.totalActivities}</p>
                                                <p className="text-xs text-gray-500">{user.totalActivityDuration} min</p>
                                            </div>

                                            {/* Achievements */}
                                            <div className="col-span-1 text-center">
                                                <p className="text-lg font-semibold text-gray-900">{user.achievementCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Pagination */}
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

            {/* Results Info */}
            {pagination && (
                <div className="text-center text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, pagination.total)} of {pagination.total} users
                </div>
            )}
        </div>
    );
}
