import ModeChanger from "@/components/homes/ModeChanger";
import HomeNine from "@/components/homes/homepageWrappers/HomeNine";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Home-10 || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};
export default function HomePage10() {
  return (
    <div>
      <MetaComponent meta={metadata} />
      <ModeChanger />
      <HomeNine />
    </div>
  );
}
