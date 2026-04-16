import { useState } from 'react';
import { Truck, MapPin, Search, Star } from 'lucide-react';
import Drawer from '../components/Drawer';

const mockAgents = [
  { id: 'AGT-001', name: 'Ravi Kumar', phone: '+91 98765 43210', status: 'Online', deliveries: 1245, rating: 4.8 },
  { id: 'AGT-002', name: 'Suresh Patel', phone: '+91 98765 43211', status: 'On Delivery', deliveries: 890, rating: 4.5 },
  { id: 'AGT-003', name: 'Manish Singh', phone: '+91 98765 43212', status: 'Offline', deliveries: 2100, rating: 4.9 },
  { id: 'AGT-004', name: 'Karan Sharma', phone: '+91 98765 43213', status: 'Online', deliveries: 450, rating: 4.2 },
  { id: 'AGT-005', name: 'Vikram Reddy', phone: '+91 98765 43214', status: 'On Delivery', deliveries: 1560, rating: 4.7 },
];

export default function DeliveryAgents() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Online': return <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Online</span>;
      case 'On Delivery': return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">On Delivery</span>;
      case 'Offline': return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">Offline</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Delivery Agents</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search agents..."
            className="w-full sm:w-64 bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4 font-semibold">Agent Name</th>
              <th className="px-6 py-4 font-semibold">Contact</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Deliveries</th>
              <th className="px-6 py-4 font-semibold">Rating</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockAgents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold shrink-0">
                      {agent.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-900">{agent.name}</p>
                      <p className="text-xs text-gray-400">{agent.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{agent.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(agent.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{agent.deliveries}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-semibold text-gray-900">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                    {agent.rating}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <button 
                    onClick={() => setSelectedAgent(agent)}
                    className="px-3 py-1.5 bg-[#FC8019] text-white text-xs font-semibold rounded-lg hover:bg-[#E37316] transition-colors shadow-sm"
                  >
                    Assign Order
                  </button>
                  <button className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1" /> Map
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        isOpen={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
        title="Assign Order"
      >
        {selectedAgent && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center">
               <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg shrink-0">
                  {selectedAgent.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-900 font-bold">{selectedAgent.name}</h3>
                  <p className="text-sm text-gray-500">{selectedAgent.phone}</p>
                </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Select Order ID to Assign</label>
              <select className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]">
                <option value="">Select an unassigned order...</option>
                <option value="ODR-7850">ODR-7850 (A-12, Cyber City)</option>
                <option value="ODR-7851">ODR-7851 (Phase 3, Block B)</option>
              </select>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-3 mt-auto">
              <button onClick={() => setSelectedAgent(null)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#FC8019] text-white font-semibold rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all">
                Assign
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
