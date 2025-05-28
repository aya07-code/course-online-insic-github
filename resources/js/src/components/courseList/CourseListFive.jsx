import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PaginationTwo from "../common/PaginationTwo";
import CourseCard from "./CourseCard";

export default function CourseListFive() {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("/api/formations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (err) {
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
        <div className="row y-gap-15 justify-between items-center page-header -type-1" style={{ marginLeft: "70px" , marginRight: "70px" }}>
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="page-header__title">All Courses</h2>
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
      {/* <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">All Courses</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="layout-pt-md layout-pb-lg" style={{ marginTop: "-50px" }}>
        <div className="container">
          <div className="row y-gap-30">
            {courses
              .slice((pageNumber - 1) * 12, pageNumber * 12)
              .map((course, index) => (
                <CourseCard key={index} elm={course} />
              ))}
          </div>

          <div className="row justify-center pt-90 lg:pt-50">
            <div className="col-auto">
              <PaginationTwo
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                data={courses}
                pageCapacity={12}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
