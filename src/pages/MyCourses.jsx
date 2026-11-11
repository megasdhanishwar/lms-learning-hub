import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Search, Play, ArrowUpRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";

export default function MyCourses() {
  const { courses, enrolled, completed } = useApp();
  const [tab, setTab] = useState("All courses");
  const [query, setQuery] = useState("");
  const mine = courses
    .filter((c) => enrolled.includes(c.id))
    .filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
  const filtered = mine.filter(
    (c) =>
      tab === "All courses" ||
      (tab === "In progress"
        ? (completed[c.id]?.length || 0) < c.lessons.length
        : (completed[c.id]?.length || 0) >= c.lessons.length),
  );
  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <div className="eyebrow">YOUR PERSONAL CLASSROOM</div>
          <h1>My learning</h1>
          <p>All your enrolled courses, in one place.</p>
        </div>
        <Link to="/catalogue" className="button-primary">
          Find a course <ArrowUpRight size={16} />
        </Link>
      </section>
      <div className="learning-summary">
        <div className="learning-summary-icon">
          <GraduationCap size={24} />
        </div>
        <div>
          <strong>{mine.length} courses in your library</strong>
          <span>Consistency is the key to mastering a new skill.</span>
        </div>
        <div className="learning-summary-count">
          <strong>
            {mine.reduce((n, c) => n + (completed[c.id]?.length || 0), 0)}
          </strong>
          <span>lessons done</span>
        </div>
      </div>
      <div className="my-course-controls">
        <div className="tabs">
          {["All courses", "In progress", "Completed"].map((t) => (
            <button
              className={tab === t ? "tab-active" : ""}
              onClick={() => setTab(t)}
              key={t}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="search-field small-search">
          <Search size={16} />
          <input
            placeholder="Find in my courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {filtered.length ? (
        <div className="course-grid">
          {filtered.map((c) => (
            <CourseCard
              key={c.id}
              course={c}
              enrolled
              progress={Math.round(
                ((completed[c.id]?.length || 0) / c.lessons.length) * 100,
              )}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No courses in this view"
          text="Explore the catalogue and enrol in a course to get started."
          action={
            <Link to="/catalogue" className="button-primary">
              Explore courses
            </Link>
          }
        />
      )}
    </div>
  );
}
