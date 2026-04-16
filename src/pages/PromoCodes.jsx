import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Drawer from '../components/Drawer';

const mockPromos = [
  { id: 1, code: 'WELCOME50', type: 'Percentage', discount: '50%', minOrder: '₹200', expiry: '2024-12-31', active: true },
  { id: 2, code: 'FLAT100', type: 'Flat', discount: '₹100', minOrder: '₹500', expiry: '2024-10-15', active: true },
  { id: 3, code: 'FREEDEL', type: 'Delivery', discount: 'Free', minOrder: '₹300', expiry: '2024-09-30', active: false },
];

export default function PromoCodes() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Promo Codes</h1>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center px-4 py-2 bg-[#FC8019] text-white rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all font-semibold text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Promo
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4 font-semibold">Promo Code</th>
              <th className="px-6 py-4 font-semibold">Discount Type</th>
              <th className="px-6 py-4 font-semibold">Discount Value</th>
              <th className="px-6 py-4 font-semibold">Min Order</th>
              <th className="px-6 py-4 font-semibold">Expiry Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockPromos.map((promo) => (
              <tr key={promo.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono font-bold text-[#FC8019] bg-orange-50 px-2 py-1 rounded border border-orange-100">{promo.code}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{promo.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{promo.discount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promo.minOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promo.expiry}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={promo.active} />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FC8019]"></div>
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button className="p-2 text-gray-400 hover:text-[#FC8019] hover:bg-[#FC8019]/10 rounded-lg transition-colors inline-block">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-block">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create Promo Code"
      >
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Promo Code Name</label>
            <input type="text" className="font-mono w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="e.g. SUMMER50" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Discount Type</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]">
              <option>Percentage</option>
              <option>Flat Amount</option>
              <option>Free Delivery</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Value</label>
              <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="e.g. 50" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Min Order (₹)</label>
              <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="e.g. 200" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Expiry Date</label>
            <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" />
          </div>
          
          <div className="pt-6 border-t border-gray-100 flex gap-3">
            <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="flex-1 px-4 py-2.5 bg-[#FC8019] text-white font-semibold rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all">
              Save Promo
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
