import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Catalogue from "./pages/Catalogue";
import MyCourses from "./pages/MyCourses";
import CourseDetails from "./pages/CourseDetails";
import LessonViewer from "./pages/LessonViewer";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme } = useApp();
  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="main-area">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="page-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.22 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/my-courses" element={<MyCourses />} />
                <Route path="/course/:courseId" element={<CourseDetails />} />
                <Route
                  path="/course/:courseId/lesson/:lessonId"
                  element={<LessonViewer />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
