import EditProfileIn from "./EditProfileIn"; // Ensure the file name matches exactly

export default function Inscription() {
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Inscription</h1>
          </div>
        </div>

        <div className="row y-gap-40" style={{ marginTop: "-80px" }}>
          <div className="col-12">
            <div className="tabs__content py-30 px-30 js-tabs-content">
              <EditProfileIn /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
