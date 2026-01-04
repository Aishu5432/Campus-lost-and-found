import React from 'react';
import { FiTrendingUp, FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi';

const StatsCard = ({ icon: Icon, title, value, change, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-600',
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    purple: 'bg-purple-600'
  };

  const trendColor = change >= 0 ? 'text-green-600' : 'text-red-600';
  const trendIcon = change >= 0 ? '↗' : '↘';

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]} text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center ${trendColor}`}>
            <span className="font-medium">{change >= 0 ? '+' : ''}{change}%</span>
            <span className="ml-1">{trendIcon}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

export default StatsCard;