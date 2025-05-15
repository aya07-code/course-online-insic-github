import Preloader from "@/components/common/Preloader";
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";
import LoginForm from "@/components/others/LoginForm";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Login || Insic",
  description:
    "Elevate your e-learning content with Insic.",
};
export default function LoginPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
