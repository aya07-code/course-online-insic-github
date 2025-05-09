import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";

import React from "react";
import CourseCheckOut from "@/components/cartsAndCheckout/CourseCheckout";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Course-checkout || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};
export default function CourseCheckoutPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ paddingTop: "80px" }}>
        <CourseCheckOut />
        <FooterOne />
      </div>
    </div>
  );
}
