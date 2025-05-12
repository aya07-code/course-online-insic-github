import React from "react";

export default function Quiz() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Quiz</h1>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-xl-9">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Quiz</h2>
              </div>

              <div className="py-30 px-30">
                <div className="border-light overflow-hidden rounded-8">
                  <div className="py-40 px-40 bg-dark-5">
                    <div className="d-flex justify-between">
                      <h4 className="text-18 lh-1 fw-500 text-white">
                        Question 1
                      </h4>
                    </div>
                    <div className="text-20 lh-1 text-white mt-15">
                      You are watching the TV news and see this appear on the
                      screen:
                    </div>
                  </div>
                  <div className="px-40 py-40">
                    <div className="form-radio d-flex items-center ">
                      <div className="radio">
                        <input type="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <div className="fw-500 ml-12">a. A tweet</div>
                    </div>

                    <div className="form-radio d-flex items-center mt-20">
                      <div className="radio">
                        <input type="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <div className="fw-500 ml-12">b. A hashtag</div>
                    </div>

                    <div className="form-radio d-flex items-center mt-20">
                      <div className="radio">
                        <input type="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <div className="fw-500 ml-12">c. A tag</div>
                    </div>
                  </div>
                </div>

                <div className="border-light overflow-hidden rounded-8">
                  <div className="py-40 px-40 bg-dark-5">
                    <div className="d-flex justify-between">
                      <h4 className="text-18 lh-1 fw-500 text-white">
                        Question 
                      </h4>
                    </div>
                    <div className="text-20 lh-1 text-white mt-15">
                      You are watching the TV news and see this appear on the
                      screen:
                    </div>
                  </div>
                  <div className="px-40 py-40">
                    <div className="form-radio d-flex items-center ">
                      <div className="radio">
                        <input type="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <div className="fw-500 ml-12">a. A tweet</div>
                    </div>

                    <div className="form-radio d-flex items-center mt-20">
                      <div className="radio">
                        <input type="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <div className="fw-500 ml-12">b. A hashtag</div>
                    </div>

                    <div className="form-radio d-flex items-center mt-20">
                      <div className="radio">
                        <input type="radio" />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <div className="fw-500 ml-12">c. A tag</div>
                    </div>
                  </div>
                </div> 

                <div className="d-flex justify-end">
                  <button className="button -md -dark-1 text-white -dark-button-white mt-40">
                    Finish
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-3">
            <div className="row y-gap-30">
              <div className="col-12">
                <div className="pt-20 pb-30 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                  <h5 className="text-17 fw-500 mb-30">Quiz Complite</h5>

                  <div className="d-flex items-center">
                    <div className="progress-bar w-1/1">
                      <div className="progress-bar__bg bg-light-3"></div>
                      <div className="progress-bar__bar bg-purple-1 w-1/4"></div>
                    </div>

                    <div className="d-flex y-gap-10 justify-between items-center ml-15">
                      <div>25%</div>
                    </div>
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
