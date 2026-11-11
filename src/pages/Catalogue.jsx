import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  X,
  BookOpenCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";

export default function Catalogue() {
  const { courses, enrolled, completed } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All levels");
  const [sort, setSort] = useState("popular");
  const categories = ["All", ...new Set(courses.map((c) => c.category))];
  const filtered = useMemo(() => {
    let result = courses.filter(
      (c) =>
        (category === "All" || c.category === category) &&
        (level === "All levels" || c.level === level) &&
        `${c.title} ${c.instructor} ${c.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    if (sort === "az") result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "duration")
      result.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
    return result;
  }, [courses, category, level, query, sort]);
  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <div className="eyebrow">FIND YOUR NEXT SKILL</div>
          <h1>Explore courses</h1>
          <p>Discover practical courses designed to move you forward.</p>
        </div>
        <div className="catalogue-total">
          <BookOpenCheck size={18} />
          <strong>{courses.length}</strong>
          <span>courses available</span>
        </div>
      </section>
      <div className="catalogue-toolbar">
        <div className="search-field">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, topics or instructors..."
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X size={15} />
            </button>
          )}
        </div>
        <div className="filter-select">
          <SlidersHorizontal size={16} />
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>All levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="filter-select">
          <ArrowDownWideNarrow size={16} />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Most popular</option>
            <option value="rating">Top rated</option>
            <option value="az">Name A–Z</option>
            <option value="duration">Duration</option>
          </select>
        </div>
      </div>
      <div className="category-pills">
        {categories.map((c) => (
          <button
            key={c}
            className={`category-pill ${category === c ? "selected" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="results-line">
        <span>
          Showing <strong>{filtered.length}</strong> courses
        </span>
        <span>Learn at your own pace</span>
      </div>
      {filtered.length ? (
        <div className="course-grid">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              enrolled={enrolled.includes(course.id)}
              progress={Math.round(
                ((completed[course.id]?.length || 0) / course.lessons.length) *
                  100,
              )}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No courses found"
          text="Try changing your search or filters."
          action={
            <button
              className="button-secondary"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setLevel("All levels");
              }}
            >
              Clear filters
            </button>
          }
        />
      )}
    </div>
  );
}
