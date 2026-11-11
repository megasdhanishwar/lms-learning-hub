import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="not-found">
      <span>404</span>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="button-primary">
        Back to dashboard
      </Link>
    </div>
  );
}
