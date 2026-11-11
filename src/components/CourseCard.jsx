import { Link } from "react-router-dom";
import {
  Clock3,
  Users,
  Star,
  ArrowUpRight,
  Play,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CourseCard({
  course,
  progress = 0,
  enrolled = false,
  compact = false,
}) {
  return (
    <motion.article
      className={`course-card ${compact ? "course-card-compact" : ""}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/course/${course.id}`} className="course-cover-wrap">
        <img src={course.cover} alt="" className="course-cover" />
        <span className={`course-category category-${course.accent}`}>
          {course.category}
        </span>
        <span className="cover-open">
          <ArrowUpRight size={17} />
        </span>
      </Link>
      <div className="course-card-body">
        <div className="course-meta">
          <span>{course.level}</span>
          <span className="rating">
            <Star size={13} fill="currentColor" /> {course.rating}
          </span>
        </div>
        <Link to={`/course/${course.id}`} className="course-title">
          {course.title}
        </Link>
        <div className="instructor-line">
          <img src={course.avatar} alt="" />
          <span>{course.instructor}</span>
        </div>
        <div className="course-stats">
          <span>
            <Clock3 size={14} />
            {course.duration}
          </span>
          <span>
            <Users size={14} />
            {course.students} learners
          </span>
        </div>
        {enrolled ? (
          <div className="card-progress">
            <div className="progress-caption">
              <span>Progress</span>
              <strong>{progress}%</strong>
            </div>
            <div className="progress-track">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="card-bottom">
            <span className="free-label">FREE COURSE</span>
            <Link to={`/course/${course.id}`} className="card-link">
              View course <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
        {enrolled && progress === 100 && (
          <div className="completed-tag">
            <CheckCircle2 size={14} /> Completed
          </div>
        )}
      </div>
    </motion.article>
  );
}
