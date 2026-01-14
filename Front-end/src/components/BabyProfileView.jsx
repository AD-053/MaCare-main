import React from 'react';
import { ChevronLeft, Baby, Trash2 } from 'lucide-react';

/**
 * BabyProfileView Component - Pop-up to display baby information
 * Shows baby details when clicking on a baby card
 */
const BabyProfileView = ({ baby, onBack, onDelete }) => {
  // Format date to Bengali
  const formatDateToBengali = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get gender text in Bengali
  const getGenderText = (gender) => {
    if (!gender) return '';
    const lowerGender = gender.toLowerCase();
    if (lowerGender === 'male' || gender === 'ছেলে') return 'ছেলে';
    if (lowerGender === 'female' || gender === 'মেয়ে') return 'মেয়ে';
    return gender;
  };

  // Get delivery type text in Bengali
  const getDeliveryTypeText = (deliveryType) => {
    if (!deliveryType) return '';
    const lowerType = deliveryType.toLowerCase();
    if (lowerType === 'normal') return 'নরমাল ডেলিভারি';
    if (lowerType === 'cesarean') return 'সিজারিয়ান';
    return deliveryType;
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

      {/* Baby Profile Content */}
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          {/* Baby Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center border-4 border-blue-200 overflow-hidden">
              {baby.photo ? (
                <img src={baby.photo} alt={baby.name} className="w-full h-full object-cover" />
              ) : (
                <Baby className="w-16 h-16 text-blue-400" />
              )}
            </div>
          </div>

          {/* Baby Information */}
          <div className="space-y-4">
            {/* Name */}
            <div className="border-b border-gray-100 pb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                শিশুর নাম
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {baby.name || 'নাম নেই'}
              </p>
            </div>

            {/* Gender */}
            <div className="border-b border-gray-100 pb-4">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                লিঙ্গ
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {getGenderText(baby.gender)}
              </p>
            </div>

            {/* Birth Date */}
            {baby.birthDate && (
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  জন্ম তারিখ
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDateToBengali(baby.birthDate)}
                </p>
              </div>
            )}

            {/* Delivery Type */}
            {baby.deliveryType && (
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  প্রসবের ধরন
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {getDeliveryTypeText(baby.deliveryType)}
                </p>
              </div>
            )}

            {/* Weight */}
            {baby.weight && (
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  ওজন
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {baby.weight} কেজি
                </p>
              </div>
            )}

            {/* Blood Group */}
            {baby.bloodGroup && (
              <div className="border-b border-gray-100 pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  রক্তের গ্রুপ
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {baby.bloodGroup}
                </p>
              </div>
            )}
          </div>

          {/* Delete Button */}
          <button
            onClick={async () => {
              if (window.confirm('আপনি কি নিশ্চিত যে এই শিশুর তথ্য মুছে ফেলতে চান?')) {
                try {
                  await onDelete();
                } catch (error) {
                  alert('শিশুর তথ্য মুছতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
                }
              }
            }}
            className="w-full py-3 border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            তথ্য মুছুন
          </button>

          {/* Additional Info Card */}
          <div className="bg-blue-50 rounded-xl p-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">টিকার সময়সূচী</p>
                <p className="text-xs text-blue-700">
                  আপনার শিশুর টিকার সময়সূচী দেখতে ভ্যাকসিন সেকশনে যান।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyProfileView;
