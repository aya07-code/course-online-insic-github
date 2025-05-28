import Star from "../common/Star";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PinContent from "./PinContent";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
import Reviews from "./Reviews";
const menuItems = [
  { id: 1, href: "#overview", text: "Overview", isActive: true },
  { id: 2, href: "#course-content", text: "Course Content", isActive: false },
  { id: 4, href: "#reviews", text: "Reviews", isActive: false },
];

export default function CourseDetailsTwo({ id }) {
  const [formation, setFormation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`/api/formations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormation(response.data);
      } catch (err) {
        setError("Impossible de charger la formation.");
      }
    };
    if (id) fetchFormation();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!formation) {
    return <div>Chargement...</div>;
  }

  // Calculez la note moyenne à partir des feedbacks
  let rating = 4.7; // valeur par défaut
  if (formation.feedbacks && formation.feedbacks.length > 0) {
    const sum = formation.feedbacks.reduce(
      (acc, fb) => acc + (parseFloat(fb.rating) || 0),
      0
    );
    rating = (sum / formation.feedbacks.length).toFixed(1);
  }
  // Pour la date de dernière mise à jour
  const lastUpdate = formation.updated_at
    ? new Date(formation.updated_at).toLocaleDateString()
    : "N/A";

  return (
    <div id="js-pin-container" className="js-pin-container relative">
      <section className="page-header -type-5 bg-dark-1">
        <div className="page-header__bg">
          <div
            className="bg-image js-lazy"
            data-bg="img/event-single/bg.jpg"
          ></div>
        </div>

        <div className="container">
          <div className="page-header__content pt-90 pb-90">
            <div className="row y-gap-30 relative">
              <div className="col-xl-7 col-lg-8">
                <div className="d-flex x-gap-15 y-gap-10 pb-20">
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-green-1 text-dark-1 fw-400">
                      BEST SELLER
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                      NEW
                    </div>
                  </div>
                  <div>
                    <div className="badge px-15 py-8 text-11 bg-purple-1 text-white fw-400">
                      POPULAR
                    </div>
                  </div>
                </div>

                <div>
                  <h1 className="text-30 lh-14 text-white pr-60 lg:pr-0">
                    {formation.titre}
                  </h1>
                </div>

                <p className=" text-18 col-xl-9 mt-20">{formation.description &&
                              formation.description.split('\n').map((line, idx) => (
                                <React.Fragment key={idx}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}</p>

                <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                  <div className="d-flex items-center">
                    <div className="text-18 lh-1 text-yellow-1 mr-10">
                      {rating}
                    </div>
                    <div className="d-flex x-gap-5 items-center">
                      <Star star={rating} textSize={"text-11"} />
                    </div>
                  </div>

                  <div className="d-flex items-center text-light-1">
                    <div className="icon icon-wall-clock text-13"></div>
                    <div className="text-18 ml-8">
                      Last updated {lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="d-flex items-center text-light-1">
                  <div className="icon-translate"></div>
                  <div className="text-18 ml-8">
                    Language {formation.language}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PinContent pageItem={formation}/>

      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-nav-menu -line">
                <div className="d-flex x-gap-30">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      <a
                        href={item.href}
                        className={`pb-12 page-nav-menu__link ${
                          item.isActive ? "is-active" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <Overview formation={formation} /> 
              <CourseContent formation={formation} />
              <Reviews feedbacks={formation.feedbacks || []} />
            </div>
          </div>
        </div>
      </section> 
    </div>
  );
}
