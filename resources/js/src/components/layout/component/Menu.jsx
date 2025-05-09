import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileFooter from "./MobileFooter";

import { menuList } from "@/data/menu";
import { useLocation } from "react-router-dom";

export default function Menu({ allClasses, headerPosition }) {
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] === pathname.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.forEach((elm3) => {
            if (elm3.href?.split("/")[1] === pathname.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, [pathname]);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link to="/login" className="text-dark-1">
            Log in
          </Link>
          <Link to="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            {/* Home Section */}
            <li className="menu-item-has-children">
              <Link
                data-barba
                to="/"
                className={menuItem === "Home" ? "activeMenu" : ""}
              >
                Home
              </Link>
            </li>

            {/* About Section */}
            <li className="menu-item-has-children">
              <Link
                data-barba
                to="/about-1"
                className={menuItem === "About" ? "activeMenu " : ""}
              >
                About
              </Link>
            </li>

            {/* Courses Section */}
            <li className="menu-item-has-children">
              <Link
                data-barba
                to="#"
                className={menuItem === "Courses" ? "activeMenu" : ""}
              >
                Courses <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>
              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link to="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Courses
                  </Link>
                </li>
                {menuList[1]?.links?.map((category, index) =>
                  category?.links ? (
                    <li className="menu-item-has-children" key={index}>
                      <Link
                        to="#"
                        className={
                          submenu === category.title ? "activeMenu" : "inActiveMenu"
                        }
                      >
                        {category.title}
                        <div className="icon-chevron-right text-11"></div>
                      </Link>
                      <ul className="subnav">
                        <li className="menu__backButton js-nav-list-back">
                          <Link to="#">
                            <i className="icon-chevron-left text-13 mr-10"></i>
                            {category.title}
                          </Link>
                        </li>
                        {category.links.map((elm, i) => (
                          <li
                            key={i}
                            className={
                              pathname.split("/")[1] === elm.href.split("/")[1]
                                ? "activeMenu"
                                : "inActiveMenu"
                            }
                          >
                            <Link data-barba to={elm.href}>
                              {elm.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className={
                        pathname.split("/")[1] === category.href.split("/")[1]
                          ? "activeMenu"
                          : "inActiveMenu"
                      }
                    >
                      <Link data-barba to={category.href}>
                        {category.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </li>


            {/* Pages Section */}
            <li className="menu-item-has-children">
              <Link
                data-barba
                to="#"
                className={menuItem === "Pages" ? "activeMenu" : ""}
              >
                Pages <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>
              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link to="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Pages
                  </Link>
                </li>
                {menuList[2]?.links?.map((category, index) =>
                  category?.links ? (
                    <li className="menu-item-has-children" key={index}>
                      <Link
                        to="#"
                        className={
                          submenu === category.title
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        {category.title}
                        <div className="icon-chevron-right text-11"></div>
                      </Link>
                      <ul className="subnav">
                        <li className="menu__backButton js-nav-list-back">
                          <Link to="#">
                            <i className="icon-chevron-left text-13 mr-10"></i>
                            {category.title}
                          </Link>
                        </li>
                        {category.links.map((elm, i) => (
                          <li
                            key={i}
                            className={
                              pathname.split("/")[1] ===
                              elm.href.split("/")[1]
                                ? "activeMenu"
                                : "inActiveMenu"
                            }
                          >
                            <Link data-barba to={elm.href}>
                              {elm.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li
                      key={index}
                      className={
                        pathname.split("/")[1] === category.href.split("/")[1]
                          ? "activeMenu"
                          : "inActiveMenu"
                      }
                    >
                      <Link data-barba to={category.href}>
                        {category.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </li>

            {/* Contact Section */}
            <li>
              <Link
                data-barba
                to="/contact-2"
                className={
                  pathname === "/contact-2" ? "activeMenu" : "inActiveMenuTwo"
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Footer */}
        <MobileFooter />
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}