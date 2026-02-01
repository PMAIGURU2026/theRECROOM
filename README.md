# The REC ROOM

A modern, interactive cohort rating and review platform built with React. Discover your classmates' skills, celebrate their growth, and give feedback that actually matters.

## 🚀 Features

- **Browse Classmates** - Discover team members with detailed profiles
- **Star Ratings** - Rate and review your peers on multiple dimensions
- **Advanced Search** - Filter by name, role, skills, or interests
- **Profile Pages** - View detailed profiles with skills, projects, and Q&A
- **Resource Hub** - Curated learning resources by expertise area
- **Review System** - Multi-dimensional feedback with helpful voting
- **Insights Dashboard** - Analytics on expertise, collaboration, and more
- **Responsive Design** - Beautiful UI that works on mobile and desktop

## 🛠 Tech Stack

- **Frontend**: React 18
- **Styling**: CSS-in-JS with Google Fonts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm or yarn

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Setup

1. **Clone the repository** (if not already done):
```bash
cd /Users/mrs.paulafenton/Documents/GitHub/The-REC-ROOM-
```

2. **Install dependencies**:
```bash
npm install
```

## 🏃 Development

### Run the dev server:
```bash
npm run dev
```
The app will automatically open at `http://localhost:3000`

### Build for production:
```bash
npm run build
```

### Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
The-REC-ROOM-/
├── src/
│   ├── App.jsx           # Main app component with all views
│   └── main.jsx          # React entry point
├── public/
│   └── index.html        # HTML template
├── package.json          # Dependencies & scripts
├── vite.config.js        # Vite configuration
├── tsconfig.json         # TypeScript config
└── README.md             # This file
```

## 🎨 Key Features Explained

### Home View
- Hero section with app introduction
- "People Also Search For" filter chips
- Top-rated classmates carousel
- Browse all classmates sorted by rating

### Profile View
- Large profile header with avatar and overall rating
- Sticky tab navigation (About, Resources, Reviews)
- **About Tab**: Skills, career path, hobbies, proudest project, rating breakdown, Q&A
- **Resources Tab**: Curated learning materials by role
- **Reviews Tab**: All reviews with helpful voting, insights dashboard

### Review Form
- Star rating selector
- Multi-select dimension chips (Expertise, Collaboration, etc.)
- Four textarea fields for detailed feedback
- Success confirmation page

## 🔍 Search & Filtering

Search works across:
- Classmate names
- Roles/titles
- Skills and tags
- Interest categories

## 📊 Data Structure

The app uses hardcoded demo data including:
- 6 classmates with full profiles
- Custom Q&A for each person
- Role-specific resources
- Review insights and ratings
- Recognition badges

To integrate with a backend:
1. Replace `CLASSMATES` array with API calls
2. Update review submission to POST to your backend
3. Add authentication for user management

## 🚀 Next Steps

- [ ] Connect to a backend API
- [ ] Add user authentication
- [ ] Implement persistent review storage
- [ ] Add image uploads for avatars
- [ ] Create admin dashboard
- [ ] Add email notifications
- [ ] Mobile app with React Native

## 📝 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## 🎯 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

## 📄 License

This project is part of a class assignment. All rights reserved.

## 👥 Team

Created as a class project demonstrating modern React patterns and UI design.

---

**Happy coding!** 🎉

