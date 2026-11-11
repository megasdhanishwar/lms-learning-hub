import { BookOpen } from "lucide-react";
export default function EmptyState({
  title = "Nothing here yet",
  text = "Your learning journey is waiting for you.",
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <BookOpen size={25} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
