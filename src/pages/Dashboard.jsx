import { 
  ShoppingBag, 
  IndianRupee, 
  Truck, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const kpis = [
  { id: 1, title: 'Total Orders', value: '1,248', change: '+12.5%', isPositive: true, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 2, title: 'Revenue Today', value: '₹4,56,800', change: '+8.2%', isPositive: true, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
  { id: 3, title: 'Active Deliveries', value: '142', change: '-2.4%', isPositive: false, icon: Truck, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 4, title: 'New Users', value: '86', change: '+4.1%', isPositive: true, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const revenueData = [
  { time: '08:00', orders: 120 },
  { time: '10:00', orders: 250 },
  { time: '12:00', orders: 480 },
  { time: '14:00', orders: 390 },
  { time: '16:00', orders: 320 },
  { time: '18:00', orders: 550 },
  { time: '20:00', orders: 780 },
  { time: '22:00', orders: 420 },
];

const statusData = [
  { name: 'Delivered', value: 850, color: '#22C55E' },
  { name: 'In Progress', value: 340, color: '#F59E0B' },
  { name: 'Cancelled', value: 58, color: '#EF4444' },
];

const recentOrders = [
  { id: '#ODR-7842', customer: 'Rahul Sharma', items: '3 items', total: '₹540', status: 'Delivered', time: '10 mins ago' },
  { id: '#ODR-7843', customer: 'Priya Patel', items: '1 item', total: '₹220', status: 'In Progress', time: '15 mins ago' },
  { id: '#ODR-7844', customer: 'Amit Kumar', items: '5 items', total: '₹1,250', status: 'In Progress', time: '22 mins ago' },
  { id: '#ODR-7845', customer: 'Neha Singh', items: '2 items', total: '₹340', status: 'Cancelled', time: '1 hour ago' },
  { id: '#ODR-7846', customer: 'Vikram Reddy', items: '4 items', total: '₹890', status: 'Delivered', time: '2 hours ago' },
];

const topProducts = [
  { id: 1, name: 'Aashirvaad Atta', sales: 450, stock: 120, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=atta&backgroundColor=f4f6f9' },
  { id: 2, name: 'Amul Taaza Milk', sales: 380, stock: 45, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=milk&backgroundColor=f4f6f9' },
  { id: 3, name: 'Tata Salt', sales: 310, stock: 800, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=salt&backgroundColor=f4f6f9' },
  { id: 4, name: 'Maggi Noodles', sales: 290, stock: 15, image: 'https://api.dicebear.com/7.x/shapes/svg?seed=maggi&backgroundColor=f4f6f9' },
];

const StatusBadge = ({ status }) => {
  const styles = {
    'Delivered': 'bg-green-100 text-green-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    'Cancelled': 'bg-red-100 text-red-700'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <div className="text-sm text-gray-500 font-medium">
          Last updated: Today, 10:42 AM
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-gray-500">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`flex items-center font-medium ${kpi.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {kpi.change}
              </span>
              <span className="text-gray-400 ml-2">vs yesterday</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 lg:col-span-2 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Orders Over Time</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{stroke: '#f3f4f6', strokeWidth: 2}}
                />
                <Line type="monotone" dataKey="orders" stroke="#FC8019" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6, fill: '#FC8019', stroke: '#fff', strokeWidth: 2}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Order Status</h2>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
              <span className="text-3xl font-bold text-gray-900">1,248</span>
              <span className="text-sm text-gray-500">Total</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Orders</h2>
            <button className="text-[#FC8019] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div>{order.customer}</div>
                      <div className="text-xs text-gray-400">{order.items}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Top Products</h2>
          </div>
          <div className="p-6 space-y-5 flex-1 overflow-y-auto">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center">
                <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover p-2" />
                </div>
                <div className="ml-4 flex-1 overflow-hidden">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h4>
                  <div className="flex items-center text-xs mt-1">
                    <span className="text-gray-500">{product.sales} sales</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className={product.stock < 50 ? 'text-red-500 font-medium' : 'text-gray-500'}>
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
