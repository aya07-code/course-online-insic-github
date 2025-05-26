import MobileMenu from "../component/MobileMenu";
import Menu from "../component/Menu";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


export default function HeaderTwo() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`header -type-5 js-header ${
        scrollPosition > 40 ? "bg-dark-1" : ""
      } `}
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
