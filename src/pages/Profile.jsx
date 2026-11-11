import { useState } from "react";
import {
  Camera,
  MapPin,
  Mail,
  ShieldCheck,
  Save,
  UserRound,
  BookOpen,
  Award,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { profile, setProfile, enrolled, completed, courses } = useApp();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setSaved(false);
  };
  const save = (e) => {
    e.preventDefault();
    setProfile(form);
    setSaved(true);
  };
  const done = courses.reduce((n, c) => n + (completed[c.id]?.length || 0), 0);
  return (
    <div className="page-stack">
      <section className="page-heading">
        <div>
          <div className="eyebrow">YOUR ACCOUNT</div>
          <h1>My profile</h1>
          <p>Manage your personal information and learning identity.</p>
        </div>
      </section>
      <div className="profile-layout">
        <aside className="content-panel profile-summary">
          <div className="profile-cover" />
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">
              {profile.name
                .split(" ")
                .map((x) => x[0])
                .slice(0, 2)
                .join("")}
            </div>
            <button className="camera-button">
              <Camera size={15} />
            </button>
          </div>
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
          <div className="profile-location">
            <MapPin size={14} />
            {profile.location}
          </div>
          <div className="profile-stats">
            <div>
              <strong>{enrolled.length}</strong>
              <span>Courses</span>
            </div>
            <div>
              <strong>{done}</strong>
              <span>Lessons done</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Day streak</span>
            </div>
          </div>
          <div className="profile-badge">
            <Award size={17} />
            <span>
              Curious mind
              <br />
              <small>Keep learning every day</small>
            </span>
          </div>
        </aside>
        <section className="content-panel profile-form-panel">
          <div className="profile-form-heading">
            <div>
              <div className="eyebrow">PERSONAL DETAILS</div>
              <h2>Profile information</h2>
            </div>
            <span className="secure-label">
              <ShieldCheck size={15} /> Private account
            </span>
          </div>
          <form onSubmit={save} className="profile-form">
            <label>
              Full name
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </label>
            <label>
              Location
              <input
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </label>
            <label>
              Account type
              <input value={form.role} readOnly />
            </label>
            <label className="full-field">
              About me
              <textarea
                rows="4"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="Tell us a little about yourself..."
              />
            </label>
            <div className="profile-form-footer">
              {saved && (
                <span className="saved-message">
                  Changes saved successfully.
                </span>
              )}
              <button className="button-primary" type="submit">
                <Save size={16} /> Save changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
