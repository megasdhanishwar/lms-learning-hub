import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  FileText,
  HelpCircle,
  ListChecks,
  Play,
  Volume2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import Quiz from "../components/Quiz";

export default function LessonViewer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { courses, enrolled, completed, toggleComplete } = useApp();
  const course = courses.find((c) => c.id === courseId);
  if (!course)
    return (
      <div className="not-found">
        <h2>Course not found</h2>
        <Link to="/catalogue">Back to catalogue</Link>
      </div>
    );
  if (!enrolled.includes(courseId))
    return (
      <div className="not-found">
        <h2>Enrol to access lessons</h2>
        <Link to={`/course/${courseId}`}>View course details</Link>
      </div>
    );
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  const lesson = course.lessons[index];
  if (!lesson)
    return (
      <div className="not-found">
        <h2>Lesson not found</h2>
        <Link to={`/course/${courseId}`}>Back to course</Link>
      </div>
    );
  const done = completed[courseId] || [];
  const isDone = done.includes(lesson.id);
  const go = (i) => {
    if (course.lessons[i])
      navigate(`/course/${courseId}/lesson/${course.lessons[i].id}`);
  };
  const markAndNext = () => {
    if (!isDone) toggleComplete(courseId, lesson.id);
    if (index < course.lessons.length - 1) go(index + 1);
  };
  return (
    <div className="lesson-page">
      <div className="lesson-topline">
        <Link to={`/course/${courseId}`}>
          <ArrowLeft size={16} /> {course.title}
        </Link>
        <span>
          Lesson {index + 1} of {course.lessons.length}
        </span>
      </div>
      <div className="lesson-workspace">
        <main className="lesson-main">
          <div className="lesson-stage">
            {lesson.type === "quiz" ? (
              <div className="quiz-stage-icon">
                <HelpCircle size={46} />
                <span>QUICK KNOWLEDGE CHECK</span>
              </div>
            ) : (
              <div className="video-placeholder">
                <div className="video-glow" />
                <div className="video-brand">
                  <div className="brand-mark">
                    <Play size={19} fill="currentColor" />
                  </div>
                  <span>LEARNIFY CLASSROOM</span>
                </div>
                <button className="video-play" aria-label="Play lesson">
                  <Play size={28} fill="currentColor" />
                </button>
                <div className="video-controls">
                  <span>▶ &nbsp; 00:00 / {lesson.duration}</span>
                  <div className="video-progress">
                    <span />
                  </div>
                  <Volume2 size={17} />
                </div>
                <div className="video-caption">
                  Your learning experience starts here
                </div>
              </div>
            )}
          </div>
          <div className="lesson-title-row">
            <div>
              <div className="eyebrow">
                {lesson.type === "quiz"
                  ? "ASSESS YOUR KNOWLEDGE"
                  : "VIDEO LESSON"}
              </div>
              <h1>{lesson.title}</h1>
              <p>
                {course.title} <span>·</span> {lesson.duration}
              </p>
            </div>
            {isDone && (
              <span className="completed-tag">
                <CheckCircle2 size={14} /> Completed
              </span>
            )}
          </div>
          {lesson.type === "quiz" ? (
            <Quiz courseId={courseId} lesson={lesson} />
          ) : (
            <div className="lesson-notes">
              <div className="lesson-note-icon">
                <FileText size={18} />
              </div>
              <div>
                <strong>Lesson overview</strong>
                <p>
                  Follow along with the lesson and take a moment to practise the
                  concepts. When you're ready, mark this lesson as complete and
                  continue to the next one.
                </p>
              </div>
            </div>
          )}
          <div className="lesson-navigation">
            <button
              className="button-secondary"
              disabled={index === 0}
              onClick={() => go(index - 1)}
            >
              <ChevronLeft size={17} /> Previous lesson
            </button>
            <button className="button-primary" onClick={markAndNext}>
              {index === course.lessons.length - 1
                ? isDone
                  ? "Course finished"
                  : "Complete lesson"
                : isDone
                  ? "Next lesson"
                  : "Mark complete & continue"}{" "}
              <ChevronRight size={17} />
            </button>
          </div>
        </main>
        <aside className="lesson-sidebar">
          <div className="lesson-sidebar-head">
            <div>
              <div className="eyebrow">YOUR CURRICULUM</div>
              <h3>Course content</h3>
            </div>
            <span>
              {Math.round((done.length / course.lessons.length) * 100)}%
            </span>
          </div>
          <div className="progress-track">
            <span
              style={{
                width: `${(done.length / course.lessons.length) * 100}%`,
              }}
            />
          </div>
          <div className="lesson-sidebar-list">
            {course.lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(i)}
                className={`sidebar-lesson ${l.id === lessonId ? "current" : ""}`}
              >
                <span
                  className={`sidebar-lesson-icon ${done.includes(l.id) ? "is-done" : ""}`}
                >
                  {done.includes(l.id) ? (
                    <CheckCircle2 size={15} />
                  ) : l.type === "quiz" ? (
                    <ListChecks size={15} />
                  ) : (
                    <CirclePlay size={15} />
                  )}
                </span>
                <span className="sidebar-lesson-text">
                  <strong>{l.title}</strong>
                  <small>
                    {l.type === "quiz" ? "Quiz" : "Video"} · {l.duration}
                  </small>
                </span>
                {l.id === lessonId && <span className="now-playing">NOW</span>}
              </button>
            ))}
          </div>
          <Link to={`/course/${courseId}`} className="view-course-link">
            View course details <ArrowRight size={14} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
