import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsOne from "@/components/courseSingle/CourseDetailsOne";
import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Couese-single-1 || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function CourseSinglePage1() {
  let params = useParams();
  <Preloader />;
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Header />
      <div className="content-wrapper  js-content-wrapper ">
        <PageLinks />
        <CourseDetailsOne id={params.id} />
        <CourseSlider />
        <FooterOne />
      </div>
    </div>
  );
}
