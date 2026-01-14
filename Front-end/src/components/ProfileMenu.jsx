import React from 'react';
import { ChevronRight, Baby, Heart, Plus } from 'lucide-react';

/**
 * ProfileMenu Component - Shohay Pregnancy Style
 * Main profile/menu page showing user account and all profiles
 */
const ProfileMenu = ({ user, onNavigateToProfile, onCreateBaby, dashboardData, maternalRecord }) => {
  // Calculate pregnancy info from real data
  const getPregnancyInfo = () => {
    if (maternalRecord?.pregnancy?.edd) {
      const edd = new Date(maternalRecord.pregnancy.edd);
      const eddFormatted = edd.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return {
        edd: eddFormatted,
        hasPregnancy: true
      };
    }
    
    return {
      edd: null,
      hasPregnancy: false
    };
  };

  // Calculate baby age in Bengali
  const calculateBabyAge = (birthDate) => {
    if (!birthDate) return '';
    
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now - birth);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Convert numbers to Bengali
    const toBengaliNumber = (num) => {
      const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(num).split('').map(digit => bengaliDigits[parseInt(digit)]).join('');
    };
    
    if (diffDays === 0) {
      return 'আজ জন্ম';
    } else if (diffDays === 1) {
      return 'বয়স: ১ দিন';
    } else if (diffDays < 30) {
      return `বয়স: ${toBengaliNumber(diffDays)} দিন`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? 'বয়স: ১ মাস' : `বয়স: ${toBengaliNumber(months)} মাস`;
    } else {
      const years = Math.floor(diffDays / 365);
      return years === 1 ? 'বয়স: ১ বছর' : `বয়স: ${toBengaliNumber(years)} বছর`;
    }
  };

  // Get baby profiles from backend
  const babyProfiles = dashboardData?.children?.map(childRecord => ({
    id: childRecord._id,
    name: childRecord.child?.name,
    age: calculateBabyAge(childRecord.child?.dob),
    gender: childRecord.child?.gender,
    birthDate: childRecord.child?.dob,
    deliveryType: childRecord.child?.deliveryType,
    weight: childRecord.child?.weight,
    bloodGroup: childRecord.child?.bloodGroup
  })) || [];

  const pregnancyInfo = getPregnancyInfo();

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Pregnancy Calculator Card - Top Priority */}
      <div className="px-4 mt-6 mb-4">
        <button
          onClick={() => onNavigateToProfile('calculator')}
          className="w-full bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            {/* Fetus Icon */}
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-12 h-12 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <circle cx="50" cy="40" r="20" fill="currentColor" opacity="0.5" />
                  <ellipse cx="50" cy="65" rx="15" ry="25" fill="currentColor" opacity="0.5" />
                  <circle cx="50" cy="40" r="15" fill="currentColor" />
                </svg>
              </div>
            </div>
            
            {/* Text */}
            <div className="text-left">
              <h4 className="text-lg font-bold text-white">গর্ভাবস্থার হিসাব করুন</h4>
              <p className="text-sm text-white/90">সম্ভাব্য ডেলিভারির তারিখ যোগ করুন</p>
            </div>
          </div>
          
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* My Account Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 mx-4 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {user?.FullName?.charAt(0) || 'ম'}
            </div>
            
            {/* User Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {user?.FullName || 'রহিমা খাতুন'}
              </h2>
              <p className="text-sm text-gray-500 mb-1">ফ্রি ব্যবহারকারী</p>
              <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
                সাবস্ক্রিপশন কিনুন
              </button>
            </div>
          </div>
          
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* My Profiles Section */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">আমার প্রোফাইল</h3>
        
        <div className="space-y-3">
          {/* Pregnancy Profile - Only show if pregnancy data exists */}
          {pregnancyInfo.hasPregnancy && (
            <button
              onClick={() => onNavigateToProfile('pregnancy')}
              className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Fetus Icon */}
                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center">
                  <div className="w-10 h-10 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500">
                      <circle cx="50" cy="40" r="20" fill="currentColor" opacity="0.3" />
                      <ellipse cx="50" cy="65" rx="15" ry="25" fill="currentColor" opacity="0.3" />
                      <circle cx="50" cy="40" r="15" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                
                {/* Text */}
                <div className="text-left">
                  <h4 className="text-base font-semibold text-gray-900">অনাগত সন্তান</h4>
                  <p className="text-sm text-gray-500">সম্ভাব্য ডেলিভারি: {pregnancyInfo.edd}</p>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          )}

          {/* No Pregnancy Message */}
          {!pregnancyInfo.hasPregnancy && babyProfiles.length === 0 && (
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-10 h-10 text-blue-500">
                  <circle cx="50" cy="40" r="20" fill="currentColor" opacity="0.3" />
                  <ellipse cx="50" cy="65" rx="15" ry="25" fill="currentColor" opacity="0.3" />
                  <circle cx="50" cy="40" r="15" fill="currentColor" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                আপনার গর্ভাবস্থার তথ্য এখনও যোগ করা হয়নি
              </p>
              <p className="text-xs text-gray-500">
                উপরের কার্ডে ক্লিক করে গর্ভাবস্থার হিসাব শুরু করুন
              </p>
            </div>
          )}

          {/* Baby Profiles */}
          {babyProfiles.map((baby) => (
            <button
              key={baby.id}
              onClick={() => onNavigateToProfile('baby', baby)}
              className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Baby Icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-white">
                    <circle cx="50" cy="40" r="20" fill="currentColor" opacity="0.5" />
                    <ellipse cx="50" cy="65" rx="15" ry="25" fill="currentColor" opacity="0.5" />
                    <circle cx="50" cy="40" r="15" fill="currentColor" />
                  </svg>
                </div>
                
                {/* Text */}
                <div className="text-left">
                  <h4 className="text-base font-semibold text-gray-900">{baby.name}</h4>
                  <p className="text-sm text-gray-500">{baby.age}</p>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}

          {/* Add Birth Info Card */}
          <button
            onClick={() => onCreateBaby()}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow border-2 border-dashed border-gray-200"
          >
            <div className="flex items-center gap-4">
              {/* Plus Icon */}
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                <Plus className="w-8 h-8 text-green-500" />
              </div>
              
              {/* Text */}
              <div className="text-left">
                <h4 className="text-base font-semibold text-gray-900">জন্মের তথ্য দিন</h4>
                <p className="text-sm text-gray-500">নতুন শিশুর প্রোফাইল যোগ করুন</p>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Additional Menu Items */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">সেটিংস</h3>
        
        <div className="space-y-3">
          {/* Personal Info */}
          <button
            onClick={() => onNavigateToProfile('personal')}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              <div className="text-left">
                <h4 className="text-base font-semibold text-gray-900">ব্যক্তিগত তথ্য</h4>
                <p className="text-sm text-gray-500">নাম, ইমেইল, ফোন নম্বর</p>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Healthcare Providers */}
          <button
            onClick={() => onNavigateToProfile('healthcare')}
            className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                <Heart className="w-8 h-8 text-blue-500" />
              </div>
              
              <div className="text-left">
                <h4 className="text-base font-semibold text-gray-900">স্বাস্থ্যসেবা প্রদানকারী</h4>
                <p className="text-sm text-gray-500">ডাক্তার এবং মিডওয়াইফ</p>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
