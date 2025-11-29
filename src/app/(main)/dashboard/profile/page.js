'use client';
import { useState, useEffect } from 'react';
import { MdPerson, MdEmail, MdPhone, MdEdit } from 'react-icons/md';

export default function ProfilePage() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
        // In a real app, you'd fetch the email from your backend
        setUserEmail('user@example.com');
    }, []);

    return (
        <>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 mt-1">Manage your account settings</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{userName}</h2>
                        <p className="text-gray-600">Member since 2024</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <MdPerson className="text-2xl text-gray-600" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="font-medium">{userName}</p>
                        </div>
                        <button className="text-teal-600 hover:text-teal-700">
                            <MdEdit className="text-xl" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <MdEmail className="text-2xl text-gray-600" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{userEmail}</p>
                        </div>
                        <button className="text-teal-600 hover:text-teal-700">
                            <MdEdit className="text-xl" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <MdPhone className="text-2xl text-gray-600" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium">+1 (555) 123-4567</p>
                        </div>
                        <button className="text-teal-600 hover:text-teal-700">
                            <MdEdit className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                <div className="space-y-3">
                    <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-left">
                        Change Password
                    </button>
                    <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-left">
                        Notification Settings
                    </button>
                    <button className="w-full px-6 py-3 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors text-left">
                        Delete Account
                    </button>
                </div>
            </div>
        </>
    );
}
