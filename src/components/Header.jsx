import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FC8019]" />
          <input 
            type="text"
            placeholder="Search orders, products, or customers..."
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019] focus:bg-white transition-all transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-5 ml-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="w-px h-6 bg-gray-200"></div>

        {/* Profile Dropdown (Visual Only) */}
        <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none group">
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=f4f6f9" 
            alt="Admin" 
            className="w-8 h-8 rounded-full border border-gray-200"
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium leading-none mb-1">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        </button>
      </div>

    </header>
  );
}
