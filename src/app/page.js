import Navbar from '../components/Navbar';
import { FaDumbbell, FaBullseye, FaChartLine } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            WellTrackAI
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Simple health tracking for a better you
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/signup" className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors">
              Get Started
            </a>
            <a href="/login" className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Sign In
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <FaDumbbell className="text-5xl text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Health</h3>
            <p className="text-gray-600">Monitor your daily activities and wellness metrics</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <FaBullseye className="text-5xl text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Set Goals</h3>
            <p className="text-gray-600">Create and achieve your wellness objectives</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <FaChartLine className="text-5xl text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">See Progress</h3>
            <p className="text-gray-600">Visualize your journey over time</p>
          </div>
        </div>
      </main>
    </div>
  );
}
