import React, { useState, useEffect } from "react";
import Star from "../../common/Star";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon1 from "../../../../../../public/assets/img/coursesCards/icons/1.svg";
export default function CategoriesTwo() {
  const [pageItems, setPageItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [currentDropdown, setCurrentDropdown] = useState("");

  useEffect(() => {
    // Charger les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Catégories récupérées :", response.data);
        setCategories(response.data);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Charger les formations depuis l'API
    const fetchFormations = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        let url = "/api/formations";
        // Correction : utilisez le paramètre categories_id pour filtrer côté backend
        if (currentCategory !== "All") {
          const selectedCat = categories.find(
            (cat) => cat.name === currentCategory
          );
          if (selectedCat) {
            url += `?categories_id=${selectedCat.id}`;
          }
        }
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPageItems(response.data);
      } catch (err) {
        setPageItems([]);
      }
    };
    fetchFormations();
  }, [currentCategory, categories]);

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row y-gap-15 justify-between items-center">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title sm:text-20">
                Our Most Popular Courses
              </h2>
            </div>
          </div>

          <div className="col-lg-auto">
            <div className="d-flex items-center">
              <div className="text-dark-1">Filter By:</div>
              <div className="d-flex flex-wrap x-gap-20 y-gap-20 items-center pl-15">
                <div>
                  <div
                    className={`dropdown js-dropdown js-drop1-active ${
                      currentDropdown == "category" ? "-is-dd-active" : ""
                    }`}
                  >
                    <div
                      onClick={() =>
                        setCurrentDropdown((pre) =>
                          pre == "category" ? "" : "category"
                        )
                      }
                      className="dropdown__button d-flex items-center text-14 rounded-8 px-15 py-10 text-dark-1"
                      data-el-toggle=".js-drop1-toggle"
                      data-el-toggle-active=".js-drop1-active"
                    >
                      <span className="js-dropdown-title">
                        {currentCategory == "All"
                          ? "Category"
                          : currentCategory}
                      </span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>
                    <div
                      className={`toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-drop1-toggle ${
                        currentDropdown == "category" ? "-is-el-visible" : ""
                      } `}
                    >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div
                          onClick={() => {
                            setCurrentCategory("All");
                            setCurrentDropdown("");
                          }}
                          className={`d-block js-dropdown-link cursor ${
                            currentCategory == "All" ? "activeMenu" : ""
                          } `}
                        >
                          All
                        </div>
                        {categories.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => {
                              setCurrentCategory(cat.name); // ← ici aussi : .name
                              setCurrentDropdown("");
                            }}
                            className={`d-block js-dropdown-link cursor ${
                              currentCategory === cat.name ? "activeMenu" : ""
                            }`}
                          >
                            {cat.name}
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row y-gap-30 justify-start pt-50"
          data-aos="fade-right"
          data-aos-offset="80"
          data-aos-duration={800}
        >
          {pageItems.slice(0, 8).map((elm, i) => {
            // Calculer la note moyenne à partir des feedbacks
            let avgRating = "N/A";
            if (elm.feedbacks && elm.feedbacks.length > 0) {
              const sum = elm.feedbacks.reduce(
                (acc, fb) => acc + (parseFloat(fb.rating) || 0),
                0
              );
              avgRating = (sum / elm.feedbacks.length).toFixed(1);
            }
            const chapterCount = elm.chapitres ? elm.chapitres.length : 0;
            const lessonCount = elm.chapitres
              ? elm.chapitres.reduce(
                  (acc, ch) =>
                    acc +
                    (ch.lessons && Array.isArray(ch.lessons)
                      ? ch.lessons.length
                      : 0),
                  0
                )
              : 0;
            return (
                  <div className="col-lg-3 col-md-6">
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
                              {chapterCount} chapitre
                              </div>
                            </div>
                            <div className="d-flex items-center">
                              <div className="mr-8">
                                <img
                                  src="/assets/img/coursesCards/icons/1.svg"
                                  alt="icon"
                                />
                              </div>
                              <div className="text-14 lh-1">
                              {lessonCount} lesson
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
                          </div>
                          <div className="text-20 text-dark-1" style={{ marginLeft: "180px" }}>${elm.price}</div>
                        </div>
                      </div>
                  </div>
            //   <div key={i} className="col-lg-3 col-md-6">
            //     <div className="coursesCard -type-1 rounded-8 bg-white shadow-3">
            //       <div className="relative">
            //         <div className="coursesCard__image overflow-hidden rounded-top-8">
            //           <img
            //             className="w-1/1"
            //             src={
            //               elm.imageSrc
            //                 ? "/" + elm.imageSrc
            //                 : "/assets/img/coursesCards/card2.jpg"
            //             }
            //             alt="image"
            //           />
            //           <div className="coursesCard__image_overlay rounded-top-8"></div>
            //         </div>
            //       </div>
            //       <div className="h-100 pt-20 pb-15 px-30">
            //         <div className="d-flex items-center">
            //           {/* Affichage du rating sous forme d'étoiles */}
            //           <div className="text-14 lh-1 text-yellow-1 mr-10">
            //             {elm.feedbacks && elm.feedbacks.length > 0
            //               ? (
            //                   elm.feedbacks.reduce((acc, fb) => acc + (parseFloat(fb.rating) || 0), 0) /
            //                   elm.feedbacks.length
            //                 ).toFixed(1)
            //               : "N/A"}
            //           </div>
            //           <div className="d-flex x-gap-5 items-center">
            //             <Star
            //               star={
            //                 elm.feedbacks && elm.feedbacks.length > 0
            //                   ? (
            //                       elm.feedbacks.reduce((acc, fb) => acc + (parseFloat(fb.rating) || 0), 0) /
            //                       elm.feedbacks.length
            //                     )
            //                   : 0
            //               }
            //             />                      </div>
            //           {/* Pas de ratingCount ici */}
            //         </div>
            //         <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
            //           <Link className="linkCustom" to={`/courses-single-2/${elm.id}`}>
            //             {elm.titre}
            //           </Link>
            //         </div>
            //         <div className="d-flex x-gap-10 items-center pt-10">
            //           <div className="d-flex items-center">
            //             <div className="mr-8">
            //               <img
            //                 src="/assets/img/coursesCards/icons/1.svg"
            //                 alt="icon"
            //               />
            //             </div>
            //             <div className="text-14 lh-1">
            //             {chapterCount} chapitre
            //             </div>
            //           </div>
            //           <div className="d-flex items-center">
            //             <div className="mr-8">
            //               <img
            //                 src="/assets/img/coursesCards/icons/1.svg"
            //                 alt="icon"
            //               />
            //             </div>
            //             <div className="text-14 lh-1">
            //             {lessonCount} lesson
            //             </div>
            //           </div>
            //           <div className="d-flex items-center">
            //             <div className="mr-8">
            //               <img
            //                 src="/assets/img/coursesCards/icons/2.svg"
            //                 alt="icon"
            //               />
            //             </div>
            //             <div className="text-14 lh-1">{elm.duree || "N/A"}</div>
            //           </div>
            // </div>
            //         {/* <div className="d-flex x-gap-10 items-center pt-10">
            //           <div className="d-flex items-center">
            //             <div className="mr-8">
            //               <img
            //                 src={Icon1}
            //                 alt="icon"
            //               />
            //             </div>
            //             <div className="text-14 lh-1">
            //               {chapterCount} chapitre
            //             </div>
            //           </div>
            //           <div className="d-flex items-center">
            //             <div className="mr-8">
            //               <img
            //                 src={"assets/img/coursesCards/icons/2.svg"}
            //                 alt="icon"
            //               />
            //             </div>
            //             <div className="text-14 lh-1">
            //               {lessonCount} lesson
            //             </div>
            //           </div>
            //           <div className="d-flex items-center">
            //             <div className="mr-8">
            //               <img
            //                 src={"assets/img/coursesCards/icons/3.svg"}
            //                 alt="icon"
            //               />
            //             </div>
            //             <div className="text-14 lh-1">
            //               {elm.duree}
            //             </div>
            //           </div>
            //         </div> */}
            //         <div className="text-20 text-dark-1" style={{ marginLeft:"100px"}}>{elm.price} $$</div>
            //       </div>
            //     </div>
            //   </div>
            );
          })}
        </div>

        <div className="row justify-center pt-60 lg:pt-40">
          <div className="col-auto">
            <Link
              to="/courses-list-5"
              className="button -md -outline-purple-1 text-purple-1"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
