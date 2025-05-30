import React, { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import ModalVideoComponent from "../common/ModalVideo";
export default function PinContent({ pageItem }) {
  const { isAddedToCartCourses, addCourseToCart } = useContextElement();
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!pageItem) {
    return null;
  }

  return (
    <>
      <div
        id="js-pin-content"
        style={
          screenWidth < 991
            ? { height: "fit-content", right: "0%" }
            : { height: "100%", right: "7%", paddingTop: "90px" }
        }
        className="courses-single-info js-pin-content"
      >
        <div
          style={{ position: "sticky", top: "100px" }}
          className="bg-white shadow-2 rounded-8 border-light py-10 px-10"
        >
          <div className="relative">
            {/* Affichez une image si disponible, sinon une image par défaut */}
            <img
              className="w-1/1"
              src="/assets/img/coursesCards/card2.jpg" alt="image"
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

          <div className="courses-single-info__content scroll-bar-1 pt-30 pb-20 px-20">
            <div className="d-flex justify-between items-center mb-30">
              <div className="text-24 lh-1 text-dark-1 fw-500">
                {pageItem.price ? `${pageItem.price} $` : "Free"}
              </div>
            </div>

            <button
              className="button -md -purple-1 text-white w-1/1"
              onClick={() => addCourseToCart(pageItem.id)}
            >
              {isAddedToCartCourses(pageItem.id)
                ? "Already Liked"
                : "Like"}
            </button>
            <button className="button -md -outline-dark-1 text-dark-1 w-1/1 mt-10">
              Buy Now
            </button>

            <div className="mt-25">
              <div className="d-flex justify-between py-8 ">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-video-file"></div>
                  <div className="ml-10">Chapitres</div>
                </div>
                <div>{pageItem.chapitres ? pageItem.chapitres.length : 0}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-puzzle"></div>
                  <div className="ml-10">Lessons</div>
                </div>
                <div>
                  {pageItem.chapitres && Array.isArray(pageItem.chapitres)
                    ? pageItem.chapitres.reduce(
                        (acc, ch) => acc + (ch.lessons ? ch.lessons.length : 0),
                        0
                      )
                    : 0}
                </div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-clock-2"></div>
                  <div className="ml-10">Duration</div>
                </div>
                <div>{pageItem.duree || "N/A"}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-translate"></div>
                  <div className="ml-10">Language</div>
                </div>
                <div>{pageItem.language || "N/A"}</div>
              </div>

              <div className="d-flex justify-between py-8 border-top-light">
                <div className="d-flex items-center text-dark-1">
                  <div className="icon-badge"></div>
                  <div className="ml-10">Certificate</div>
                </div>
                <div>
                  {pageItem.certifications && pageItem.certifications.length > 0
                    ? "Yes"
                    : "No"}
                </div>
              </div>
            </div>

            <div className="d-flex justify-center pt-15">
              <a href="#" className="d-flex justify-center items-center size-40 rounded-full"
              > <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="d-flex justify-center items-center size-40 rounded-full"
              > <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="d-flex justify-center items-center size-40 rounded-full"
              > <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="d-flex justify-center items-center size-40 rounded-full"
              > <i className="fa fa-linkedin"></i>
              </a>
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
