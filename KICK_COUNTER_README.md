# Kick Counter Feature - MaCare

A comprehensive fetal kick counter feature for tracking baby movements during pregnancy.

## Features Implemented

### ✅ Core Functionality
- **Manual kick counting** with large, accessible +/- buttons
- **Real-time session tracking** with automatic time recording
- **Session duration display** updated every second
- **Reset functionality** to clear current session
- **Complete button** to save session to history

### ✅ Session Tracking
- Automatically captures **First Kick Time** on first kick
- Updates **Last Kick Time** on every kick
- Calculates and displays **Session Duration** (minutes and seconds)
- Shows current **Date** based on system time
- Displays **Total Kicks** prominently

### ✅ Data Handling
- Backend API with MongoDB storage
- Session data includes:
  - `motherID` - Linked to logged-in user
  - `date` - Session date
  - `firstKickTime` - Timestamp of first kick
  - `lastKickTime` - Timestamp of last kick
  - `duration` - Total duration in seconds
  - `kickCount` - Total number of kicks
  - `pregnancyWeek` - Auto-calculated from LMP date
  - `notes` - Optional notes (can be extended)

### ✅ Previous Sessions Page
- View all completed sessions
- **Grouped by pregnancy week** with collapsible sections
- Sorted by **most recent first**
- Each session displays:
  - Date in Bengali format
  - First Kick Time
  - Last Kick Time
  - Duration (minutes and seconds)
  - Total Kicks
  - Pregnancy Week
- **Delete functionality** for individual sessions

### ✅ UI/UX Design
- **Pregnancy-friendly design** with soft pink and purple gradients
- **Large, readable numbers** for kick count (8xl font size)
- **Mobile-first responsive layout**
- **Clear visual separation** between active session and history
- **Bengali language support** for all labels
- **Smooth animations** and transitions
- **Loading states** and error handling

## File Structure

```
Back-end/
├── src/
│   ├── Models/
│   │   └── KickCounter.model.js          # MongoDB schema
│   ├── Controllers/
│   │   └── mother.controller.js          # API endpoints (updated)
│   └── Routes/
│       └── mother.Route.js               # Routes (updated)

Front-end/
├── src/
│   ├── components/
│   │   ├── KickCounter.jsx               # Main counter interface
│   │   └── KickCounterHistory.jsx        # Previous sessions view
│   └── pages/
│       └── MotherDashboard.jsx           # Integration (updated)
```

## API Endpoints

### POST `/api/v1/mother/kick-counter`
Save a new kick counter session

**Request Body:**
```json
{
  "firstKickTime": "2026-01-14T10:30:00.000Z",
  "lastKickTime": "2026-01-14T10:45:30.000Z",
  "kickCount": 12,
  "pregnancyWeek": 28,
  "notes": "Optional notes"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "data": {
    "_id": "...",
    "motherID": "...",
    "date": "2026-01-14T00:00:00.000Z",
    "firstKickTime": "2026-01-14T10:30:00.000Z",
    "lastKickTime": "2026-01-14T10:45:30.000Z",
    "duration": 930,
    "kickCount": 12,
    "pregnancyWeek": 28,
    "sessionCompleted": true,
    "createdAt": "...",
    "updatedAt": "..."
  },
  "message": "Kick counter session saved successfully"
}
```

### GET `/api/v1/mother/kick-counter`
Get all kick counter sessions for the logged-in mother

**Query Parameters:**
- `limit` (optional) - Number of sessions per page (default: 50)
- `page` (optional) - Page number (default: 1)
- `pregnancyWeek` (optional) - Filter by specific week

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "sessions": [...],
    "groupedSessions": {
      "28": [...],
      "27": [...]
    },
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 50,
      "totalPages": 1
    }
  },
  "message": "Kick counter sessions fetched successfully"
}
```

### DELETE `/api/v1/mother/kick-counter/:sessionId`
Delete a specific session

**Response:**
```json
{
  "statusCode": 200,
  "data": {},
  "message": "Kick counter session deleted successfully"
}
```

## Usage

### For Mothers

1. **Navigate to Mother Dashboard**
   - Click on "কিক কাউন্টার" tab

2. **Start a Session**
   - Click the **+** button when you feel a kick
   - The timer starts automatically with the first kick
   - Continue clicking **+** for each subsequent kick
   - Click **−** to remove a kick if counted accidentally

3. **Monitor Session**
   - View real-time kick count
   - See first kick time
   - See last kick time
   - Watch session duration update every second

4. **Complete Session**
   - Click **সম্পূর্ণ** (Complete) button to save
   - Session is stored with pregnancy week
   - Counter resets for a new session

5. **View History**
   - Scroll down to see "সেশন ইতিহাস" (Session History)
   - Sessions grouped by pregnancy week
   - Click week headers to expand/collapse
   - Review past sessions anytime
   - Delete old sessions if needed

### For Developers

#### Backend Setup
```bash
# No additional packages needed - uses existing Mongoose setup
# Model is already created and exported
```

#### Frontend Setup
```bash
# Components use standard React hooks
# No additional dependencies required
# Already integrated with MotherDashboard
```

## Technical Implementation

### State Management
- `kickCount` - Current number of kicks
- `isSessionActive` - Whether session is in progress
- `firstKickTime` - Date object for first kick
- `lastKickTime` - Date object for last kick
- `sessionDuration` - Calculated duration in seconds
- `isSaving` - Loading state for save operation

### Time Tracking Logic
```javascript
// Duration updates every second via setInterval
useEffect(() => {
  if (isSessionActive && firstKickTime) {
    intervalRef.current = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now - firstKickTime) / 1000);
      setSessionDuration(duration);
    }, 1000);
  }
  return () => clearInterval(intervalRef.current);
}, [isSessionActive, firstKickTime]);
```

### Pregnancy Week Calculation
```javascript
// Automatically calculated from maternal record LMP date
const maternalRecord = await MaternalRecord.findOne({ motherID });
if (maternalRecord?.pregnancy?.lmpDate) {
  const daysSinceLMP = Math.floor(
    (Date.now() - new Date(maternalRecord.pregnancy.lmpDate)) / 
    (1000 * 60 * 60 * 24)
  );
  week = Math.floor(daysSinceLMP / 7);
}
```

## Best Practices Followed

✅ **Clean, modular code** - Separated components and logic  
✅ **Reusable components** - Can be integrated elsewhere  
✅ **Backend-ready structure** - Full API integration  
✅ **Error handling** - Try-catch blocks and user feedback  
✅ **Loading states** - Visual feedback during operations  
✅ **Responsive design** - Mobile-first approach  
✅ **Accessible UI** - Large buttons, clear labels  
✅ **Bengali localization** - All UI text in Bengali  
✅ **Time accuracy** - Precise second-level tracking  
✅ **Data validation** - Input checks on backend  
✅ **Security** - JWT authentication required  

## Future Enhancements (Optional)

- 📊 Analytics dashboard showing kick patterns
- 📈 Graphs for kick frequency over time
- ⏰ Reminders to track kicks daily
- 🔔 Alerts if kicks are too infrequent
- 📝 Extended notes with voice recording
- 📤 Export sessions as PDF report
- 👨‍⚕️ Share sessions with doctor
- 🌙 Day/night kick pattern analysis

## Testing Checklist

- [x] Backend model created and exported
- [x] Backend routes registered
- [x] API endpoints working (POST, GET, DELETE)
- [x] Frontend components created
- [x] Components integrated in dashboard
- [x] Add kick button increments count
- [x] Remove kick button decrements count
- [x] First kick starts timer
- [x] Session duration updates every second
- [x] Reset button clears session
- [x] Complete button saves to backend
- [x] History displays grouped sessions
- [x] Delete session works
- [x] Pregnancy week auto-calculates
- [x] Error handling displays messages
- [x] Loading states show during operations
- [x] Mobile responsive design
- [x] Bengali text displays correctly

## Support

For issues or questions about the Kick Counter feature, check:
1. Console logs for error messages
2. Network tab for API responses
3. Backend logs for server errors
4. Authentication token validity

---

**Built with ❤️ for MaCare - Maternal Care Platform**
