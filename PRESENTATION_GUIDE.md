# THE REC ROOM - PRESENTATION SCRIPT & DEMO GUIDE

## OPENING (30 seconds)
"The REC ROOM is an AI-native platform built for the Pursuit L2 cohort to discover, connect, and collaborate with fellow developers. Think of it as a Yelp for people - where you can find skilled teammates, understand their expertise, and build projects together."

---

## DEMO FLOW (5 minutes)

### 1. HOMEPAGE TOUR (1 min)
**What to show:**
- Start at http://localhost:3001
- Scroll through the 18 cohort profile cards
- Point out:
  - Beautiful card layout with professional photos
  - Three "CAMERA SHY" badges (Ibrahima, Michael Chabler, Ismael Carabollo)
  - Role labels (Designer, Backend Engineer, Full-Stack, etc.)
  - Search bar at top

**Say:** "Here we have all 18 members of our cohort. Notice how three members chose to keep their privacy with CAMERA SHY badges. Everyone else has professional headshots."

---

### 2. VIEW A PROFILE (1.5 min)
**What to show:**
- Click on any profile card (e.g., Gary Gonzalez)
- Show the **About** tab:
  - Full name, role, skills
  - Professional interests
  - Career goals
  - Hobbies
  - Proud project
  - Bonus fact

- Click on **Reviews** tab (show structure even if empty)
- Click on **Resources** tab (show learning materials)
- Click on **Community** tab (show Q&A structure)

**Say:** "Each profile is rich with information. You can see what skills they have, what they're interested in learning, their career goals, and even fun facts about them. The tabs give you a complete view of each person."

---

### 3. AUTHENTICATION & REGISTRATION (2 min)
**What to show:**
- Click "Register/Login" button (top right)
- Show the **Sign Up** form
- Demonstrate filling it out with test data:
  - Email: testuser@example.com
  - Password: TestPassword123

**Say:** "New cohort members can sign up here. We use Supabase for secure authentication - industry-standard security."

- Then click "Create Profile" tab
- Fill in the profile creation form:
  - Name, Role, Skills, Interests, Career, Hobbies, Project, Bonus Fact, Image URL, Tags

**Say:** "Once you sign up, you can create your profile. All this data is securely stored in our Supabase database and persists across sessions."

- Click "Save Profile"
- Show success message: "Profile saved successfully!"

**Say:** "And just like that, your profile is live on the platform, visible to all cohort members."

---

### 4. SEARCH & FILTERING (1 min)
**What to show:**
- Go back to homepage
- Use search bar: "Python" or "Backend"
- Show filtered results
- Show role filter buttons: Click "Backend Engineer", "Product & UX Designer", etc.

**Say:** "You can search and filter by skills, roles, interests, and more. This helps you find exactly who you're looking for."

---

## TECHNICAL HIGHLIGHTS

### Architecture
- **Frontend**: React 18 with Vite (ultra-fast, 378KB production build)
- **Backend**: Supabase PostgreSQL (secure, scalable)
- **Auth**: Supabase Auth (password-protected, secure)
- **Hosting**: Ready for Vercel/Netlify deployment

### Key Features Implemented
✅ 18 cohort profiles with complete interview data
✅ Photo extraction and mapping (20 images)
✅ Camera shy privacy option
✅ Secure authentication (sign up/in/out)
✅ Profile registration and persistence
✅ Real-time database syncing
✅ Search and filtering
✅ Responsive mobile design
✅ Rich profile tabs (About, Reviews, Resources, Community)

### Database Schema
- **profiles table**: Stores user profiles with full interview data
- **Row Level Security**: Only authenticated users can edit their own profile
- **Public read**: Everyone can view all profiles

---

## CLOSING (30 seconds)

"The REC ROOM is production-ready and can be deployed live tomorrow. It provides a foundation for the cohort to:
1. **Discover talent** - Find skilled teammates for projects
2. **Build trust** - See detailed profiles and backgrounds
3. **Collaborate easily** - Next phase will add messaging and skill endorsements
4. **Stay connected** - Platform persists and grows with the cohort

This is just the beginning. We have a roadmap for reviews, ratings, messaging, and collaboration tools."

---

## BACKUP ANSWERS (If Questioned)

**Q: How is data secured?**
A: "All authentication is handled by Supabase Auth (industry standard). Passwords are hashed. We use Row Level Security (RLS) - each user can only edit their own profile. All communication is HTTPS encrypted."

**Q: What if someone wants privacy?**
A: "We have the CAMERA SHY option for people who prefer privacy. They still get a full profile, just with a placeholder instead of a photo."

**Q: Can we add more features?**
A: "Absolutely. We have reviews/ratings, direct messaging, skill endorsements, and project matching all planned for the next phase. The database schema is designed to scale."

**Q: What happens if we want to deploy?**
A: "We can deploy to Vercel or Netlify in minutes. The production build is 378KB - ultra-fast. All environment variables are configured."

**Q: How many users can it handle?**
A: "Supabase PostgreSQL can handle thousands of concurrent users. We're currently at 18, but the architecture scales infinitely."

---

## LIVE DEMO CHECKLIST

Before the presentation:
- [ ] Dev server running on http://localhost:3001
- [ ] Test account ready (email/password)
- [ ] Browser zoomed to 100%
- [ ] Internet connection stable (Supabase depends on it)
- [ ] Have phone/tablet ready to show mobile responsiveness
- [ ] Two browser windows open (homepage + profile view side-by-side if needed)

---

## ESTIMATED TIME BREAKDOWN

- Opening: 30 seconds
- Homepage demo: 1 minute
- Profile view: 1.5 minutes
- Authentication & registration: 2 minutes
- Search & filtering: 1 minute
- Closing: 30 seconds
- Questions: 2 minutes

**Total: 8-10 minutes**

---

**Good luck with your presentation! You've built something amazing. 🚀**
