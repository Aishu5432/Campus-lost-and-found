import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Campus Lost & Found</h3>
            <p className="text-gray-300">
              A smart platform for reporting and finding lost items on campus with AI-powered matching.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/report-lost" className="text-gray-300 hover:text-white">Report Lost</Link></li>
              <li><Link to="/report-found" className="text-gray-300 hover:text-white">Report Found</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiMail className="w-5 h-5" />
                <span>lostfound@campus.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="w-5 h-5" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiGithub className="w-5 h-5" />
                <a href="#" className="text-gray-300 hover:text-white">GitHub Repository</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Campus Lost & Found System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;