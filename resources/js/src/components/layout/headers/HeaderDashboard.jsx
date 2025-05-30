import React, { useEffect, useState } from "react";
import { notifications } from "@/data/notifications";
import Messages from "../component/Messages";
import MyCourses from "../component/MyCourses";
import { Link } from "react-router-dom";

export default function HeaderDashboard() {
  const [messageOpen, setMessageOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [isfullScreen, setIsfullScreen] = useState(false);
  const [isOnNotification, setIsOnNotification] = useState(false);
  const [isOnProfile, setIsOnProfile] = useState(false);

  const [documentElement, setDocumentElement] = useState();
  const handleFullScreenToggle = () => {
    setIsfullScreen((pre) => !pre);
    if (!isfullScreen) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
  };

  useEffect(() => {
    setDocumentElement(document.documentElement);
  }, []);
  const openFullscreen = () => {
    if (documentElement?.requestFullscreen) {
      documentElement?.requestFullscreen();
    } else if (documentElement?.webkitRequestFullscreen) {
      /* Safari */
      documentElement?.webkitRequestFullscreen();
    } else if (documentElement?.msRequestFullscreen) {
      /* IE11 */
      documentElement?.msRequestFullscreen();
    }
  };

  const handleDarkmode = () => {
    if (document) {
      document.getElementsByTagName("html")[0].classList.toggle("-dark-mode");
    }
  };

  const closeFullscreen = () => {
    if (document?.exitFullscreen) {
      document?.exitFullscreen();
    } else if (document?.webkitExitFullscreen) {
      /* Safari */
      document?.webkitExitFullscreen();
    } else if (document?.msExitFullscreen) {
      /* IE11 */
      document?.msExitFullscreen();
    }
  };
  const handleResize = () => {};
  useEffect(() => {
    if (window.innerWidth < 990) {
      document
        .getElementById("dashboardOpenClose")
        .classList.add("-is-sidebar-hidden");
    }
    const handleResize = () => {
      if (window.innerWidth < 990) {
        document
          .getElementById("dashboardOpenClose")
          .classList.add("-is-sidebar-hidden");
      }
    };

    // Add event listener to window resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header className="header -dashboard -dark-bg-dark-1 js-header">
        <div className="header__container py-20 px-30">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="header__explore text-dark-1">
                  <button
                    onClick={() => {
                      document
                        .getElementById("dashboardOpenClose")
                        .classList.toggle("-is-sidebar-hidden");
                    }}
                    className="d-flex items-center js-dashboard-home-9-sidebar-toggle"
                  >
                    <i className="icon -dark-text-white icon-explore"></i>
                  </button>
                </div>

                <div className="header__logo ml-30 md:ml-20">
                  <Link data-barba to="/">
                  <img src="/assets/img/general/logo.png" alt="logo"style={{ height: "80px" }} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="text-white d-flex items-center lg:d-none mr-15">
                  <div className="dropdown bg-transparent px-0 py-0">
                    <div className="d-flex items-center text-15 text-dark-1 ">
                        <div  className="mr-4" style={{ marginRight: "20px" }}>
                          <Link to="/" className="d-block text-dark-1"> 
                            Home    
                          </Link>
                        </div>
                        <div  className="mr-4" style={{ marginRight: "20px" }}>
                          <Link to="/about-1" className="d-block text-dark-1"> 
                            About
                          </Link>
                        </div>
                        <div>
                          <Link to="/courses-list-5" className="d-block text-dark-1">
                            Courses
                          </Link>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex items-center sm:d-none">
                  <div className="relative">
                    <button
                      onClick={handleDarkmode}
                      className="js-darkmode-toggle text-light-1 d-flex items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                    >
                      <i className="text-24 icon icon-night"></i>
                    </button>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleFullScreenToggle()}
                      className="d-flex text-light-1 items-center justify-center size-50 rounded-16 -hover-dshb-header-light"
                    >
                      <i className="text-24 icon icon-maximize"></i>
                    </button>
                  </div>

                  <div
                    className="relative"
                    onClick={() => setMessageOpen(true)}
                  >
                    <a
                      href="#"
                      className="d-flex items-center text-light-1 justify-center size-50 rounded-16 -hover-dshb-header-light"
                      data-el-toggle=".js-msg-toggle"
                    >
                      <i className="text-24 icon icon-email"></i>
                    </a>
                  </div>

                  <div
                    className="relative"
                    onClick={() => setIsOnNotification((pre) => !pre)}
                  >
                    <a
                      href="#"
                      className="d-flex items-center text-light-1 justify-center size-50 rounded-16 -hover-dshb-header-light"
                      data-el-toggle=".js-notif-toggle"
                    >
                      <i className="text-24 icon icon-notification"></i>
                    </a>

                    <div
                      className={`toggle-element js-notif-toggle  ${
                        isOnNotification ? "-is-el-visible" : ""
                      } -`}
                    >
                      <div className="toggle-bottom -notifications bg-white shadow-4 border-light rounded-8 mt-10">
                        <div className="py-30 px-30">
                          <div className="y-gap-40">
                            {notifications.map((elm, i) => (
                              <div
                                key={i}
                                className={`d-flex items-center  ${
                                  i !== 0
                                    ? "border-top-light -dark-border-top-light-5"
                                    : ""
                                } `}
                              >
                                <div className="shrink-0">
                                  <img src={elm.imageSrc} alt="image" />
                                </div>
                                <div className="ml-12">
                                  <h4 className="text-15 lh-1 fw-500 -dark-text-dark-1">
                                    {elm.heading}
                                  </h4>
                                  <div className="text-13 lh-1 mt-10">
                                    {elm.time} Hours Ago
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="relative d-flex items-center ml-10"
                  onClick={() => setIsOnProfile((pre) => !pre)}
                >
                  <img
                      className="size-50"
                      src="/assets/img/misc/user-profile.png"
                      alt="image"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Messages setMessageOpen={setMessageOpen} messageOpen={messageOpen} />
      </header>
    </>
  );
}