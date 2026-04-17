import { useState } from 'react';
import { Truck, MapPin, Search, Star, Plus, Edit, Image as ImageIcon, X, Trash2 } from 'lucide-react';
import Drawer from '../components/Drawer';
import Modal from '../components/Modal';

const mockAgents = [
  { id: 'AGT-001', name: 'Ravi Kumar', phone: '+91 98765 43210', status: 'Online', deliveries: 1245, rating: 4.8, coords: "12.9716,77.5946", email: "ravi.k@example.com", vehicleNo: "KA-01-AB-1234", vehicleType: "Bike" },
  { id: 'AGT-002', name: 'Suresh Patel', phone: '+91 98765 43211', status: 'On Delivery', deliveries: 890, rating: 4.5, coords: "12.9345,77.6266", email: "suresh.p@example.com", vehicleNo: "KA-02-CD-5678", vehicleType: "Scooter" },
  { id: 'AGT-003', name: 'Manish Singh', phone: '+91 98765 43212', status: 'Offline', deliveries: 2100, rating: 4.9, coords: "12.9279,77.6271", email: "manish.s@example.com", vehicleNo: "KA-03-EF-9012", vehicleType: "Bike" },
  { id: 'AGT-004', name: 'Karan Sharma', phone: '+91 98765 43213', status: 'Online', deliveries: 450, rating: 4.2, coords: "12.9141,77.6366", email: "karan.s@example.com", vehicleNo: "KA-04-GH-3456", vehicleType: "Bicycle" },
  { id: 'AGT-005', name: 'Vikram Reddy', phone: '+91 98765 43214', status: 'On Delivery', deliveries: 1560, rating: 4.7, coords: "12.9250,77.5938", email: "vikram.r@example.com", vehicleNo: "KA-05-IJ-7890", vehicleType: "Bike" },
];

export default function DeliveryAgents() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null); // 'assign', 'edit', 'add'
  const [mapAgent, setMapAgent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [smsSent, setSmsSent] = useState(false);

  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', vehicleNo: '', vehicleType: 'Bike', isActive: true
  });

  const openAddAgent = () => {
    setFormData({ name: '', phone: '', email: '', vehicleNo: '', vehicleType: 'Bike', isActive: true });
    setImagePreview(null);
    setSmsSent(false);
    setActiveAgent(null);
    setDrawerMode('add');
  };

  const openEditAgent = (agent) => {
    setFormData({
      name: agent.name, phone: agent.phone, email: agent.email || '', vehicleNo: agent.vehicleNo || '', vehicleType: agent.vehicleType || 'Bike', isActive: agent.status !== 'Offline'
    });
    setImagePreview(null);
    setSmsSent(false);
    setActiveAgent(agent);
    setDrawerMode('edit');
  };

  const openAssignOrder = (agent) => {
    setActiveAgent(agent);
    setDrawerMode('assign');
  };

  const closeDrawer = () => {
    setDrawerMode(null);
    setActiveAgent(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitAgent = (e) => {
    e.preventDefault();
    if (drawerMode === 'add') {
      // Mock SMS sending response
      setSmsSent(true);
      setTimeout(() => closeDrawer(), 2500);
    } else {
      closeDrawer();
    }
  };

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
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search agents..."
              className="w-full bg-white border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]"
            />
          </div>
          <button 
            onClick={openAddAgent}
            className="flex items-center px-4 py-2 bg-[#FC8019] text-white rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all font-semibold text-sm shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </button>
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
                    title="Click to Edit Agent"
                    onClick={() => openEditAgent(agent)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    title="Assign Order"
                    onClick={() => openAssignOrder(agent)}
                    className="px-3 py-1.5 bg-[#FC8019] text-white text-xs font-semibold rounded-lg hover:bg-[#E37316] transition-colors shadow-sm inline-flex items-center"
                  >
                    Assign Order
                  </button>
                  <button 
                    title="View Map Location"
                    onClick={() => setMapAgent(agent)}
                    className="px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center"
                  >
                    <MapPin className="w-3.5 h-3.5 mr-1" /> Map
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shared Drawer for Add/Edit/Assign */}
      <Drawer
        isOpen={drawerMode !== null}
        onClose={closeDrawer}
        title={
          drawerMode === 'add' ? 'Add New Delivery Agent' :
          drawerMode === 'edit' ? `Edit Agent - ${activeAgent?.name}` :
          drawerMode === 'assign' ? 'Assign Order' : ''
        }
      >
        {drawerMode === 'assign' && activeAgent && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center">
               <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg shrink-0">
                  {activeAgent.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-900 font-bold">{activeAgent.name}</h3>
                  <p className="text-sm text-gray-500">{activeAgent.phone}</p>
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
              <button onClick={closeDrawer} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#FC8019] text-white font-semibold rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all">
                Assign
              </button>
            </div>
          </div>
        )}

        {(drawerMode === 'add' || drawerMode === 'edit') && (
          <form className="space-y-5" onSubmit={handleSubmitAgent}>
            {/* Read Only Details on Edit */}
            {drawerMode === 'edit' && activeAgent && (
              <div className="flex bg-gray-50 border border-gray-100 rounded-xl p-4 divide-x divide-gray-200 mb-2">
                <div className="flex-1 text-center">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Deliveries</p>
                  <p className="text-gray-900 font-bold text-lg">{activeAgent.deliveries}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Rating</p>
                  <p className="text-amber-500 font-bold text-lg inline-flex items-center"><Star className="w-4 h-4 fill-amber-500 mr-1" /> {activeAgent.rating}</p>
                </div>
              </div>
            )}

            {smsSent && drawerMode === 'add' && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm font-semibold flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Login credentials generated! SMS sent to {formData.phone}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Profile Photo</label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden hover:border-[#FC8019]/50 hover:bg-[#FC8019]/5 transition-all text-center">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-32 object-contain rounded-lg" />
                    <button 
                      type="button" 
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full shadow hover:bg-red-200 transition-colors z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 font-medium">Upload agent photo</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="e.g. Ramesh Kumar" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="+91 99999 00000" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="agent@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Vehicle Number</label>
                <input type="text" value={formData.vehicleNo} onChange={e => setFormData({...formData, vehicleNo: e.target.value})} required className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="MH-12-AB-3456" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Vehicle Type</label>
                <select value={formData.vehicleType} onChange={e => setFormData({...formData, vehicleType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]">
                  <option>Bike</option>
                  <option>Scooter</option>
                  <option>Bicycle</option>
                </select>
              </div>
            </div>

            {drawerMode === 'edit' && (
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl mt-4">
                <div>
                   <p className="text-sm font-semibold text-gray-900">Agent Account Status</p>
                   <p className="text-xs text-gray-500">Toggle to temporarily suspend access</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            )}

            {drawerMode === 'edit' && (
              <div className="pt-2">
                <button type="button" className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold transition-colors border border-transparent hover:border-red-100">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Agent Account
                </button>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100 flex gap-3">
              <button type="button" onClick={closeDrawer} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-[#FC8019] text-white font-semibold rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all">
                {drawerMode === 'add' ? 'Create Agent' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </Drawer>

      {/* Map Modal */}
      <Modal
        isOpen={!!mapAgent}
        onClose={() => setMapAgent(null)}
        title={mapAgent ? `Live Location: ${mapAgent.name}` : 'Live Location'}
        className="max-w-2xl"
      >
        {mapAgent && (
          <div className="space-y-4">
            <div className="w-full h-80 rounded-xl border border-gray-200 overflow-hidden bg-gray-100 relative">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src={`https://maps.google.com/maps?q=${mapAgent.coords}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
            <div className="flex justify-between items-center text-sm px-1">
              <span className="text-gray-500 flex items-center"><MapPin className="w-4 h-4 mr-1 text-[#FC8019]" /> Updated 2 mins ago</span>
              <span className="font-semibold text-gray-900">{getStatusBadge(mapAgent.status)}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
