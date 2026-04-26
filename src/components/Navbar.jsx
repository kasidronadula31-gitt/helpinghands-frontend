import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ better UX
    setMenuOpen(false);
  };

  // ✅ FIX: works even with query params
  const isActive = (path) =>
    location.pathname.startsWith(path) ? "active" : "";

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <span style={{ fontSize: "25px" }}>🩸</span>
          <div>
            <span className="navbar-logo-text">Helping Hands</span>
            <br />
            <span className="navbar-logo-sub">SAVE A LIFE TODAY</span>
          </div>
        </Link>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`hamburger-line ${menuOpen ? "open-1" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open-2" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open-3" : ""}`} />
        </button>

        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>

          <li>
            <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/search" className={isActive("/search")} onClick={() => setMenuOpen(false)}>
              Find Donor
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                {/* ✅ FIXED ROUTE */}
                <Link to="/become-donor" className={isActive("/become-donor")} onClick={() => setMenuOpen(false)}>
                  Become a Donor
                </Link>
              </li>

              <li>
                <Link to="/profile" className={isActive("/profile")} onClick={() => setMenuOpen(false)}>
                  👤 {user?.name?.split(" ")[0]}
                </Link>
              </li>

              <li>
                <button className="btn navbar-btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={isActive("/login")} onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className={isActive("/register")} onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}

        </ul>

      </div>
    </nav>
  );
};

export default Navbar;