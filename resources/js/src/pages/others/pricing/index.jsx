
import Preloader from "@/components/common/Preloader";
import Pricing from "@/components/common/Pricing";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Mambership plans || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function PricingPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ marginTop: "50px" }}>
        <Pricing />
        <FooterOne />
      </div>
    </div>
  );
}
