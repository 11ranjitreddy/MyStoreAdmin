import { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

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

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none group"
          >
            <img 
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin&backgroundColor=f4f6f9" 
              alt="Admin" 
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium leading-none mb-1">Admin</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 origin-top-right transform transition-all z-50">
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm text-gray-900 font-bold">Admin User</p>
                <p className="text-xs text-gray-500 font-medium truncate">admin@groceryapp.com</p>
              </div>
              
              <div className="py-1">
                <button onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FC8019] transition-colors">
                  <User className="w-4 h-4 mr-3" />
                  My Profile
                </button>
                <button onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#FC8019] transition-colors">
                  <SettingsIcon className="w-4 h-4 mr-3" />
                  Settings
                </button>
              </div>
              
              <div className="border-t border-gray-50 py-1">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
