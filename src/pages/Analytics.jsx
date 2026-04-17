import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, Target } from 'lucide-react';

const categoryData = [
  { name: 'Staples', sales: 4000 },
  { name: 'Dairy', sales: 3000 },
  { name: 'Snacks', sales: 2000 },
  { name: 'Beverages', sales: 2780 },
  { name: 'Personal Care', sales: 1890 },
];

const revenueData = {
  daily: [
    { name: '08:00', value: 1200 }, { name: '10:00', value: 3000 }, { name: '12:00', value: 4500 },
    { name: '14:00', value: 3800 }, { name: '16:00', value: 5200 }, { name: '18:00', value: 6800 },
    { name: '20:00', value: 8100 }, { name: '22:00', value: 4100 }
  ],
  weekly: [
    { name: 'Mon', value: 12000 }, { name: 'Tue', value: 15000 }, { name: 'Wed', value: 14000 },
    { name: 'Thu', value: 18000 }, { name: 'Fri', value: 25000 }, { name: 'Sat', value: 32000 },
    { name: 'Sun', value: 28000 }
  ],
  monthly: [
    { name: 'Week 1', value: 85000 }, { name: 'Week 2', value: 92000 }, 
    { name: 'Week 3', value: 88000 }, { name: 'Week 4', value: 105000 }
  ]
};

export default function Analytics() {
  const [revenueToggle, setRevenueToggle] = useState('weekly');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics & Reports</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Revenue Trends</h2>
            <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
              {['daily', 'weekly', 'monthly'].map((period) => (
                <button 
                  key={period}
                  onClick={() => setRevenueToggle(period)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${revenueToggle === period ? 'bg-white shadow text-[#FC8019]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData[revenueToggle]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 13}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{stroke: '#f3f4f6', strokeWidth: 2}}
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="value" stroke="#FC8019" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6, fill: '#FC8019', stroke: '#fff', strokeWidth: 2}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 min-h-[400px] flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Top Categories</h2>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 13}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} />
                <RechartsTooltip 
                  cursor={{fill: '#f3f4f6'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value) => [`₹${value}`, 'Sales']}
                />
                <Bar dataKey="sales" fill="#FC8019" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
