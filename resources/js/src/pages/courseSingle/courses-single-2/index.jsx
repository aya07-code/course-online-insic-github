import Preloader from "@/components/common/Preloader";
import CourseDetailsTwo from "@/components/courseSingle/CourseDetailsTwo";
import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Couese-single-2 || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function CourseSinglePage2() {
    const {id} = useParams(); 
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrappe" style={{paddingTop:"60px"}} >
        <CourseDetailsTwo id={id}/>
        <CourseSlider />
        <FooterOne />
      </div>
    </div>
  );
}
