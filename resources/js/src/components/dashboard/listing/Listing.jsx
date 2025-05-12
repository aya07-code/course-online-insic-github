import React from "react";
import Media from "./Media";
export default function Listing() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Create New Course</h1>
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur.
            </div>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>

              <div className="py-30 px-30">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row y-gap-30"
                  action="#"
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Title*
                    </label>

                    <input
                      required
                      type="text"
                      placeholder="Learn Figma - UI/UX Design Essential Training"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Description*
                    </label>

                    <textarea
                      required
                      placeholder="Description"
                      rows="7"
                    ></textarea>
                  </div>
                  <div className="form-upload col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    PDF URL*
                    </label>
                    <div className="form-upload__wrap">
                      <input required type="text" name="name" placeholder={"Video-1.mp3"}/>
                      <button className="button -dark-3 text-white">
                        <label style={{ cursor: "pointer" }} htmlFor="imageUpload2">
                        Upload PDF*
                        </label>
                        <input required id="imageUpload2" type="file" accept="application/pdf" style={{ display: "none" }}/>
                      </button>
                    </div>
                  </div>
                  <div className="form-upload col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Video URL*
                    </label>
                    <div className="form-upload__wrap">
                      <input required type="text" name="name" placeholder={"Video-1.mp3"}/>
                      <button className="button -dark-3 text-white">
                        <label style={{ cursor: "pointer" }} htmlFor="imageUpload2">
                        Upload Video*
                        </label>
                        <input required id="imageUpload2" type="file" accept="video/*" style={{ display: "none" }}/>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Course Category*
                    </label>

                    <input required type="text" placeholder="Select" />
                  </div>
                </form>

                <div className="row y-gap-20 justify-between pt-15">
                  <div className="col-auto">
                    <button className="button -md -outline-purple-1 text-purple-1">
                      create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
