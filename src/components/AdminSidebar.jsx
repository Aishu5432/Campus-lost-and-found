import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiSettings,
  FiBarChart2,
  FiBell,
  FiShield
} from 'react-icons/fi';

const AdminSidebar = () => {
  const navItems = [
    { to: '/admin', icon: FiHome, label: 'Dashboard' },
    { to: '/admin/items', icon: FiPackage, label: 'All Items' },
    { to: '/admin/users', icon: FiUsers, label: 'Users' },
    { to: '/admin/matches', icon: FiBarChart2, label: 'Matches' },
    { to: '/admin/verification', icon: FiShield, label: 'Verification' },
    { to: '/admin/notifications', icon: FiBell, label: 'Notifications' },
    { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      
      <nav className="px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto p-6 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="font-bold">A</span>
          </div>
          <div>
            <p className="font-medium">Admin User</p>
            <p className="text-sm text-gray-400">admin@campus.edu</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;