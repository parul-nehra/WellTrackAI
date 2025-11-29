'use client';
import { useState, useEffect } from 'react';
import { MdPerson, MdEmail, MdPhone, MdEdit, MdSave, MdNotifications, MdColorLens, MdSecurity } from 'react-icons/md';

export default function ProfilePage() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('rahul.sharma@example.com');
    const [userPhone, setUserPhone] = useState('+91 98765 43210');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account and preferences</p>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-teal-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors border-2 border-white">
                        <MdEdit className="text-lg" />
                    </button>
                </div>
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{userName}</h2>
                    <p className="text-gray-500">Member since November 2024</p>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">Pro Member</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Level 5</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column - Navigation */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <nav className="flex flex-col">
                            <button className="flex items-center gap-3 px-6 py-4 bg-teal-50 text-teal-700 font-medium border-l-4 border-teal-600">
                                <MdPerson className="text-xl" /> Personal Info
                            </button>
                            <button className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors">
                                <MdNotifications className="text-xl" /> Notifications
                            </button>
                            <button className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors">
                                <MdColorLens className="text-xl" /> Appearance
                            </button>
                            <button className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors">
                                <MdSecurity className="text-xl" /> Security
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEditing ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {isEditing ? <><MdSave /> Save Changes</> : <><MdEdit /> Edit</>}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                        <input
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                        <input
                                            type="tel"
                                            value={userPhone}
                                            onChange={(e) => setUserPhone(e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                    <input
                                        type="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        disabled={!isEditing}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <select
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        disabled={!isEditing}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Account Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-left flex justify-between items-center">
                                Change Password
                                <span className="text-gray-400">→</span>
                            </button>
                            <button className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors text-left flex justify-between items-center">
                                Delete Account
                                <span className="text-red-400">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
