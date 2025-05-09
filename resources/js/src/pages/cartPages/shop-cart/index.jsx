import BlogsOne from "@/components/blogs/BlogsOne";
import ShopCart from "@/components/cartsAndCheckout/ShopCart";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";

import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Shop-cart || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};
export default function ShopCartPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <ShopCart />

        <FooterOne />
      </div>
    </div>
  );
}
