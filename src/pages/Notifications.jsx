import { useState } from 'react';
import { Send, Clock, User, Bell } from 'lucide-react';

const history = [
  { id: 1, title: 'Weekend Offer! 🚀', segment: 'All Users', sentTime: 'Today, 10:00 AM', status: 'Sent', success: '98%' },
  { id: 2, title: 'We Miss You!', segment: 'Inactive Users', sentTime: 'Yesterday, 02:30 PM', status: 'Sent', success: '95%' },
  { id: 3, title: 'Server Maintenance', segment: 'App Users', sentTime: 'May 12, 11:00 PM', status: 'Sent', success: '100%' },
];

export default function Notifications() {
  const [formData, setFormData] = useState({ title: '', body: '', segment: 'All Users' });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Push Notifications</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification Form */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-5">Compose Message</h2>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Target Segment</label>
              <select 
                value={formData.segment}
                onChange={e => setFormData({...formData, segment: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]"
              >
                <option>All Users</option>
                <option>New Users (Last 7 days)</option>
                <option>Inactive Users (30+ days)</option>
                <option>Specific Regions</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Notification Title</label>
              <input 
                type="text" 
                placeholder="e.g. 50% Off on Groceries!" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Message Body</label>
              <textarea 
                rows="4" 
                placeholder="Type your message here..."
                value={formData.body}
                onChange={e => setFormData({...formData, body: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019] resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full mt-2 flex justify-center items-center px-4 py-3 bg-[#FC8019] text-white rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all font-semibold text-sm"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Notification Now
            </button>
          </form>
        </div>

        {/* History Log */}
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100">
             <h2 className="text-lg font-bold text-gray-900 tracking-tight">Notification History</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
             <ul className="divide-y divide-gray-50">
               {history.map((log) => (
                 <li key={log.id} className="p-4 hover:bg-gray-50 rounded-xl transition-colors">
                   <div className="flex items-start">
                     <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0 mt-1">
                       <Bell className="w-5 h-5" />
                     </div>
                     <div className="ml-4 flex-1">
                       <h4 className="text-sm font-bold text-gray-900">{log.title}</h4>
                       <div className="flex items-center text-xs text-gray-500 mt-1.5 space-x-3">
                         <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1" />{log.segment}</span>
                         <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />{log.sentTime}</span>
                       </div>
                     </div>
                     <div className="text-right shrink-0">
                       <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">{log.status}</span>
                       <p className="text-xs text-gray-400 mt-1.5">{log.success} success rate</p>
                     </div>
                   </div>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
