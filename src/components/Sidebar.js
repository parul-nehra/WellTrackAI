import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-16">
      <nav className="p-4 space-y-2">
        <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-[#FF6B35] hover:text-white rounded-lg transition-colors">
          Dashboard
        </Link>
        <Link href="/dashboard/deals" className="block px-4 py-2 text-gray-700 hover:bg-[#FF6B35] hover:text-white rounded-lg transition-colors">
          Deals
        </Link>
        <Link href="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-[#FF6B35] hover:text-white rounded-lg transition-colors">
          Profile
        </Link>
      </nav>
    </aside>
  );
}
