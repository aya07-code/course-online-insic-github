import Preloader from "@/components/common/Preloader";
import Header from "@/components/layout/headers/Header";
import MetaComponent from "@/components/common/MetaComponent";
import FormationDetail from "../../dashboard/dshb-lesson-create";

const metadata = {
  title:
    "Lesson-single-1 || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};

export default function LessonSinglePage2() {
  return (
    <div className="main-content  ">
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
