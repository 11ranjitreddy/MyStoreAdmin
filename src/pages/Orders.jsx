import { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Eye, Truck } from 'lucide-react';
import Drawer from '../components/Drawer';

const mockOrders = Array.from({ length: 45 }).map((_, i) => ({
  id: `ODR-70${i + 1}`,
  customer: ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Neha Singh', 'Vikram Reddy'][i % 5],
  agent: ['Ravi', 'Suresh', 'Unassigned', 'Manish', 'Karan'][i % 5],
  items: (i % 5) + 1,
  total: `₹${((i % 10) + 1) * 120}`,
  status: ['Delivered', 'In Progress', 'Pending', 'Cancelled', 'Delivered'][i % 5],
  time: `${i + 1} hours ago`,
  paymentStatus: ['Paid', 'Paid', 'Pending', 'Failed', 'Paid'][i % 5],
}));

export default function Orders() {
  const [filter, setFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const filtered = filter === 'All' ? mockOrders : mockOrders.filter(o => o.status === filter);
  const totalPages = Math.ceil(filtered.length / 10);
  const currentOrders = filtered.slice((page - 1) * 10, page * 10);

  const getStatusBadge = (status) => {
    const styles = {
      'Delivered': 'bg-green-100 text-green-700 border-green-200',
      'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
      'Pending': 'bg-blue-100 text-blue-700 border-blue-200',
      'Cancelled': 'bg-red-100 text-red-700 border-red-200',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders Management</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 focus:ring-2 focus:ring-[#FC8019] transition-all font-medium text-sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex overflow-x-auto custom-scrollbar pb-2 sm:pb-0 hide-scrollbar space-x-2">
            {['All', 'Pending', 'In Progress', 'Delivered', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setFilter(tab); setPage(1); }}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab 
                    ? 'bg-[#FC8019] text-white shadow-md shadow-[#FC8019]/20' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by ID or Customer..."
              className="w-full sm:w-64 bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items} items</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="p-2 text-gray-400 hover:text-[#FC8019] hover:bg-[#FC8019]/10 rounded-lg transition-colors inline-block"
                      onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (10 per page) */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing <span className="font-medium text-gray-900">{(page - 1) * 10 + 1}</span> to <span className="font-medium text-gray-900">{Math.min(page * 10, filtered.length)}</span> of <span className="font-medium text-gray-900">{filtered.length}</span> results
          </span>
          <div className="flex space-x-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Drawer Modal */}
      <Drawer
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order Details - ${selectedOrder.id}` : ''}
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500">Status</span>
              {getStatusBadge(selectedOrder.status)}
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Customer Info</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm border border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{selectedOrder.customer}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Phone:</span> <span className="font-medium text-gray-900">+91 98765 43210</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Address:</span> <span className="font-medium text-gray-900 text-right">A-12, Cyber City, Phase 2</span></div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Delivery Agent</h3>
              <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mr-3">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{selectedOrder.agent !== 'Unassigned' ? selectedOrder.agent : 'Not Assigned'}</p>
                    {selectedOrder.agent !== 'Unassigned' && <p className="text-xs text-gray-500">+91 90000 00000</p>}
                  </div>
                </div>
                {selectedOrder.agent === 'Unassigned' && (
                  <button className="px-3 py-1.5 bg-[#FC8019] text-white text-xs font-semibold rounded-lg hover:bg-[#E37316] transition-colors shadow-sm shadow-[#FC8019]/20">
                    Assign
                  </button>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Payment</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm border border-gray-100">
                <div className="flex justify-between"><span className="text-gray-500">Total Amount:</span> <span className="font-bold text-gray-900">{selectedOrder.total}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Status:</span> <span className={selectedOrder.paymentStatus === 'Paid' ? 'text-green-600 font-semibold' : 'text-amber-600 font-semibold'}>{selectedOrder.paymentStatus}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Method:</span> <span className="font-medium text-gray-900">UPI / GPay</span></div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-3">
              <button className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Cancel Order
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#FC8019] text-white font-semibold rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all">
                Print Invoice
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
