import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 👈 Assure-toi d'importer

import { sidebarItems } from "@/data/dashBoardSidebar";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="sidebar -dashboard">
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}
        >
          <Link
            to={elm.href}
            className="d-flex items-center text-17 lh-1 fw-500"
          >
            {/* Vérifie si `icon` est présent : si oui = FontAwesome, sinon = icône CSS */}
            {elm.icon ? (
              <FontAwesomeIcon icon={elm.icon} className={`${elm.iconClass} mr-15`} />
            ) : (
              <i className={`${elm.iconClass} mr-15`}></i>
            )}
            {elm.text}
          </Link>
        </div>
      ))}
    </div>
  );
}
