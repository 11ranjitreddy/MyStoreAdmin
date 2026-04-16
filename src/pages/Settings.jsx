import { Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Platform Settings</h1>
        <button className="flex items-center px-4 py-2 bg-[#FC8019] text-white rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all font-semibold text-sm">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* App Configuration */}
        <section className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-5 border-b border-gray-100 pb-4">General Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Platform Name</label>
              <input type="text" defaultValue="SwiggyOps Admin" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Support Email</label>
              <input type="email" defaultValue="support@groceryapp.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Minimum Order Value (₹)</label>
              <input type="number" defaultValue="150" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Default Delivery Radius (km)</label>
              <input type="number" defaultValue="5" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" />
            </div>
          </div>
        </section>

        {/* Admin Profile */}
        <section className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-5 border-b border-gray-100 pb-4">Admin Profile</h2>
          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=f4f6f9" className="w-20 h-20 rounded-full border border-gray-200 shadow-sm" alt="Admin Avatar" />
              <button className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-full p-1.5 shadow hover:text-[#FC8019] text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </button>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Superadmin Access</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Full Name</label>
              <input type="text" defaultValue="Admin User" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
              <input type="email" defaultValue="admin@groceryapp.com" disabled className="w-full bg-gray-100 text-gray-500 border border-gray-200 rounded-xl py-2.5 px-4 text-sm cursor-not-allowed" />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Security</h3>
            <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold text-sm transition-colors">
              Change Password
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
