import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { learnList } from "@/data/aboutcourses";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Overview({ formation }) {
  return (
    <div id="overview" className="pt-60 lg:pt-40 to-over">
      <h4 className="text-18 fw-500">Description</h4>

      <div>
        <div>
          <p className="">
            {formation.long_description &&
              formation.long_description.split('\n').map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))
            }
          </p>
        </div>
      </div>

      <div className="mt-60">
        <h4 className="text-20 mb-30">What you'll learn</h4>
        <div className="row x-gap-100 justfiy-between">
          <div className="col-md-6">
            <div className="y-gap-20">
              {learnList.slice(0, 6).map((elm, i) => (
                <div key={i} className="d-flex items-center">
                  <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ transform: "scale(0.7)", opacity: "0.7" }}
                    />
                  </div>
                  <p>{elm}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <div className="y-gap-20">
              {learnList.slice(6).map((elm, i) => (
                <div key={i} className="d-flex items-center">
                  <div className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ transform: "scale(0.7)", opacity: "0.7" }}
                    />
                  </div>
                  <p>{elm}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
