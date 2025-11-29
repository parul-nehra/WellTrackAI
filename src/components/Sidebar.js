'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdFitnessCenter, MdTrackChanges, MdPerson } from 'react-icons/md';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: MdDashboard },
    { name: 'Health', href: '/dashboard/health', icon: MdFitnessCenter },
    { name: 'Goals', href: '/dashboard/goals', icon: MdTrackChanges },
    { name: 'Progress', href: '/dashboard/progress', icon: MdTrackChanges },
    { name: 'Profile', href: '/dashboard/profile', icon: MdPerson },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-16">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-teal-50 text-teal-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Icon className="text-xl" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
