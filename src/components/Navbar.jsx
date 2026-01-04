import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser, FiHome, FiBell } from 'react-icons/fi';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">LF</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Campus Lost & Found</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-primary-600">
              <FiHome className="w-5 h-5" />
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">
                  <FiBell className="w-5 h-5" />
                </Link>
                
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                  <FiUser className="w-5 h-5" />
                  <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                </Link>
                
                {user.email === 'admin@campus.edu' && (
                  <Link to="/admin" className="btn-primary text-sm">
                    Admin
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-secondary text-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;