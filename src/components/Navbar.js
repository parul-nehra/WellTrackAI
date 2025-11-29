import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#FF6B35]">MyCampusDeals</h1>
          </Link>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-[#FF6B35] transition-colors">
              Login
            </Link>
            <Link href="/signup" className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}