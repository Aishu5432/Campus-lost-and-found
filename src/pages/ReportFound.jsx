import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiMapPin, FiTag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { db, storage } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { itemCategories, locations } from "../utils/constants";
const ReportFound = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    foundDate: new Date().toISOString().split('T')[0],
    pickupLocation: '',
    contactInfo: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to report a found item');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        const storageRef = ref(storage, `found-items/${user.uid}/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const itemData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        foundDate: new Date(formData.foundDate),
        pickupLocation: formData.pickupLocation,
        contactInfo: formData.contactInfo || user.email,
        imageUrl,
        status: 'found',
        userId: user.uid,
        userEmail: user.email,
        createdAt: new Date(),
        lastUpdated: new Date(),
        matchedWith: null,
        confidenceScore: 0,
      };

      const docRef = await addDoc(collection(db, 'items'), itemData);
      
      toast.success('Found item reported successfully! Thank you for your honesty.');
      navigate(`/item/${docRef.id}`);
    } catch (error) {
      console.error('Error reporting found item:', error);
      toast.error('Failed to report item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Report Found Item</h1>
        <p className="text-gray-600">Help return lost items to their owners</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Item Details */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Item Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Blue Backpack, Silver Watch"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Category</option>
                {itemCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field min-h-[100px]"
                placeholder="Describe the item in detail (color, brand, condition, contents if applicable)..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiMapPin className="inline w-4 h-4 mr-1" />
                Found Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiTag className="inline w-4 h-4 mr-1" />
                Found Date *
              </label>
              <input
                type="date"
                name="foundDate"
                value={formData.foundDate}
                onChange={handleChange}
                className="input-field"
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Item Image</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                  </div>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            <p className="text-sm text-gray-600">
              A clear photo helps the owner identify their item quickly.
            </p>
          </div>
        </div>

        {/* Return Information */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Return Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pickup Location *
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Library Front Desk, Dormitory Office"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                Where can the owner collect the item?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="input-field"
                placeholder={user?.email || "Your contact info"}
              />
              <p className="text-sm text-gray-600 mt-1">
                How should the owner contact you? (Defaults to your email)
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3 text-lg disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Reporting...
              </span>
            ) : (
              'Report Found Item'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportFound;