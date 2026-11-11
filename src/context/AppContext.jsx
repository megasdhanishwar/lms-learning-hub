import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { courses as initialCourses } from "../data/courses";

const AppContext = createContext(null);
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [enrolled, setEnrolled] = useState(() =>
    read("learnify_enrolled", [
      "react-mastery",
      "javascript-pro",
      "ui-ux-design",
    ]),
  );
  const [completed, setCompleted] = useState(() =>
    read("learnify_completed", {}),
  );
  const [quizResults, setQuizResults] = useState(() =>
    read("learnify_quiz_results", {}),
  );
  const [baseCourses, setBaseCourses] = useState(() =>
    read("learnify_base_courses", initialCourses),
  );
  const [customCourses, setCustomCourses] = useState(() =>
    read("learnify_custom_courses", []),
  );
  const [theme, setTheme] = useState(() => read("learnify_theme", "dark"));
  const [profile, setProfile] = useState(() =>
    read("learnify_profile", {
      name: "Eswar",
      email: "eswar@gmail.com",
      role: "Student",
      bio: "Curious learner exploring design and technology.",
      location: "Chennai, India",
    }),
  );
  const allCourses = useMemo(
    () => [...baseCourses, ...customCourses],
    [baseCourses, customCourses],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "learnify_base_courses",
        JSON.stringify(baseCourses),
      ),
    [baseCourses],
  );

  useEffect(
    () => localStorage.setItem("learnify_enrolled", JSON.stringify(enrolled)),
    [enrolled],
  );
  useEffect(
    () => localStorage.setItem("learnify_completed", JSON.stringify(completed)),
    [completed],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "learnify_quiz_results",
        JSON.stringify(quizResults),
      ),
    [quizResults],
  );
  useEffect(
    () =>
      localStorage.setItem(
        "learnify_custom_courses",
        JSON.stringify(customCourses),
      ),
    [customCourses],
  );
  useEffect(
    () => localStorage.setItem("learnify_theme", JSON.stringify(theme)),
    [theme],
  );
  useEffect(
    () => localStorage.setItem("learnify_profile", JSON.stringify(profile)),
    [profile],
  );

  const enroll = (id) =>
    setEnrolled((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const toggleComplete = (courseId, lessonId) =>
    setCompleted((prev) => {
      const current = prev[courseId] || [];
      return {
        ...prev,
        [courseId]: current.includes(lessonId)
          ? current.filter((id) => id !== lessonId)
          : [...current, lessonId],
      };
    });
  const saveQuiz = (courseId, quizId, result) =>
    setQuizResults((prev) => ({ ...prev, [`${courseId}_${quizId}`]: result }));
  const addCourse = (course) =>
    setCustomCourses((prev) => [
      { ...course, id: `custom-${Date.now()}` },
      ...prev,
    ]);
  const updateCourse = (id, patch) => {
    setCustomCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, ...patch } : course,
      ),
    );
    setBaseCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, ...patch } : course,
      ),
    );
  };
  const deleteCourse = (id) => {
    setCustomCourses((prev) => prev.filter((course) => course.id !== id));
    setBaseCourses((prev) => prev.filter((course) => course.id !== id));
    setEnrolled((prev) => prev.filter((courseId) => courseId !== id));
  };
  const value = {
    courses: allCourses,
    enrolled,
    completed,
    quizResults,
    theme,
    setTheme,
    profile,
    setProfile,
    enroll,
    toggleComplete,
    saveQuiz,
    addCourse,
    updateCourse,
    deleteCourse,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
