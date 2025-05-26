import Preloader from "@/components/common/Preloader";
import FormationDetail from "../dash-formation-detail";
import Header from "@/components/layout/headers/Header";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Cashboard || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function DashboardPage() {
  return (
    <div className="main-content">
      <MetaComponent meta={metadata} />
        <Preloader />
        <Header />
        <div className="content-wrapper  js-content-wrapper overflow-hidden">
          <section className="layout-pt-lg layout-pb-lg lg:pt-40 lg:order-1">
            <div className="container">
              <div className="row justify-start marginCustom ">
                <FormationDetail />
              </div>
            </div>
          </section>
        </div>
    </div>
  );
}