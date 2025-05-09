import Preloader from "@/components/common/Preloader";

import ContactTwo from "@/components/contacts/ContactTwo";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Contact-2 || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function ContactPage2() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <ContactTwo />
        <FooterOne />
      </div>
    </div>
  );
}
