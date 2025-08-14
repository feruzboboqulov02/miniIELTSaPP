# 🎓 IELTS Mock Test Platform

A full-stack web application that simulates an IELTS multiple-choice test with real-time timer, automatic scoring, and admin panel for question management.

## 🌟 Features

- **10-minute timed test** with automatic submission
- **Real-time countdown timer** with visual warnings
- **Random question order** for each test session
- **Instant scoring** with detailed breakdown
- **Admin panel** for adding/editing/deleting questions
- **Responsive design** that works on desktop and mobile
- **Clean, modern UI** built with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local installation or MongoDB Atlas)

### 1. Clone and Setup Backend
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
# Copy .env.example to .env and configure:
MONGO_URI=mongodb://127.0.0.1:27017/ielts_mock
PORT=4000

# Start backend server
npm run dev
```
Backend will run on: `http://localhost:4000`

### 2. Setup Frontend
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```
Frontend will run on: `http://localhost:5173`

## 📚 How to Use

### For Students (Taking the Test)

1. **Visit** `http://localhost:5173`
2. **Start the test** - Questions will load automatically
3. **Answer questions** by selecting radio buttons
4. **Watch the timer** - You have 10 minutes total
5. **Submit early** or let it auto-submit when time expires
6. **View results** with your score and breakdown
7. **Retake test** as many times as you want

### For Teachers/Admins (Managing Questions)

1. **Visit** `http://localhost:5173/admin` or click "Admin Panel" from results
2. **Add new questions:**
   - Click "Add Question" button
   - Enter question text
   - Fill in 4 options
   - Mark the correct answer by selecting its radio button
   - Click "Add Question"
3. **Delete questions** using the "Delete" button on each question
4. **Return to test** anytime using "Back to Test" button

## 🎯 Test Flow

```
Start Test → Answer Questions → Timer Countdown → Submit → View Results → Retake/Admin
     ↓              ↓              ↓           ↓         ↓           ↓
Load questions → Select answers → Auto-submit → Score → Breakdown → Manage
```

## 📱 Screenshots & UI

### Test Interface
- Clean question cards with radio button options
- Real-time timer in the top right
- Progress indicator showing answered questions
- Submit button that changes color when all questions answered

### Results Page
- Large percentage score display
- Color-coded performance badge (Excellent/Good/Keep Practicing)
- Detailed question-by-question breakdown
- Options to retake test or go to admin panel

### Admin Panel
- List of all questions with correct answers highlighted
- Form to add new questions with 4 options
- One-click delete functionality
- Clean, organized layout

## 🔧 Technical Details

### Backend API Endpoints
- `GET /api/test` - Get randomized questions (no correct answers shown)
- `POST /api/test/submit` - Submit answers and get results
- `GET /api/questions` - Get all questions (admin)
- `POST /api/questions` - Add new question (admin)
- `DELETE /api/questions/:id` - Delete question (admin)

### Frontend Tech Stack
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for responsive, utility-first styling
- **Axios** for API communication
- **JavaScript** (ES6+) for simplicity

### Key Features Implementation
- **Timer:** Uses `setInterval` with cleanup, auto-submits on timeout
- **State Management:** React hooks for questions, answers, and UI state
- **API Integration:** Centralized API service with error handling
- **Responsive Design:** Mobile-first Tailwind classes
- **Loading States:** Proper loading spinners and error messages

## 🛠 Development Commands

### Backend
```bash
npm run dev    # Start with auto-reload
npm start      # Start production mode
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 📋 Sample Question Format

When adding questions through the admin panel or API:

```json
{
  "text": "Which word is a noun?",
  "options": [
    { "text": "quickly", "isCorrect": false },
    { "text": "beautiful", "isCorrect": false },
    { "text": "happiness", "isCorrect": true },
    { "text": "run", "isCorrect": false }
  ]
}
```

## 🔍 Testing the Application

### 1. Test with Sample Data
First, add some questions through the admin panel or using an API tool like Postman.

### 2. Take a Mock Test
- Go to the main page
- Answer some questions
- Watch the timer count down
- Submit and check your results

### 3. Admin Functions
- Add new questions with 4 options
- Delete existing questions
- Verify questions appear in new tests

## 🚨 Troubleshooting

### Backend Issues
- **MongoDB Connection:** Make sure MongoDB is running and connection string is correct
- **Port Conflicts:** Change PORT in .env if 4000 is occupied
- **CORS Errors:** Backend includes CORS middleware for frontend communication

### Frontend Issues
- **Tailwind CSS:** If styles don't load, try the CommonJS PostCSS config
- **API Errors:** Check that backend is running on port 4000
- **Timer Issues:** Timer resets on page refresh (expected behavior)

### Common Error Solutions
- **Module not found:** Run `npm install` in the correct directory
- **Connection refused:** Ensure backend is running first
- **Tailwind not working:** Try different PostCSS configuration options provided

## 🎯 Usage Tips

### For Best Testing Experience
- Use fullscreen mode for distraction-free testing
- Don't refresh the page during test (will lose progress)
- Timer shows red warning in the last minute
- You can submit early if you finish before time expires

### For Question Management
- Write clear, concise questions
- Ensure one option is definitively correct
- Test your questions by taking the test yourself
- Keep a mix of difficulty levels

## 🔄 Future Enhancements

This is a minimal viable product. Potential improvements:
- User authentication and test history
- Multiple test categories (Reading, Listening, etc.)
- Question difficulty levels
- Detailed analytics and progress tracking
- Export results to PDF
- Question import from files
- Advanced admin features (edit questions, categories)

## 📞 Support

If you encounter issues:
1. Check that both backend and frontend servers are running
2. Verify MongoDB connection
3. Review browser console for error messages
4. Ensure all dependencies are installed correctly

---

