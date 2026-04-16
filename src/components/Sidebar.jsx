import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Package, Truck, 
  Users, Tag, BarChart2, Bell, Settings, Store
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/orders', label: 'Orders', icon: ShoppingBag },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/delivery-agents', label: 'Delivery Agents', icon: Truck },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/promo-codes', label: 'Promo Codes', icon: Tag },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isCollapsed }) {
  return (
    <aside 
      className={twMerge(
        "bg-[#1C1C2E] text-[#A0A3B1] flex flex-col transition-all duration-300 z-10 shrink-0",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 flex items-center justify-center border-b border-white/5">
        <Store className="text-[#FC8019] w-8 h-8 shrink-0" />
        {!isCollapsed && <span className="ml-3 text-white font-bold text-xl tracking-wide shrink-0">SwiggyOps</span>}
      </div>

      <nav className="flex-1 py-6 overflow-y-auto space-y-1 px-3 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => twMerge(
              "flex items-center px-3 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-[#FC8019] text-white shadow-lg shadow-[#FC8019]/25" 
                : "hover:bg-[#2A2A42] hover:text-white"
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" strokeWidth={2} />
            {!isCollapsed && (
              <span className="ml-3 font-medium whitespace-nowrap overflow-hidden transition-all">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className={twMerge(
          "flex items-center",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FC8019] to-amber-500 flex items-center justify-center text-white shrink-0">
            <span className="font-bold text-sm">A</span>
          </div>
          {!isCollapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-[#A0A3B1] truncate">Superadmin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
