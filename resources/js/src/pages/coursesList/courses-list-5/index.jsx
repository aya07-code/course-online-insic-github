import Preloader from "@/components/common/Preloader";
import CourseListFive from "@/components/courseList/CourseListFive";
import FooterOne from "@/components/layout/footers/FooterOne";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Course-list insic - Elevate your e-learning content with insic",
  description:
    " Elevate your e-learning content with insic, the ultimate course-list template. Discover a world of possibilities for your online courses.",
};

export default function CourseListPage5() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderTwo />
      {/* <Header /> */}
      <div className="content-wrapper  js-content-wrapper overflow-hidden" style={{ marginTop: "-60px" }}>
        <CourseListFive />
        <FooterOne />
      </div>
    </div>
  );
}
