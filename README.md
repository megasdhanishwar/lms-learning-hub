# Learnify — Learning Management System

A responsive React + Vite LMS dashboard with a mixed dark/light theme, gradient accents, subtle motion, course discovery, student learning flows, quiz scoring, and localStorage persistence.

## Features

- Student dashboard with enrolled courses, progress, learning stats, and continue-learning shortcut.
- Course catalogue with search, category filters, level filters, and sorting.
- Course details with curriculum, lesson list, instructor information, and enrolment.
- My Courses with All / In progress / Completed tabs.
- Lesson viewer with previous/next navigation and completion tracking.
- Interactive quizzes with answer selection, score calculation, feedback, and retakes.
- Student profile editor with local persistence.
- Admin course management with create, edit, search, and delete for custom courses.
- Responsive sidebar, mobile navigation drawer, dark/light theme toggle.
- Reusable course cards, progress components, lesson rows, and UI elements.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
lms-learning-hub/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components/
    │   ├── CourseCard.jsx
    │   ├── EmptyState.jsx
    │   ├── ProgressRing.jsx
    │   ├── Quiz.jsx
    │   ├── Sidebar.jsx
    │   └── Topbar.jsx
    ├── context/
    │   └── AppContext.jsx
    ├── data/
    │   └── courses.js
    └── pages/
        ├── Admin.jsx
        ├── Catalogue.jsx
        ├── CourseDetails.jsx
        ├── Dashboard.jsx
        ├── LessonViewer.jsx
        ├── MyCourses.jsx
        ├── NotFound.jsx
        └── Profile.jsx
```

## Demo behaviour

- Three courses are enrolled by default so the dashboard and My Courses page have useful starter content.
- All lesson completion, quiz attempts, enrolments, custom courses, profile edits, and theme choice are saved in browser localStorage.
- The video player area is a front-end placeholder; connect a video source/player API for real playback.
- Admin-created courses are saved locally in the current browser and can be edited or deleted.
- Course cover images and instructor avatars use remote Unsplash and Pravatar image URLs.

## Reset demo data

In browser DevTools → Application → Local Storage, remove keys beginning with `learnify_`, then refresh.
