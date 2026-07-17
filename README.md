# HR Resume Automation System - POC

A visually appealing proof-of-concept web application for HR recruiters to automate resume processing, job profile management, and AI-powered candidate shortlisting. This system is designed to help manage 500+ resumes per day efficiently.

## Features

### Phase 1 Features (Implemented)
- **Resume Intake**: Bulk upload support for PDF, Word, CSV, and LinkedIn profiles with drag-and-drop interface
- **Job Profile Setup**: Create and manage multiple reusable job profiles with configurable criteria
- **AI Shortlisting Engine**: Simulated AI-powered candidate matching and scoring (0-100 scale)
- **Candidate Ranking Dashboard**: Visual candidate cards with skill matching and detailed profiles

### Phase 2 Features (Implemented)
- **Analytics & Reporting**: Daily/weekly metrics, recruitment funnel tracking, and audit trails
- **Dynamic Filtering**: Filter candidates by score threshold and job profiles
- **Export Functionality**: Export shortlists to Excel/CSV format

### Phase 3 Features (Planned for Future)
- Interview automation with calendar integration
- Pre-screening questionnaires (MCQs, situational tests)
- Video interview integration with AI scoring
- API integration with ATS/HRIS systems
- Role-based access control

## Tech Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Icons**: Inline SVG icons (no external dependencies)
- **Deployment**: Ready for Vercel hosting

## Project Structure

```
hr-resume-automation/
├── index.html          # Main application file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process or dependencies required!

### Deployment to Vercel

#### Option 1: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to the project directory:
   ```bash
   cd hr-resume-automation
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Follow the prompts to complete deployment

#### Option 2: Using Vercel Dashboard

1. Push your code to GitHub (see below)
2. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the HTML/CSS/JS files
6. Click "Deploy"

### Upload to GitHub

1. Initialize git repository:
   ```bash
   cd hr-resume-automation
   git init
   ```

2. Add all files:
   ```bash
   git add .
   ```

3. Commit changes:
   ```bash
   git commit -m "Initial commit: HR Resume Automation POC"
   ```

4. Create a new repository on GitHub
5. Add remote origin:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hr-resume-automation.git
   ```

6. Push to GitHub:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Usage Guide

### Dashboard
- View real-time statistics: resumes processed, shortlisted candidates, active profiles, average scores
- Monitor recruitment funnel from applicants to interviewed candidates
- Track recent activity and system events

### Resume Intake
- **Drag & Drop**: Drag resume files (PDF, DOCX, CSV) directly to the upload zone
- **Browse Files**: Click "Browse Files" to select files from your computer
- **OCR Support**: Enable OCR for scanned documents (toggle in upload options)
- **Auto-parse**: Automatically extract skills, education, and experience from resumes
- **Export**: Download parsed resume data as CSV

### Job Profiles
- **Create Profile**: Click "Create New Profile" to define job criteria
- **Configure Criteria**: Set mandatory vs. preferred skills, experience requirements, education
- **Scoring Weights**: Adjust weights for skills (40%), experience (30%), education (20%), certifications (10%)
- **Reuse Profiles**: Save and reuse profiles for multiple hiring cycles
- **Manage Profiles**: Edit existing profiles or view candidates for each profile

### AI Shortlisting Engine
- **Select Profile**: Choose a job profile to match candidates against
- **Set Threshold**: Adjust minimum score threshold (0-100) for filtering
- **Run AI Shortlisting**: Click to run AI-powered matching algorithm
- **View Rankings**: See candidates ranked by match score with skill breakdown
- **Auto-Shortlist**: Automatically shortlist top 10 candidates
- **Export Results**: Download shortlisted candidates to Excel

### Analytics & Reporting
- **Date Range**: Filter analytics by time period (7 days, 30 days, 90 days, custom)
- **Job Profile Filter**: View metrics for specific roles or all profiles
- **Charts**: Visual charts for resumes processed, shortlist ratio, score trends
- **Time to Hire**: Track average time to hire metric
- **Audit Trail**: Compliance tracking with detailed activity logs

## Design Features

- **Modern UI**: Clean, professional interface with gradient accents
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile devices
- **Visual Feedback**: Hover effects, animations, and loading states
- **Color Coding**: Status indicators (parsed, processing, pending) with color-coded badges
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Performance**: Lightweight, fast-loading with no external dependencies

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Backend Integration
- Connect to AI/ML services for real resume parsing
- Implement actual OCR processing for scanned documents
- Database integration for persistent data storage
- User authentication and role-based access

### Advanced Features
- Email notifications for candidates
- Calendar integration for interview scheduling
- Video interview platform integration
- ATS integration (Greenhouse, Lever, Workday, etc.)
- Advanced analytics with predictive insights
- Multi-language support
- Custom branding and white-label options

### Performance
- Handle 1000+ resumes per day
- Real-time collaboration for multiple recruiters
- Advanced caching and optimization
- CDN integration for global performance

## Support

For questions or issues with this POC, please refer to the project documentation or contact the development team.

## License

This is a proof-of-concept project for demonstration purposes.

---

**Note**: This is a frontend POC demonstrating the UI and user experience. In production, you would need to integrate with backend services for actual AI processing, database storage, and authentication.
