import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ← Add this import
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  RefreshCw,
  LogOut  // ← Add this import
} from 'lucide-react';
import { api } from '../services/api';
import OrdersManagement from '../components/admin/OrdersManagement';
import FlavoursManagement from '../components/admin/FlavoursManagement';

function Admin() {
  const navigate = useNavigate();  // ← Add this
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    total_orders: 0,
    pending_orders: 0,
    completed_orders: 0,
    total_revenue: 0
  });
  const [loading, setLoading] = useState(true);

  // Check authentication and fetch stats
  useEffect(() => {
    const token = localStorage.getItem('adminToken');  // ← Check for JWT token
    
    if (!token) {
      navigate('/admin/login');  // ← Redirect to login if no token
      return;
    }
    
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await api.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // If unauthorized (401), redirect to login
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUsername');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // ← Add logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-pink-100">Manage your Sunrise Yogurt business</p>
            </div>
            {/* ← Add logout button */}
            <button
              onClick={handleLogout}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'border-pink-500 text-pink-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'border-pink-500 text-pink-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('flavours')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === 'flavours'
                  ? 'border-pink-500 text-pink-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Orders */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Orders</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stats.total_orders}
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <ShoppingBag className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Pending Orders */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Pending Orders</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stats.pending_orders}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Package className="w-8 h-8 text-yellow-500" />
                  </div>
                </div>
              </div>

              {/* Completed Orders */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Completed</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      {stats.completed_orders}
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                      KES {stats.total_revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <DollarSign className="w-8 h-8 text-pink-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchStats}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Stats
            </button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && <OrdersManagement />}

        {/* Flavours Tab */}
        {activeTab === 'flavours' && <FlavoursManagement />}
      </div>
    </div>
  );
}

export default Admin;