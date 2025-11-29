import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to MyCampusDeals
          </h1>
          <p className="text-xl text-gray-600">
            Your campus marketplace for amazing deals
          </p>
        </div>
      </main>
    </div>
  );
}
