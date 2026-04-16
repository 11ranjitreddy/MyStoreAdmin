import { Search, ChevronRight } from 'lucide-react';

const mockCustomers = [
  { id: 'CUST-801', name: 'Amit Kumar', email: 'amit.k@example.com', totalOrders: 45, spent: '₹14,500', lastOrder: '2 hours ago' },
  { id: 'CUST-802', name: 'Priya Patel', email: 'priya.p@example.com', totalOrders: 12, spent: '₹3,200', lastOrder: '1 day ago' },
  { id: 'CUST-803', name: 'Rahul Sharma', email: 'rahul.s@example.com', totalOrders: 89, spent: '₹42,100', lastOrder: '3 days ago' },
  { id: 'CUST-804', name: 'Neha Singh', email: 'neha.s@example.com', totalOrders: 4, spent: '₹850', lastOrder: '1 week ago' },
  { id: 'CUST-805', name: 'Vikram Reddy', email: 'vikram.r@example.com', totalOrders: 21, spent: '₹8,900', lastOrder: '2 weeks ago' },
];

export default function Customers() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Customers</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search customers..."
            className="w-full sm:w-64 bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Total Orders</th>
              <th className="px-6 py-4 font-semibold">Total Spent</th>
              <th className="px-6 py-4 font-semibold">Last Order Date</th>
              <th className="px-6 py-4 font-semibold text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}&backgroundColor=f4f6f9`} 
                      className="w-10 h-10 rounded-full border border-gray-100"
                      alt={customer.name}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{customer.totalOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{customer.spent}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="p-2 text-gray-400 hover:text-[#FC8019] hover:bg-[#FC8019]/10 rounded-lg transition-colors inline-block">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
