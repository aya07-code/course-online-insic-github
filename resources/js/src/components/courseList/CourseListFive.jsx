import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PaginationTwo from "../common/PaginationTwo";
import CourseCard from "./CourseCard";

export default function CourseListFive() {
  const [courses, setCourses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

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
      <section className="page-header -type-1">
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
      </section>

      <section className="layout-pt-md layout-pb-lg">
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
