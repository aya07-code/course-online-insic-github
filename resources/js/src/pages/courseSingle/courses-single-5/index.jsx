import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsFive from "@/components/courseSingle/CourseDetailsFive";

import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Couese-single-5 || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function CourseSinglePage5() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper">
        <PageLinks />
        <CourseDetailsFive id={params.id} />
        <CourseSlider />
        <FooterOne />
      </div>
    </div>
  );
}
