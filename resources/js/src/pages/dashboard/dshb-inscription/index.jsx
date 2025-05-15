import Preloader from "@/components/common/Preloader";
import Inscription from "@/components/dashboard/Settings/Inscription";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Dashboard-settings || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};
export default function DshbSettingsPage() {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <Inscription />
          </div>
        </div>
      </main>
    </div>
  );
}
