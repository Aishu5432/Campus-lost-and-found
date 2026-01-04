import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiTag } from 'react-icons/fi';
import { formatDate } from '../utils/helpers';

const ItemCard = ({ item }) => {
  const statusColors = {
    lost: 'bg-red-100 text-red-800',
    found: 'bg-green-100 text-green-800',
    matched: 'bg-blue-100 text-blue-800',
    returned: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.category}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
          {item.status.toUpperCase()}
        </span>
      </div>

      <p className="text-gray-700 mb-4">{item.description}</p>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <FiMapPin className="w-4 h-4" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FiCalendar className="w-4 h-4" />
          <span>{formatDate(item.date)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FiTag className="w-4 h-4" />
          <span>ID: {item.id?.substring(0, 8)}</span>
        </div>
      </div>

      {item.confidenceScore && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Match Confidence</span>
            <span className="font-semibold">{item.confidenceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full" 
              style={{ width: `${item.confidenceScore}%` }}
            ></div>
          </div>
        </div>
      )}

      <Link 
        to={`/item/${item.id}`}
        className="block mt-4 text-center btn-primary"
      >
        View Details
      </Link>
    </div>
  );
};

export default ItemCard;