import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  BookOpen,
  Users,
  Layers3,
  MoreHorizontal,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const blank = {
  title: "",
  category: "Development",
  level: "Beginner",
  duration: "2h 00m",
  lessonsCount: 1,
  rating: 4.8,
  students: "0",
  price: 0,
  instructor: "Course instructor",
  role: "Instructor",
  avatar: "https://i.pravatar.cc/100?img=47",
  cover:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
  accent: "violet",
  description: "A practical course to help you build new skills.",
  skills: ["Course fundamentals"],
  lessons: [
    { id: "intro", title: "Introduction", duration: "10:00", type: "video" },
  ],
};

export default function Admin() {
  const { courses, addCourse, updateCourse, deleteCourse } = useApp();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [query, setQuery] = useState("");
  const openNew = () => {
    setEditing(null);
    setForm(blank);
    setModal(true);
  };
  const openEdit = (c) => {
    setEditing(c.id);
    setForm({ ...c });
    setModal(true);
  };
  const submit = (e) => {
    e.preventDefault();
    if (editing) updateCourse(editing, form);
    else addCourse(form);
    setModal(false);
  };
  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <div className="eyebrow">LEARNING OPERATIONS</div>
          <h1>Course management</h1>
          <p>Create, update and organise your learning catalogue.</p>
        </div>
        <button className="button-primary" onClick={openNew}>
          <Plus size={17} /> Add new course
        </button>
      </section>
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon stat-purple">
            <BookOpen size={19} />
          </div>
          <div>
            <span>Total courses</span>
            <strong>{courses.length}</strong>
            <small>In catalogue</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-cyan">
            <Users size={19} />
          </div>
          <div>
            <span>Total learners</span>
            <strong>9.2k</strong>
            <small>Across all courses</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-orange">
            <Layers3 size={19} />
          </div>
          <div>
            <span>Categories</span>
            <strong>{new Set(courses.map((c) => c.category)).size}</strong>
            <small>Learning topics</small>
          </div>
        </div>
      </div>
      <section className="content-panel admin-table-panel">
        <div className="table-toolbar">
          <div>
            <h2>All courses</h2>
            <p>Manage the courses available to students.</p>
          </div>
          <div className="search-field admin-search">
            <Search size={16} />
            <input
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>COURSE</th>
                <th>CATEGORY</th>
                <th>LEVEL</th>
                <th>LESSONS</th>
                <th>RATING</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="table-course">
                      <img src={c.cover} alt="" />
                      <div>
                        <strong>{c.title}</strong>
                        <small>{c.instructor}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table-category">{c.category}</span>
                  </td>
                  <td>{c.level}</td>
                  <td>{c.lessons.length}</td>
                  <td>★ {c.rating}</td>
                  <td>
                    <div className="table-actions">
                      <button title="Edit course" onClick={() => openEdit(c)}>
                        <Pencil size={15} />
                      </button>
                      {c.id.startsWith("custom-") && (
                        <button
                          title="Delete course"
                          className="delete-action"
                          onClick={() => {
                            if (window.confirm("Delete this course?"))
                              deleteCourse(c.id);
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <div className="table-empty">No courses match your search.</div>
          )}
        </div>
      </section>
      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <form className="course-modal" onSubmit={submit}>
            <div className="modal-heading">
              <div>
                <div className="eyebrow">
                  {editing ? "UPDATE CATALOGUE" : "EXPAND THE CATALOGUE"}
                </div>
                <h2>{editing ? "Edit course" : "Create a course"}</h2>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setModal(false)}
              >
                <X size={19} />
              </button>
            </div>
            <div className="modal-fields">
              <label className="full-field">
                Course title
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. Complete UI Design"
                />
              </label>
              <label>
                Category
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, category: e.target.value }))
                  }
                >
                  {[
                    "Development",
                    "Design",
                    "Business",
                    "Personal Growth",
                    "Marketing",
                  ].map((x) => (
                    <option>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Level
                <select
                  value={form.level}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, level: e.target.value }))
                  }
                >
                  {["Beginner", "Intermediate", "Advanced"].map((x) => (
                    <option>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Duration
                <input
                  value={form.duration}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, duration: e.target.value }))
                  }
                  placeholder="4h 30m"
                />
              </label>
              <label>
                Instructor
                <input
                  value={form.instructor}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, instructor: e.target.value }))
                  }
                />
              </label>
              <label className="full-field">
                Cover image URL
                <input
                  value={form.cover}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, cover: e.target.value }))
                  }
                />
              </label>
              <label className="full-field">
                Description
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                />
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button-secondary"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="button-primary">
                {editing ? "Save changes" : "Create course"} <Plus size={15} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
