'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardNavbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 h-16 fixed top-0 left-0 right-0 z-10">
      <div className="h-full px-4 flex justify-between items-center">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold text-[#FF6B35]">MyCampusDeals</h1>
        </Link>
        <div className="text-gray-700 font-medium">{userName}</div>
      </div>
    </nav>
  );
}
