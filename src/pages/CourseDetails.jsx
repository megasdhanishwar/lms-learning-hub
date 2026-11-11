import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Clock3,
  Play,
  CheckCircle2,
  LockKeyhole,
  Users,
  Star,
  BadgeCheck,
  Download,
  Globe2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, enrolled, enroll, completed } = useApp();
  const [expanded, setExpanded] = useState(true);
  const course = courses.find((c) => c.id === courseId);
  if (!course)
    return (
      <div className="not-found">
        <h2>Course not found</h2>
        <Link to="/catalogue">Back to catalogue</Link>
      </div>
    );
  const isEnrolled = enrolled.includes(course.id);
  const done = completed[course.id] || [];
  const progress = Math.round((done.length / course.lessons.length) * 100);
  const start = () => {
    if (!isEnrolled) enroll(course.id);
    const next =
      course.lessons.find((l) => !done.includes(l.id)) || course.lessons[0];
    navigate(`/course/${course.id}/lesson/${next.id}`);
  };
  return (
    <div className="page-stack">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>
      <section className="detail-hero">
        <img src={course.cover} alt="" />
        <div className="detail-hero-shade" />
        <div className="detail-hero-content">
          <span className={`course-category category-${course.accent}`}>
            {course.category}
          </span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="detail-rating">
            <span>
              <Star size={14} fill="currentColor" /> {course.rating} rating
            </span>
            <span>
              <Users size={15} /> {course.students} learners
            </span>
            <span>
              <Clock3 size={15} /> {course.duration}
            </span>
          </div>
          <button className="button-light" onClick={start}>
            {isEnrolled ? (
              <Play size={16} fill="currentColor" />
            ) : (
              <BookOpen size={16} />
            )}{" "}
            {isEnrolled ? "Continue course" : "Enrol for free"}{" "}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
      <div className="detail-layout">
        <div className="detail-main">
          <section className="content-panel">
            <div className="section-heading compact-heading">
              <div>
                <div className="eyebrow">COURSE CONTENT</div>
                <h2>Lessons & curriculum</h2>
              </div>
              <span className="lesson-count">
                {course.lessons.length} lessons
              </span>
            </div>
            <button
              className="module-heading"
              onClick={() => setExpanded(!expanded)}
            >
              <span>
                <BookOpen size={17} /> Course modules
              </span>
              <span>
                {course.lessons.length} lessons · {course.duration}
              </span>
            </button>
            {expanded && (
              <div className="lesson-list">
                {course.lessons.map((lesson, i) => (
                  <div className="lesson-row" key={lesson.id}>
                    <div
                      className={`lesson-number ${done.includes(lesson.id) ? "lesson-done" : ""}`}
                    >
                      {done.includes(lesson.id) ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        String(i + 1).padStart(2, "0")
                      )}
                    </div>
                    <div className="lesson-row-info">
                      <strong>{lesson.title}</strong>
                      <small>
                        {lesson.type === "quiz"
                          ? "Knowledge check"
                          : "Video lesson"}{" "}
                        · {lesson.duration}
                      </small>
                    </div>
                    {lesson.type === "quiz" && (
                      <span className="quiz-tag">QUIZ</span>
                    )}
                    {isEnrolled ? (
                      <Link
                        to={`/course/${course.id}/lesson/${lesson.id}`}
                        className="lesson-play"
                      >
                        <Play size={15} />
                      </Link>
                    ) : (
                      <LockKeyhole size={15} className="locked-icon" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
          <section className="content-panel">
            <div className="eyebrow">WHAT YOU'LL LEARN</div>
            <h2 className="panel-title">Skills you'll take away</h2>
            <div className="skills-grid">
              {course.skills.map((s) => (
                <div key={s}>
                  <CheckCircle2 size={16} />
                  {s}
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="detail-aside">
          <div className="content-panel enrollment-panel">
            <div className="eyebrow">YOUR LEARNING</div>
            {isEnrolled ? (
              <>
                <div className="enrolled-status">
                  <CheckCircle2 size={17} /> You're enrolled
                </div>
                <div className="detail-progress">
                  <div className="progress-caption">
                    <span>Course progress</span>
                    <strong>{progress}%</strong>
                  </div>
                  <div className="progress-track">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <button className="button-primary full-button" onClick={start}>
                  Continue learning <Play size={15} />
                </button>
              </>
            ) : (
              <>
                <div className="free-price">
                  Free <small>· Lifetime access</small>
                </div>
                <p className="aside-copy">
                  Join this course and start learning at your own pace.
                </p>
                <button className="button-primary full-button" onClick={start}>
                  Enrol now <ArrowUpRight size={16} />
                </button>
              </>
            )}
            <div className="included-list">
              <span>
                <BadgeCheck size={16} /> Certificate of completion
              </span>
              <span>
                <Globe2 size={16} /> Learn from anywhere
              </span>
              <span>
                <Download size={16} /> Lesson resources
              </span>
              <span>
                <Clock3 size={16} /> Self-paced learning
              </span>
            </div>
          </div>
          <div className="content-panel instructor-panel">
            <div className="eyebrow">YOUR INSTRUCTOR</div>
            <div className="instructor-profile">
              <img src={course.avatar} alt={course.instructor} />
              <div>
                <strong>{course.instructor}</strong>
                <span>{course.role}</span>
              </div>
            </div>
            <p>
              Learn from industry experience with practical examples and a
              clear, structured learning path.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
