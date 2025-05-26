import React, { useState, useEffect } from "react";
import ModalVideoComponent from "../../common/ModalVideo";

export default function VideoTwo() {
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        id="js-pin-content"
        style={
          screenWidth < 991
            ? { height: "fit-content", right: "0%",marginTop: "80px" }
            : { height: "100%", right: "7%", paddingTop: "90px",marginTop: "80px" }
        }
        className="courses-single-info js-pin-content"
      >
        <div
          style={{ position: "sticky", top: "100px" }}
          className="bg-white shadow-2 rounded-8 border-light py-10 px-10"
        >
          <div className="relative">
            <img
              className="w-full rounded-8"
              src="/assets/img/coursesCards/1.png"
              alt="course video thumbnail"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
            <div className="absolute-full-center d-flex justify-center items-center">
              <div
                onClick={() => setIsOpen(true)}
                className="d-flex justify-center items-center size-60 rounded-full bg-white js-gallery cursor"
                data-gallery="gallery1"
              >
                <div className="icon-play text-18"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalVideoComponent
        videoId={"LlCwHnp3kL4"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
