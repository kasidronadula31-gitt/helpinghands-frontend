import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "50px" }}>404</h1>

        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
          Oops! Page not found
        </p>

        <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;