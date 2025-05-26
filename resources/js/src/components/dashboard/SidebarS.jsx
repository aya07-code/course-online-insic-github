import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { sidebarItems } from "@/data/dashBoardSidebarS";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Fonction logout
  const handleLogout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      // Optionnel : gérer l'erreur
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sidebar -dashboard">
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}
        >
          {elm.text === "Logout" ? (
            <a
              href="/login"
              className="d-flex items-center text-17 lh-1 fw-500"
              onClick={handleLogout}
            >
              {elm.icon ? (
                <FontAwesomeIcon icon={elm.icon} className={`${elm.iconClass} mr-15`} />
              ) : (
                <i className={`${elm.iconClass} mr-15`}></i>
              )}
              {elm.text}
            </a>
          ) : (
            <Link
              to={elm.href}
              className="d-flex items-center text-17 lh-1 fw-500"
            >
              {elm.icon ? (
                <FontAwesomeIcon icon={elm.icon} className={`${elm.iconClass} mr-15`} />
              ) : (
                <i className={`${elm.iconClass} mr-15`}></i>
              )}
              {elm.text}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}