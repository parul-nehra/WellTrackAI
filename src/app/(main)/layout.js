'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNavbar from '@/components/DashboardNavbar';
import Sidebar from '@/components/Sidebar';

export default function MainLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardNavbar />
            <Sidebar />
            <main className="ml-64 mt-16 p-8">
                {children}
            </main>
        </div>
    );
}
