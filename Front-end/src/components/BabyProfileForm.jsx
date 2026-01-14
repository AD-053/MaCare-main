import React, { useState } from 'react';
import { ChevronLeft, Camera, Baby } from 'lucide-react';

/**
 * BabyProfileForm Component - Shohay Pregnancy Style
 * Form to create or edit baby profile
 */
const BabyProfileForm = ({ onBack, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    gender: initialData?.gender || '',
    birthDate: initialData?.birthDate || '',
    deliveryType: initialData?.deliveryType || '',
    weight: initialData?.weight || '',
    bloodGroup: initialData?.bloodGroup || '',
    photo: initialData?.photo || null
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePhotoClick = () => {
    // Trigger file upload - UI only for now
    console.log('Photo upload clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">বেবি প্রোফাইল</h1>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Baby Avatar with Photo Upload */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Avatar Circle */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center overflow-hidden">
                {formData.photo ? (
                  <img src={formData.photo} alt="Baby" className="w-full h-full object-cover" />
                ) : (
                  <Baby className="w-16 h-16 text-blue-400" />
                )}
              </div>
              
              {/* Camera Button Overlay */}
              <button
                type="button"
                onClick={handlePhotoClick}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
            {/* Baby Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                শিশুর নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="শিশুর নাম লিখুন"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                লিঙ্গ <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white"
                required
              >
                <option value="">নির্বাচন করুন</option>
                <option value="male">ছেলে</option>
                <option value="female">মেয়ে</option>
              </select>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                জন্ম তারিখ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                প্রসবের ধরন <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.deliveryType}
                onChange={(e) => handleChange('deliveryType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white"
                required
              >
                <option value="">নির্বাচন করুন</option>
                <option value="normal">নরমাল ডেলিভারি</option>
                <option value="cesarean">সিজারিয়ান</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ওজন (কেজি) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="যেমন: 3.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                রক্তের গ্রুপ
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => handleChange('bloodGroup', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="">নির্বাচন করুন</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">টিপস</p>
              <p className="text-xs text-blue-700">
                সঠিক তথ্য প্রদান করুন যাতে আমরা আপনার শিশুর জন্য সঠিক পরামর্শ এবং টিকার সময়সূচী প্রদান করতে পারি।
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            সাবমিট
          </button>
        </form>
      </div>
    </div>
  );
};

export default BabyProfileForm;
