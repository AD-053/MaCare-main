import React from 'react';
import { ChevronLeft, FileText, Trash2 } from 'lucide-react';

/**
 * PregnancyProfileView Component - Shohay Pregnancy Style
 * View pregnancy profile with action buttons
 */
const PregnancyProfileView = ({ onBack, pregnancyData, dashboardData, maternalRecord, onDelete }) => {
  // Calculate pregnancy week from LMP if available
  const calculatePregnancyWeek = () => {
    if (maternalRecord?.pregnancy?.lmpDate) {
      const lmpDate = new Date(maternalRecord.pregnancy.lmpDate);
      const today = new Date();
      const diffTime = Math.abs(today - lmpDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.floor(diffDays / 7);
    }
    return dashboardData?.pregnancyWeek || 0;
  };

  const pregnancyWeek = calculatePregnancyWeek();
  const edd = maternalRecord?.pregnancy?.edd 
    ? new Date(maternalRecord.pregnancy.edd).toLocaleDateString('bn-BD', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'নির্ধারণ করা হয়নি';

  const lmpDate = maternalRecord?.pregnancy?.lmpDate
    ? new Date(maternalRecord.pregnancy.lmpDate).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'নির্ধারণ করা হয়নি';

  const handleAddReport = () => {
    console.log('Add report clicked');
    // Navigate to report upload page
  };

  const handleViewReports = () => {
    console.log('View reports clicked');
    // Navigate to reports list page
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি এই গর্ভাবস্থার প্রোফাইল মুছে ফেলতে চান? এই তথ্য পুনরুদ্ধার করা যাবে না।')) {
      try {
        // Call the delete function passed from parent
        if (onDelete) {
          await onDelete();
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('প্রোফাইল মুছতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center gap-4 p-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">গর্ভাবস্থার প্রোফাইল</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Circular Fetus Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center shadow-lg">
              <div className="w-24 h-24 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500">
                  <circle cx="50" cy="40" r="20" fill="currentColor" opacity="0.3" />
                  <ellipse cx="50" cy="65" rx="15" ry="25" fill="currentColor" opacity="0.3" />
                  <circle cx="50" cy="40" r="15" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">অনাগত সন্তান</h2>
            <p className="text-sm text-gray-500 mb-4">লিঙ্গ: নির্ধারণ করা হয়নি</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Pregnancy Week */}
            <div className="bg-pink-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">গর্ভাবস্থার সপ্তাহ</p>
              <p className="text-3xl font-bold text-pink-600">{pregnancyWeek}</p>
              <p className="text-xs text-gray-500 mt-1">সপ্তাহ</p>
            </div>

            {/* Days Remaining */}
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600 mb-1">বাকি সময়</p>
              <p className="text-3xl font-bold text-blue-600">{40 - pregnancyWeek > 0 ? 40 - pregnancyWeek : 0}</p>
              <p className="text-xs text-gray-500 mt-1">সপ্তাহ</p>
            </div>
          </div>

          {/* Delivery Date Info */}
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-5 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">সম্ভাব্য ডেলিভারি তারিখ</p>
                <p className="text-xl font-bold">{edd}</p>
              </div>
              <svg className="w-12 h-12 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* LMP Date */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">শেষ মাসিকের তারিখ (LMP)</span>
              <span className="font-semibold text-gray-900">{lmpDate}</span>
            </div>
          </div>
        </div>

        {/* Action Rows */}
        <div className="space-y-3">
          {/* Add Report */}
          <button
            onClick={handleAddReport}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="text-base font-semibold text-gray-900">রিপোর্ট যোগ করুন</h4>
                <p className="text-sm text-gray-500">আল্ট্রাসাউন্ড বা অন্যান্য রিপোর্ট</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* View Reports */}
          <button
            onClick={handleViewReports}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="text-base font-semibold text-gray-900">সকল রিপোর্ট দেখুন</h4>
                <p className="text-sm text-gray-500">সংরক্ষিত মেডিকেল রিপোর্ট</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Bottom Action Buttons */}
        <div className="space-y-3 pt-4">
          {/* View Reports Button */}
          <button
            onClick={handleViewReports}
            className="w-full bg-white border-2 border-primary-500 text-primary-600 font-semibold py-4 rounded-xl hover:bg-primary-50 transition-colors"
          >
            রিপোর্ট দেখুন
          </button>

          {/* Delete Profile Button */}
          <button
            onClick={handleDeleteProfile}
            className="w-full bg-white border-2 border-red-500 text-red-600 font-semibold py-4 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            প্রোফাইল মুছুন
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-yellow-50 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-yellow-800 font-medium mb-1">মনে রাখবেন</p>
            <p className="text-xs text-yellow-700">
              নিয়মিত চেকআপ করান এবং ডাক্তারের পরামর্শ মেনে চলুন। জরুরি অবস্থায় তাৎক্ষণিক চিকিৎসকের পরামর্শ নিন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyProfileView;
