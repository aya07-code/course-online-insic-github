import './styles/index.scss';
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Context from "@/context/Context";
import HomePage2 from "./pages/homes/home-2";
import AboutPage1 from "./pages/about/about-1";
import CourseListPage5 from "./pages/coursesList/courses-list-5";
import CourseSinglePage6 from "./pages/courseSingle/courses-single-6/page";
import CourseCartPage from "./pages/cartPages/course-cart";
import CourseCheckoutPage from "./pages/cartPages/course-checkout";
import LessonSinglePage2 from "./pages/aboutCourses/lesson-single-2";
// import DashboardPage from "./pages/dashboard/dashboard";
// import DshbCoursesPage from "./pages/dashboard/dshb-courses";
// import DshbBookmarksPage from "./pages/dashboard/dshb-bookmarks";
// import DshbListingPage from "./pages/dashboard/dshb-listing";
// import DshbReviewsPage from "./pages/dashboard/dshb-reviews";
// import DshbSettingsPage from "./pages/dashboard/dshb-settings";
// import DshbAdministrationPage from "./pages/dashboard/dshb-administration";
// import DshbCalenderPage from "./pages/dashboard/dshb-calendar";
// import DshbDashboardPage from "./pages/dashboard/dshb-dashboard";
// import DshbMessagesPage from "./pages/dashboard/dshb-messages";
// import DshbPartcipentPage from "./pages/dashboard/dshb-participants";
// import DshbQuizPage from "./pages/dashboard/dshb-quiz";
import PricingPage from "./pages/others/pricing";
import ContactPage2 from "./pages/contacts/contact-2";
import LoginPage from "./pages/others/login";
import SignupPage from "./pages/others/signup";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import NotFoundPage from "./pages/not-found";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <>
      <Context>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage2 />} />
              <Route path="home-2" element={<HomePage2 />} />
              <Route path="about-1" element={<AboutPage1 />} />
              <Route path="courses-list-5" element={<CourseListPage5 />} />
              <Route path="courses-single-6" element={<CourseSinglePage6 />} />
              <Route path="course-cart" element={<CourseCartPage />} />
              <Route path="course-checkout" element={<CourseCheckoutPage />} />
              <Route path="lesson-single-2" element={<LessonSinglePage2 />} />

              {/* <Route path="dashboard" element={<DashboardPage />} />
              <Route path="dshb-courses" element={<DshbCoursesPage />} />
              <Route path="dshb-bookmarks" element={<DshbBookmarksPage />} />
              <Route path="dshb-listing" element={<DshbListingPage />} />
              <Route path="dshb-reviews" element={<DshbReviewsPage />} />
              <Route path="dshb-settings" element={<DshbSettingsPage />} />
              <Route
                path="dshb-administration"
                element={<DshbAdministrationPage />}
              /> */}
              {/* <Route path="dshb-assignment" element={<DshbAssignmentPage />} /> */}
              {/* <Route path="dshb-calendar" element={<DshbCalenderPage />} />
              <Route path="dshb-dashboard" element={<DshbDashboardPage />} /> */}
              {/* <Route path="dshb-dictionary" element={<DshbDictionaryPage />} />
              <Route path="dshb-forums" element={<DshbForumsPage />} />
              <Route path="dshb-grades" element={<DshbGradesPage />} /> */}
              {/* <Route path="dshb-messages" element={<DshbMessagesPage />} />
              <Route
                path="dshb-participants"
                element={<DshbPartcipentPage />}
              /> */}
              {/* <Route path="dshb-quiz" element={<DshbQuizPage />} /> */}
              {/* <Route path="dshb-survey" element={<DshbServeyPage />} /> */}

              {/* <Route path="event-list-1" element={<EventListPage1 />} />
              <Route path="event-list-2" element={<EventListPage2 />} />
              <Route path="events/:id" element={<EventSingPage />} />
              <Route path="event-cart" element={<EventCartPage />} />
              <Route path="event-checkout" element={<EventCheckoutPage />} />

              <Route path="blog-list-1" element={<BlogListpage1 />} />
              <Route path="blog-list-2" element={<BlogListpage2 />} />
              <Route path="blog-list-3" element={<BlogListpage3 />} />
              <Route path="blogs/:id" element={<BlogdetailsPage />} /> */}
              <Route path="pricing" element={<PricingPage />} />
              <Route path="contact-2" element={<ContactPage2 />} />
              <Route path="not-found" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
          </Routes>
          <ScrollTopBehaviour />
        </BrowserRouter>
      </Context>
    </>
  );
}

export default App;
