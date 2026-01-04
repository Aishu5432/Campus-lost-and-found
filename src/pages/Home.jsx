import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUpload, FiShield, FiBarChart } from 'react-icons/fi';
import FeatureCard from '../components/FeatureCard';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FiSearch,
      title: 'Smart Matching',
      description: 'AI-powered matching between lost and found items for accurate recovery.',
      color: 'primary'
    },
    {
      icon: FiUpload,
      title: 'Easy Reporting',
      description: 'Simple forms to report lost or found items with photo upload.',
      color: 'green'
    },
    {
      icon: FiShield,
      title: 'Secure Verification',
      description: 'Private knowledge-based verification to ensure rightful ownership.',
      color: 'purple'
    },
    {
      icon: FiBarChart,
      title: 'Real-time Tracking',
      description: 'Track your item status and get notifications on matches.',
      color: 'blue'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find What You've Lost,
          <span className="text-primary-600"> Return What You've Found</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A smart campus platform connecting lost items with their owners using AI matching and secure verification.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={user ? "/report-lost" : "/login"} 
            className="btn-primary text-lg px-8 py-3"
          >
            Report Lost Item
          </Link>
          <Link 
            to={user ? "/report-found" : "/login"} 
            className="btn-secondary text-lg px-8 py-3"
          >
            Report Found Item
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">System Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard 
            icon={FiSearch}
            title="Items Recovered"
            value="1,234"
            change={12}
            color="primary"
          />
          <StatsCard 
            icon={FiShield}
            title="Successful Matches"
            value="89%"
            change={5}
            color="green"
          />
          <StatsCard 
            icon={FiUpload}
            title="Active Reports"
            value="156"
            change={-2}
            color="blue"
          />
          <StatsCard 
            icon={FiBarChart}
            title="User Satisfaction"
            value="96%"
            change={3}
            color="purple"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our System?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white rounded-2xl p-8 text-center my-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Lost Item?</h2>
        <p className="text-xl mb-6">
          Join thousands of students who have successfully recovered their belongings.
        </p>
        <Link 
          to={user ? "/dashboard" : "/register"} 
          className="inline-block bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {user ? 'Go to Dashboard' : 'Get Started Free'}
        </Link>
      </section>
    </div>
  );
};

export default Home;