import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
  Flame,
  GraduationCap,
  Target,
  Sparkles,
  Play,
  CalendarDays,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import CourseCard from "../components/CourseCard";
import ProgressRing from "../components/ProgressRing";

export default function Dashboard() {
  const { courses, enrolled, completed, profile } = useApp();
  const myCourses = courses.filter((c) => enrolled.includes(c.id));
  const totalLessons = myCourses.reduce((sum, c) => sum + c.lessons.length, 0);
  const done = myCourses.reduce(
    (sum, c) => sum + (completed[c.id]?.length || 0),
    0,
  );
  const overall = totalLessons ? Math.round((done / totalLessons) * 100) : 0;
  const continueCourse =
    myCourses.find((c) => (completed[c.id]?.length || 0) < c.lessons.length) ||
    myCourses[0];
  const continueLesson =
    continueCourse?.lessons.find(
      (l) => !(completed[continueCourse.id] || []).includes(l.id),
    ) || continueCourse?.lessons[0];
  const firstName = profile.name.split(" ")[0];
  return (
    <div className="page-stack">
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            <Sparkles size={14} /> YOUR LEARNING SPACE
          </div>
          <h1>
            Welcom Back, {firstName}
            <span className="wave">✦</span>
          </h1>
          <p>Ready to make today a little more productive?</p>
        </div>
        <Link to="/catalogue" className="button-primary">
          <span>Explore courses</span>
          <ArrowUpRight size={17} />
        </Link>
      </section>
      <section className="hero-banner">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-chip">
            <Flame size={13} /> KEEP YOUR STREAK ALIVE
          </div>
          <h2>
            Every expert was once
            <br />
            <em>a beginner.</em>
          </h2>
          <p>
            Keep showing up. Your next breakthrough is closer than you think.
          </p>
          <Link
            to={
              continueCourse && continueLesson
                ? `/course/${continueCourse.id}/lesson/${continueLesson.id}`
                : "/catalogue"
            }
            className="button-light"
          >
            <Play size={15} fill="currentColor" /> Continue learning
          </Link>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-book">
            <BookOpen size={68} strokeWidth={1.1} />
          </div>
          <div className="float-card float-card-top">
            <span className="float-dot" /> Learning streak
            <strong>03 days</strong>
          </div>
          <div className="float-card float-card-bottom">
            <Target size={17} />
            <div>
              <small>Weekly goal</small>
              <strong>4 / 5 hours</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon stat-purple">
            <BookOpen size={19} />
          </div>
          <div>
            <span>Enrolled courses</span>
            <strong>{myCourses.length.toString().padStart(2, "0")}</strong>
            <small>Keep exploring</small>
          </div>
          <ArrowUpRight className="stat-arrow" size={16} />
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-cyan">
            <GraduationCap size={19} />
          </div>
          <div>
            <span>Lessons completed</span>
            <strong>{done.toString().padStart(2, "0")}</strong>
            <small>Across all courses</small>
          </div>
          <ArrowUpRight className="stat-arrow" size={16} />
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-orange">
            <Clock3 size={19} />
          </div>
          <div>
            <span>Learning progress</span>
            <strong>{overall}%</strong>
            <small>You're making progress</small>
          </div>
          <ArrowUpRight className="stat-arrow" size={16} />
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-green">
            <Flame size={19} />
          </div>
          <div>
            <span>Current streak</span>
            <strong>03 days</strong>
            <small>Personal best: 12 days</small>
          </div>
          <ArrowUpRight className="stat-arrow" size={16} />
        </div>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <div className="eyebrow">PICK UP WHERE YOU LEFT OFF</div>
            <h2>Continue learning</h2>
          </div>
          <Link to="/my-courses" className="text-link">
            My courses <ArrowRight size={15} />
          </Link>
        </div>
        {continueCourse ? (
          <div className="continue-card">
            <img src={continueCourse.cover} alt="" />
            <div className="continue-info">
              <span className="mini-label">YOUR NEXT LESSON</span>
              <h3>{continueCourse.title}</h3>
              <p>{continueLesson?.title || "Course completed"}</p>
              <div className="continue-progress">
                <div className="progress-track">
                  <span
                    style={{
                      width: `${Math.round(((completed[continueCourse.id]?.length || 0) / continueCourse.lessons.length) * 100)}%`,
                    }}
                  />
                </div>
                <small>
                  {completed[continueCourse.id]?.length || 0} of{" "}
                  {continueCourse.lessons.length} lessons completed
                </small>
              </div>
            </div>
            <Link
              to={
                continueLesson
                  ? `/course/${continueCourse.id}/lesson/${continueLesson.id}`
                  : `/course/${continueCourse.id}`
              }
              className="button-primary continue-button"
            >
              <Play size={15} fill="currentColor" /> Resume
            </Link>
          </div>
        ) : (
          <div className="empty-inline">
            Enroll in a course to see your next lesson.
          </div>
        )}
      </section>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <div className="eyebrow">CURATED FOR YOU</div>
            <h2>Popular courses</h2>
          </div>
          <Link to="/catalogue" className="text-link">
            Browse catalogue <ArrowRight size={15} />
          </Link>
        </div>
        <div className="course-grid">
          {courses.slice(0, 3).map((course) => (
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
      </section>
      <div className="dashboard-footer">
        <CalendarDays size={15} /> A little progress each day adds up to big
        results.
      </div>
    </div>
  );
}
