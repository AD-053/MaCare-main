import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Activity, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const KickCounterHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [groupedSessions, setGroupedSessions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [error, setError] = useState(null);

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('accessToken');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${API_BASE_URL}/mother/kick-counter`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setSessions(data.data.sessions);
        setGroupedSessions(data.data.groupedSessions);
        
        // Expand the most recent week by default
        const weeks = Object.keys(data.data.groupedSessions);
        if (weeks.length > 0) {
          const latestWeek = Math.max(...weeks.map(Number));
          setExpandedWeeks({ [latestWeek]: true });
        }
      } else {
        throw new Error(data.message || 'সেশন লোড করতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!confirm('এই সেশনটি মুছে ফেলতে চান?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${API_BASE_URL}/mother/kick-counter/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Refresh the list
        fetchSessions();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'সেশন মুছতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('সেশন মুছতে ত্রুটি: ' + error.message);
    }
  };

  const toggleWeek = (week) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [week]: !prev[week]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} মিনিট ${secs} সেকেন্ড`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-800">ত্রুটি: {error}</p>
        <button
          onClick={fetchSessions}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">এখনও কোনো সেশন রেকর্ড করা হয়নি</p>
        <p className="text-gray-500 text-sm mt-2">কিক কাউন্টার ব্যবহার করে আপনার প্রথম সেশন শুরু করুন</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">সেশন ইতিহাস</h2>
          <p className="text-gray-600 mt-1">মোট {sessions.length}টি সেশন রেকর্ড করা হয়েছে</p>
        </div>
        <button
          onClick={fetchSessions}
          className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
        >
          রিফ্রেশ করুন
        </button>
      </div>

      {/* Grouped Sessions by Pregnancy Week */}
      {Object.keys(groupedSessions)
        .sort((a, b) => Number(b) - Number(a)) // Sort weeks descending
        .map((week) => (
          <div key={week} className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Week Header */}
            <button
              onClick={() => toggleWeek(week)}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-between hover:from-pink-200 hover:to-purple-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {week}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">
                    গর্ভাবস্থার {week} সপ্তাহ
                  </h3>
                  <p className="text-sm text-gray-600">
                    {groupedSessions[week].length}টি সেশন
                  </p>
                </div>
              </div>
              {expandedWeeks[week] ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Week Sessions */}
            {expandedWeeks[week] && (
              <div className="divide-y divide-gray-100">
                {groupedSessions[week].map((session) => (
                  <div
                    key={session._id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-pink-500" />
                          <span className="font-semibold">{formatDate(session.date)}</span>
                        </div>

                        {/* Session Details Grid */}
                        <div className="grid grid-cols-2 gap-4 pl-6">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">প্রথম লাথি</p>
                            <p className="text-sm font-mono text-gray-800">
                              {formatTime(session.firstKickTime)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">শেষ লাথি</p>
                            <p className="text-sm font-mono text-gray-800">
                              {formatTime(session.lastKickTime)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">সময়কাল</p>
                            <p className="text-sm font-semibold text-purple-700">
                              {formatDuration(session.duration)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">মোট লাথি</p>
                            <p className="text-2xl font-bold text-pink-600">
                              {session.kickCount}
                            </p>
                          </div>
                        </div>

                        {/* Notes if any */}
                        {session.notes && (
                          <div className="pl-6 mt-2">
                            <p className="text-xs text-gray-500 mb-1">নোট</p>
                            <p className="text-sm text-gray-700 italic">{session.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteSession(session._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="সেশন মুছুন"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default KickCounterHistory;
