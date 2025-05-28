import MobileMenu from "../component/MobileMenu";
import Menu from "../component/Menu";

import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

export default function HeaderTwo() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);

      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header -type-5 js-header bg-dark-1 ${
        showHeader ? "" : "header--hidden"
      }`}
      style={{
        transition: "transform 0.3s ease",
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container py-10">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left">
              <div className="header__logo ">
                <Link to="/">
                  <img src="/assets/img/general/logo.png" alt="logo" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              <Menu allClasses={"menu__nav text-white -is-active"} />
              <MobileMenu
                activeMobileMenu={activeMobileMenu}
                setActiveMobileMenu={setActiveMobileMenu}
              />

              <div className="header-right__buttons d-flex items-center ml-30 xl:ml-20 md:d-none">
                <Link to="/login" className="button -underline text-white">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="button px-25 h-50 -white text-dark-1 -rounded ml-30 xl:ml-20"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
