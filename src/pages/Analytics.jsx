import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Target } from 'lucide-react';

const categoryData = [
  { name: 'Staples', sales: 4000 },
  { name: 'Dairy', sales: 3000 },
  { name: 'Snacks', sales: 2000 },
  { name: 'Beverages', sales: 2780 },
  { name: 'Personal Care', sales: 1890 },
];

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics & Reports</h1>
        <select className="bg-white border border-gray-200 rounded-xl py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
           <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-medium text-sm">Average Order Value</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
           </div>
           <p className="text-3xl font-bold text-gray-900">₹425</p>
           <p className="text-sm text-green-600 font-medium mt-2">+5.2% vs last week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
           <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-medium text-sm">Avg. Delivery Time</h3>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-5 h-5" /></div>
           </div>
           <p className="text-3xl font-bold text-gray-900">22 mins</p>
           <p className="text-sm text-green-600 font-medium mt-2">-2 mins vs last week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
           <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-500 font-medium text-sm">Order Fulfillment Rate</h3>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Target className="w-5 h-5" /></div>
           </div>
           <p className="text-3xl font-bold text-gray-900">98.5%</p>
           <p className="text-sm text-gray-400 font-medium mt-2">Consistent</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 w-full min-h-[400px] flex flex-col">
        <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Top Categories by Revenue</h2>
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 13}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
              <RechartsTooltip 
                cursor={{fill: '#f3f4f6'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="sales" fill="#FC8019" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
