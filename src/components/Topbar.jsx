import { Bell, Search, Sun, Moon, Menu, ChevronDown } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Topbar({ onMenu }) {
  const { theme, setTheme, profile } = useApp();
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu}>
        <Menu size={21} />
      </button>
      <div className="top-search">
        <Search size={17} />
        <span>Search anything...</span>
        {/* <kbd>⌘ K</kbd> */}
      </div>
      <div className="topbar-actions">
        <button
          className="icon-button theme-toggle"
          title="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="icon-button notification-button"
          title="Notifications"
        >
          <Bell size={18} />
          <i />
        </button>
        <div className="top-profile">
          <div className="avatar avatar-small">
            {profile.name
              .split(" ")
              .map((x) => x[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="top-profile-name">
            <strong>{profile.name}</strong>
            <small>Student account</small>
          </div>
          <ChevronDown size={15} />
        </div>
      </div>
    </header>
  );
}
