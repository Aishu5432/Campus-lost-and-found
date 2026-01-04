import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiEdit2, FiSave } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    studentId: '',
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfile(userData);
        setFormData({
          name: userData.name || '',
          phone: userData.phone || '',
          studentId: userData.studentId || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ...formData,
        updatedAt: new Date(),
      });
      
      setProfile(prev => ({ ...prev, ...formData }));
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your account information and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
              >
                {editing ? (
                  <>
                    <FiSave className="w-4 h-4" />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <FiEdit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </div>

            {editing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="input-field"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                      className="input-field"
                      placeholder="S12345678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="input-field bg-gray-50"
                      readOnly
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-6 py-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 text-primary-600 rounded-lg">
                      <FiUser className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium">{profile?.name || 'Not set'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <FiPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium">{profile?.phone || 'Not set'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <FiCalendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Student ID</p>
                      <p className="font-medium">{profile?.studentId || 'Not set'}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-sm text-gray-600">
                        {profile?.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Role</p>
                      <p className="text-sm text-gray-600 capitalize">{profile?.role || 'Student'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Card */}
          <div className="card mt-6">
            <h2 className="text-xl font-semibold mb-6">Your Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{profile?.itemsReported || 0}</p>
                <p className="text-sm text-gray-600">Items Reported</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{profile?.itemsFound || 0}</p>
                <p className="text-sm text-gray-600">Items Found</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{profile?.itemsMatched || 0}</p>
                <p className="text-sm text-gray-600">Items Matched</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{profile?.itemsReturned || 0}</p>
                <p className="text-sm text-gray-600">Items Returned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Account Settings */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-600">Update your account password</p>
              </button>
              
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <p className="font-medium">Notification Settings</p>
                <p className="text-sm text-gray-600">Manage email and push notifications</p>
              </button>
              
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <p className="font-medium">Privacy Settings</p>
                <p className="text-sm text-gray-600">Control your privacy and data</p>
              </button>
            </div>
          </div>

          {/* Verification Status */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Verification Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Email Verification</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                  Verified
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Student ID Verification</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  profile?.studentId 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {profile?.studentId ? 'Pending' : 'Not Set'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Phone Verification</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  profile?.phone 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {profile?.phone ? 'Pending' : 'Not Set'}
                </span>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="card bg-blue-50 border-blue-200">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Need Help?</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-medium text-blue-800">FAQs & Help Center</p>
              </button>
              
              <button className="w-full text-left p-3 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-medium text-blue-800">Contact Support</p>
              </button>
              
              <button className="w-full text-left p-3 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-medium text-blue-800">Report an Issue</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;