import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  LayoutDashboard,
  Compass,
  GraduationCap,
  UserRound,
  Settings,
  ShieldCheck,
  X,
  Sparkles,
  PanelLeftClose,
} from "lucide-react";

const links = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Explore courses", path: "/catalogue", icon: Compass },
  { label: "My learning", path: "/my-courses", icon: GraduationCap },
  { label: "My profile", path: "/profile", icon: UserRound },
];

export default function Sidebar({ open, onClose, collapsed, setCollapsed }) {
  const location = useLocation();
  return (
    <>
      {open && (
        <button
          className="sidebar-scrim"
          aria-label="Close menu"
          onClick={onClose}
        />
      )}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 88 : 252, x: 0 }}
        className={`sidebar ${open ? "sidebar-open" : ""} ${collapsed ? "sidebar-collapsed" : ""}`}
      >
        <div className="brand-row">
          <div className="brand-mark">
            <BookOpen size={21} />
          </div>
          {!collapsed && (
            <div className="brand-name">
              Stackly<span>Learn.</span>
              <small>LEARNING SPACE</small>
            </div>
          )}
          <button className="icon-button sidebar-close" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        <div className="sidebar-label">{!collapsed && "LEARN"}</div>
        <nav className="side-nav">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              title={collapsed ? label : ""}
            >
              <Icon size={19} strokeWidth={1.9} />{" "}
              {!collapsed && <span>{label}</span>}
              {path === "/my-courses" && !collapsed && (
                <span className="nav-count">03</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-label second-label">
          {!collapsed && "MANAGE"}
        </div>
        <nav className="side-nav">
          <NavLink
            to="/admin"
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            title={collapsed ? "Course management" : ""}
          >
            <ShieldCheck size={19} />
            {!collapsed && <span>Course management</span>}
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          {/* {!collapsed && (
            <div className="upgrade-card">
              <div className="upgrade-icon">
                <Sparkles size={17} />
              </div>
              <strong>Keep your momentum</strong>
              <p>Small steps today, big progress tomorrow.</p>
              <div className="upgrade-line">
                <span />
              </div>
              <small>3 day learning streak</small>
            </div>
          )} */}
          <button
            className="nav-link collapse-control"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PanelLeftClose size={19} />
            {!collapsed && <span>Collapse sidebar</span>}
          </button>
          {!collapsed && (
            <div className="sidebar-foot">© 2026 StacklyLearn Studio</div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
