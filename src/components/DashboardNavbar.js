'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardNavbar() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="text-xl font-bold text-teal-600">
            WellTrackAI
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{userName}</span>
            <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
