import React, { useState } from 'react';

/**
 * PregnancyCalculator Component - Shohay Pregnancy Style
 * Calculate pregnancy based on EDD or LMP date
 */
const PregnancyCalculator = ({ onBack, onSubmit }) => {
  const [step, setStep] = useState(1); // 1: Welcome, 2: Date Input
  const [calculationMethod, setCalculationMethod] = useState('edd'); // 'edd' or 'lmp'
  const [selectedDate, setSelectedDate] = useState('');
  const [dontKnow, setDontKnow] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (dontKnow) {
      // Skip and go back
      onBack();
      return;
    }

    if (selectedDate) {
      onSubmit({
        method: calculationMethod,
        date: selectedDate
      });
    }
  };

  const handleDontKnow = () => {
    setDontKnow(!dontKnow);
    if (!dontKnow) {
      setSelectedDate('');
    }
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
            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">গর্ভাবস্থার হিসাব</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {step === 1 && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              {/* Fetus Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                  <div className="w-24 h-24 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-pink-500">
                      <circle cx="50" cy="40" r="20" fill="currentColor" opacity="0.3" />
                      <ellipse cx="50" cy="65" rx="15" ry="25" fill="currentColor" opacity="0.3" />
                      <circle cx="50" cy="40" r="15" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">স্বাগতম!</h2>
              <p className="text-gray-600 mb-6">
                যখন যে তথ্য জানা প্রয়োজন তা পেতে আপনার ডেলিভারির সম্ভাব্য তারিখ দিন।
              </p>

              {/* Method Selection */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => setCalculationMethod('edd')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    calculationMethod === 'edd'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">সম্ভাব্য ডেলিভারির তারিখ জানি</p>
                    <p className="text-sm text-gray-600">আপনার ডাক্তার দ্বারা প্রদত্ত EDD</p>
                  </div>
                </button>

                <button
                  onClick={() => setCalculationMethod('lmp')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    calculationMethod === 'lmp'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">শেষ মাসিকের তারিখ জানি</p>
                    <p className="text-sm text-gray-600">LMP থেকে গণনা করা হবে</p>
                  </div>
                </button>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                পরবর্তী ধাপ
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Date Input Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="mb-6">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                    <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {calculationMethod === 'edd' ? 'ডেলিভারির সম্ভাব্য তারিখ' : 'শেষ মাসিকের তারিখ'}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  {calculationMethod === 'edd' 
                    ? 'আপনার ডাক্তার দ্বারা প্রদত্ত সম্ভাব্য ডেলিভারির তারিখ লিখুন'
                    : 'আপনার শেষ মাসিকের প্রথম দিনের তারিখ লিখুন'
                  }
                </p>

                {/* Date Input */}
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setDontKnow(false);
                    }}
                    disabled={dontKnow}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-center text-lg font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="সিলেক্ট করুন"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Don't Know Option */}
              <div className="mb-6">
                <button
                  onClick={handleDontKnow}
                  className="w-full text-center text-primary-600 hover:text-primary-700 font-medium py-2 underline"
                >
                  আমি ডেলিভারির সম্ভাব্য তারিখ জানি না
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!selectedDate && !dontKnow}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                পরবর্তী ধাপ
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">টিপস</p>
                <p className="text-xs text-blue-700">
                  {calculationMethod === 'edd'
                    ? 'সম্ভাব্য ডেলিভারির তারিখ (EDD) সাধারণত আপনার ডাক্তার আল্ট্রাসাউন্ডের ভিত্তিতে প্রদান করেন।'
                    : 'শেষ মাসিকের প্রথম দিন থেকে ২৮০ দিন (৪০ সপ্তাহ) যোগ করে সম্ভাব্য ডেলিভারির তারিখ গণনা করা হয়।'
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PregnancyCalculator;
