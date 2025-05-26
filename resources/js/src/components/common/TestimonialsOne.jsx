import React, { useState, useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function TestimonialsOne() {
  const [showSlider, setShowSlider] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    setShowSlider(true);
    // Charger les feedbacks depuis l'API
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("/api/feedbacks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(response.data);
      } catch (err) {
        setFeedbacks([]);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <section className="layout-pt-lg mt-80 layout-pb-lg bg-purple-1" style={{ marginBottom: "80px" }}>
      <div className="container ">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title text-green-1">
                What People Say
              </h2>
            </div>
          </div>
        </div>

        <div className="js-section-slider pt-50">
          {showSlider && (
            <Swiper
              className="overflow-visible"
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".icon-arrow-right",
                prevEl: ".icon-arrow-left",
              }}
              loop={true}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                // when window width is >= 576px
                450: {
                  slidesPerView: 1,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  // when window width is >= 992px
                  slidesPerView: 3,
                },
              }}
            >
              {feedbacks && feedbacks.length > 0 ? feedbacks.map((fb, i) => (
                <SwiperSlide key={fb.id || i} className="swiper-slide">
                  <div
                    className="testimonials -type-1"
                    data-aos="fade-left"
                    data-aos-duration={(i + 1) * 550}
                  >
                    <div className="testimonials__content">
                      <div>
                        <div className="testimonials-footer__image">
                          <img
                            src={
                              fb.user && fb.user.avatar
                                ? (fb.user.avatar.startsWith("http") ? fb.user.avatar : "/" + fb.user.avatar.replace(/^\/+/, ""))
                                : '/assets/img/testimonials/3.png'
                            }
                            alt="avatar"
                          />
                        </div>
                        <div className="testimonials-footer__content">
                          <h4 className="testimonials__title">
                            {fb.user?.name || "Utilisateur"}
                          </h4>
                        </div>
                      </div>
                      <p className="testimonials__text">
                        {`“${fb.contenu}”`}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              )) : null}
            </Swiper>
          )}

          <div className="d-flex x-gap-20 items-center justify-end pt-60 lg:pt-40">
            <div className="col-auto">
              <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-prev">
                <i className="icon icon-arrow-left text-24"></i>
              </button>
            </div>
            <div className="col-auto">
              <button className="button -outline-white text-white size-50 rounded-full d-flex justify-center items-center js-next">
                <i className="icon icon-arrow-right text-24"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
