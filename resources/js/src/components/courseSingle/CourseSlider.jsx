import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Star from "../common/Star";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CourseSlider() {
  const [showSlider, setShowSlider] = useState(false);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    setShowSlider(true);
    // Charger les formations depuis l'API
    const fetchFormations = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("/api/formations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormations(response.data);
      } catch (err) {
        setFormations([]);
      }
    };
    fetchFormations();
  }, []);

  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">You May Like</h2>
            </div>
          </div>
        </div>

        <div className="relative pt-60 lg:pt-50">
          <div className="overflow-hidden js-section-slider">
            {showSlider && (
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".js-courses-next-one",
                  prevEl: ".js-courses-prev-one",
                }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  450: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
              >
                {formations.slice(0, 12).map((elm, i) => (
                  <SwiperSlide key={elm.id || i}>
                    <div className="swiper-slide">
                      <div className="coursesCard -type-1 ">
                        <div className="relative">
                          <div className="coursesCard__image overflow-hidden rounded-8">
                            <img
                              className="w-1/1"
                              src={
                                elm.imageSrc
                                  ? "/" + elm.imageSrc
                                  : "/assets/img/coursesCards/card2.jpg"
                              }
                              alt="image"
                            />
                            <div className="coursesCard__image_overlay rounded-8"></div>
                          </div>
                          <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3"></div>
                        </div>

                        <div className="h-100 pt-15">
                          <div className="d-flex items-center">
                            <div className="text-14 lh-1 text-yellow-1 mr-10">
                              {/* Affiche la note moyenne si disponible */}
                              {elm.feedbacks && elm.feedbacks.length > 0
                                ? (
                                    elm.feedbacks.reduce((acc, fb) => acc + (parseFloat(fb.rating) || 0), 0) /
                                    elm.feedbacks.length
                                  ).toFixed(1)
                                : "N/A"}
                            </div>
                            <div className="d-flex x-gap-5 items-center">
                              <Star
                                star={
                                  elm.feedbacks && elm.feedbacks.length > 0
                                    ? (
                                        elm.feedbacks.reduce((acc, fb) => acc + (parseFloat(fb.rating) || 0), 0) /
                                        elm.feedbacks.length
                                      )
                                    : 0
                                }
                              />
                            </div>
                          </div>

                          <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                            <Link
                              className="linkCustom"
                              to={`/courses-single-2/${elm.id}`}
                            >
                              {elm.titre}
                            </Link>
                          </div>

                          <div className="d-flex x-gap-10 items-center pt-10">
                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <img
                                  src="/assets/img/coursesCards/icons/1.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">
                                {elm.chapitres ? elm.chapitres.length : 0} chapitre
                              </div>
                            </div>

                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <img
                                  src="/assets/img/coursesCards/icons/2.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">{elm.duree || "N/A"}</div>
                            </div>
                            <div className="text-20 text-dark-1">${elm.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <button className="section-slider-nav -prev -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-courses-prev-one">
            <i className="icon icon-arrow-left text-24"></i>
          </button>

          <button className="section-slider-nav -next -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-courses-next-one">
            <i className="icon icon-arrow-right text-24"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
