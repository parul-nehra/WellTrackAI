'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdFitnessCenter, MdPerson } from 'react-icons/md';
import { FaRobot, FaBullseye, FaChartLine, FaTrophy } from 'react-icons/fa';

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: MdDashboard },
    { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: FaRobot },
    { name: 'Health', href: '/dashboard/health', icon: MdFitnessCenter },
    { name: 'Goals', href: '/dashboard/goals', icon: FaBullseye },
    { name: 'Progress', href: '/dashboard/progress', icon: FaChartLine },
    { name: 'Compete', href: '/dashboard/compete', icon: FaTrophy },
    { name: 'Profile', href: '/dashboard/profile', icon: MdPerson },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out md:translate-x-0 md:fixed md:top-16 md:h-[calc(100vh-4rem)] ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 md:hidden">
          <span className="text-xl font-bold text-teal-600 dark:text-teal-400">WellTrackAI</span>
        </div>

        <nav className="p-4 space-y-1 mt-16 md:mt-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
              >
                <Icon className="text-xl" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
