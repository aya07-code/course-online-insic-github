import HeaderTwo from "@/components/layout/headers/HeaderTwo";
import HeroTwo from "@/components/homes/heros/HeroTwo";

import CoursesThree from "../../../components/homes/courses/CoursesThree";
import FindLearningPath from "../../../components/homes/FindLearningPath";
import LearningSolutions from "../../../components/homes/LearningPath/LearningSolutions";
import CategoriesTwo from "@/components/homes/categories/CategoriesTwo";

import FooterTwo from "@/components/layout/footers/FooterTwo";
import Preloader from "@/components/common/Preloader";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Home",
  description:
    "Elevate your e-learning content with INSIC, the most impressive  for online courses",
};
export default function HomePage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderTwo />
      <div className="main-content overflow-hidden   ">
         <HeroTwo />
        <CoursesThree />
        <FindLearningPath />
        <LearningSolutions />
        <CategoriesTwo />
        <FooterTwo />
      </div>
    </>
  );
}
