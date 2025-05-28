import About from "@/components/about/About";
import Preloader from "@/components/common/Preloader";
import TestimonialsOne from "@/components/common/TestimonialsOne";
import WhyCourse from "@/components/homes/WhyCourse";
import FooterOne from "@/components/layout/footers/FooterOne";
import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "About-1 || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function AboutPage1() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderTwo />
      {/* <Header /> */}
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ marginTop: "-60px" }}>
        <About />
        <WhyCourse />
        <TestimonialsOne />
        <FooterOne />
      </div>
    </div>
  );
}
