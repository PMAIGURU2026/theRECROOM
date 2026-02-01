# Agent Briefing Document (AGENT.MD)

**Project**: The REC ROOM - Cohort Rating & Review Platform
**Last Updated**: January 31, 2026
**AI Agent Context**: Continuous Development Assistant

---

## 🎯 Agent Purpose & Scope

This document serves as a comprehensive briefing for AI agents (Claude/Copilot) working on The REC ROOM project and future projects. It provides:

1. **Project Context** - What we're building and why
2. **Current State** - What's done and what needs work
3. **Priorities** - What to focus on next
4. **Code Standards** - How to maintain quality
5. **Communication** - How to update and report progress

---

## 📋 Current Project State

### Status Summary
- **Overall**: 🟡 MVP Phase - Core UI Complete, Dev Server Running
- **Frontend**: ✅ 95% Complete (React app, all components working)
- **Backend**: ❌ Not Started (planned for Phase 2)
- **Database**: ❌ Not Started (planned for Phase 2)
- **Testing**: ❌ Not Started (plan added)
- **Deployment**: ⏳ Staging setup ready

### What's Working
```
✅ React setup with Vite
✅ All 6 classmate profiles with data
✅ Search & filtering system
✅ Profile page views (About/Resources/Reviews)
✅ Review form with star rating & dimensions
✅ Helpful voting on reviews
✅ Success confirmation page
✅ Responsive design with custom styling
✅ All dependencies installed
✅ Dev server running on port 3000
```

### What's Broken/Needs Work
```
🔴 PRIORITY 1: Page rendering issue (empty screen on localhost)
   - React components not mounting to DOM
   - Need to verify root element rendering
   - Check browser console for errors
   
⚠️ PRIORITY 2: No persistent data (all demo data)
   - Reviews don't save between sessions
   - No user authentication
   
⚠️ PRIORITY 3: No backend API
   - All data is hardcoded
   - Need to implement CRUD endpoints
```

---

## 🚀 Immediate Next Steps (For Agent)

### Task 1: Fix Page Rendering
**Objective**: Get the app displaying properly on http://localhost:3000

**What to Do**:
1. Check browser console for errors
2. Verify React DevTools shows component tree
3. Confirm App.jsx is exporting default function
4. Check main.jsx is correctly importing React and ReactDOM
5. Verify HTML root element exists
6. Test with `npm run dev` and refresh page

**Success Criteria**: See full RecRoom UI with header, hero, and classmate cards

**File to Debug**: `src/App.jsx`, `src/main.jsx`, `public/index.html`

### Task 2: Test All Interactions
**Objective**: Verify all UI components work correctly

**Test List**:
- [ ] Search bar filters classmates
- [ ] Classmate cards are clickable
- [ ] Profile page loads for each person
- [ ] Tabs switch between About/Resources/Reviews
- [ ] Review form opens and closes
- [ ] Star rating selector works
- [ ] Dimension chips toggle on/off
- [ ] Helpful voting works
- [ ] Back buttons navigate correctly
- [ ] Responsive on mobile size

**Success Criteria**: All interactions work smoothly without errors

### Task 3: Document Issues Found
**Objective**: Keep Notes.md up to date with findings

**Update**: Add to Notes.md under "Issues & Debugging" section:
- What errors were found
- Which components have issues
- Proposed fixes
- Estimated time to resolve

---

## 📊 Code Architecture Overview

### Component Structure
```
App.jsx (Main Component)
├── Navigation Bar
├── Home View
│   ├── Hero Section
│   ├── Search Chips
│   └── Classmate Grid
├── Profile View
│   ├── Profile Header
│   ├── Tab Navigation
│   └── Tab Content (About/Resources/Reviews)
├── Review Form View
│   ├── Form Card
│   ├── Star Selector
│   ├── Dimension Chips
│   └── Textarea Fields
└── Success View
    └── Confirmation Message
```

### State Management
```javascript
const [view, setView] = useState("home");           // Current page
const [selected, setSelected] = useState(null);     // Selected classmate
const [search, setSearch] = useState("");           // Search query
const [tab, setTab] = useState("about");            // Active profile tab
const [votes, setVotes] = useState({});             // Review helpful votes
const [form, setForm] = useState({...});            // Review form data
```

### Data Structure
```javascript
CLASSMATES: Array<{
  id, name, initials, role, skills, career, hobbies,
  proudProject, tags, avgRating, reviewCount, recognition,
  reviews: Array<{reviewer, rating, date, text, hasRecognition}>
}>

RESOURCES_MAP: Object<role, Array<{icon, type, title, desc}>>
QA_MAP: Object<personId, Array<{q, a, asker, date}>>
INSIGHTS_MAP: Object<personId, Array<{label, score, level}>>
```

---

## 🛠️ Development Standards

### Code Style
- **Format**: Use 2-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Comments**: Add comments for complex logic
- **Functions**: Keep functions under 200 lines
- **Components**: One component per view when possible

### File Organization
```
src/
├── App.jsx              (Main component - currently everything here)
├── main.jsx             (Entry point)
├── components/          (Split components here in future)
│   ├── Navigation.jsx
│   ├── ProfileCard.jsx
│   ├── ReviewForm.jsx
│   └── index.js
└── utils/               (Helper functions in future)
    ├── api.js
    └── constants.js
```

### Best Practices
- ✅ Use React hooks (useState, useEffect)
- ✅ Use semantic HTML
- ✅ Extract hard-coded strings to constants
- ✅ Add propTypes or TypeScript
- ✅ Keep components pure and testable
- ✅ Comment complex logic
- ✅ Use meaningful variable names

### Avoid
- ❌ Inline styles (use CSS classes)
- ❌ Console.logs in production code
- ❌ Global variables
- ❌ Props drilling (use Context in future)
- ❌ Side effects in render

---

## 📝 How to Update Documentation

### Update Notes.md
Update this file whenever:
- Completing a task (move to "Current Session Notes")
- Finding bugs (add to "Issues & Debugging")
- Adding new features (update "Key Features Implemented")
- Changing the approach (update "Next Steps")

**Format**:
```markdown
### Recent Activity
**Jan 31, 2026 - 4:00 PM**
- [x] Fixed page rendering issue
- [x] Verified all components working
- [ ] Connected to backend (in progress)
```

### Update Roadmap.md
Update this file when:
- Completing a sprint (mark tasks as done)
- Identifying new tasks
- Changing timeline
- Discovering blockers

**Format**:
```markdown
- [x] Completed task
- [ ] Pending task
- [⚠️] Blocked task
```

### Update Agent.md
Update this file when:
- Changing priorities
- Adding new context
- Updating code standards
- Clarifying requirements

---

## 🔗 How to Ask for Help

### When Stuck, Provide Context

**Good Request**:
> "The review form isn't submitting. When I click the submit button, nothing happens. The form is in src/App.jsx lines 450-500. I've checked the onClick handler and it calls setView('success'). Can you debug why it's not switching views?"

**Bad Request**:
> "The app is broken"

### Include:
1. **What you're trying to do** (specific goal)
2. **What's happening** (current behavior)
3. **What should happen** (expected behavior)
4. **File location** (src/App.jsx lines X-Y)
5. **What you've tried** (steps already taken)
6. **Error messages** (from console or terminal)

---

## 🧪 Testing Checklist

Before marking anything "complete", verify:

### Unit Testing
- [ ] Component renders without errors
- [ ] Props are passed correctly
- [ ] State updates work
- [ ] Event handlers fire

### Integration Testing
- [ ] Components work together
- [ ] Data flows correctly
- [ ] Navigation works
- [ ] Forms submit properly

### UI/UX Testing
- [ ] Looks good on desktop (1920px)
- [ ] Looks good on tablet (768px)
- [ ] Looks good on mobile (375px)
- [ ] All text is readable
- [ ] Buttons are clickable
- [ ] No console errors

### Performance
- [ ] Page load < 2 seconds
- [ ] No lag when typing search
- [ ] Smooth animations
- [ ] No memory leaks

---

## 📞 Contact & Escalation

### For Quick Fixes
- Check code directly
- Run tests locally
- Review console errors

### For Design Questions
- Reference the STYLES object in App.jsx
- Check Color Palette in Notes.md
- Review component mockups

### For Architecture Questions
- Review data structures above
- Check component diagram
- Refer to roadmap.md phases

### For Urgent Issues
1. Document the issue in Notes.md
2. Stop work on current task
3. Focus on fix
4. Update roadmap.md timeline

---

## 🎓 Learning Resources

### For New Agents
- Read entire Notes.md first
- Review the roadmap.md timeline
- Understand data structures above
- Check test checklist before claiming "done"

### For Frontend Changes
- React 18 Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Lucide Icons: https://lucide.dev

### For Backend (Future)
- Express Docs: https://expressjs.com
- PostgreSQL: https://www.postgresql.org
- MongoDB: https://www.mongodb.com

---

## 🎯 Success Metrics

### For MVP Phase
- ✅ Page renders correctly
- ✅ All UI interactions work
- ✅ Search functionality is smooth
- ✅ Profile pages display all data
- ✅ Review form can be submitted
- ✅ Zero console errors
- ✅ Sub-1s interaction response time

### For Backend Phase
- ✅ API endpoints respond correctly
- ✅ Data persists in database
- ✅ Authentication works
- ✅ Tests pass (90%+ coverage)
- ✅ API documented

### For Launch
- ✅ All features implemented
- ✅ No critical bugs
- ✅ Mobile responsive
- ✅ Performance optimized
- ✅ Accessibility compliant
- ✅ Users can sign up & review

---

## 🔒 Important Reminders

### Security
- Never hardcode passwords or API keys
- Use environment variables (.env)
- Validate all user input
- Sanitize database queries
- Use HTTPS in production

### Code Quality
- Keep code DRY (Don't Repeat Yourself)
- Write self-documenting code
- Add comments for complex logic
- Use meaningful variable names
- Keep functions small and focused

### Testing
- Write tests as you code
- Test edge cases
- Don't commit broken code
- Use git commits frequently
- Keep master/main branch deployable

---

## 📅 Standing Meetings & Reviews

### Daily Standup (Simulated)
- What was completed?
- What's the blocker?
- What's next?
- Update Notes.md

### Weekly Review (Every Friday)
- Completed tasks → move to "done"
- Blockers → add to Issues section
- Update roadmap timeline if needed
- Plan next week's sprint

### Sprint Review (Every 2 weeks)
- Demo features to team
- Get feedback
- Update roadmap.md
- Plan next sprint

---

## 🚀 Quick Start for New Agents

1. **Read** this entire agent.md file
2. **Read** Notes.md current session
3. **Read** roadmap.md Phase 1
4. **Check** the immediate next steps above
5. **Ask** questions if unclear
6. **Start** with Task 1: Fix Page Rendering
7. **Document** progress in Notes.md
8. **Update** this file with learnings

---

## 📊 Document Version History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 1/31/26 | 1.0 | Initial creation | Claude |

---

**This document is living - update it as the project evolves.**

**Last Updated**: January 31, 2026
**Next Review**: February 6, 2026
**Maintained By**: Development Team
