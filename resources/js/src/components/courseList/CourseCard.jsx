import React from "react";
import { Link } from "react-router-dom";
import Star from "../common/Star";

export default function CourseCard({ elm }) {
  let avgRating = "N/A";
  if (elm.feedbacks && elm.feedbacks.length > 0) {
    const sum = elm.feedbacks.reduce(
      (acc, fb) => acc + (parseFloat(fb.rating) || 0),
      0
    );
    avgRating = (sum / elm.feedbacks.length).toFixed(1);
  }

  const chapterCount = elm.chapitres ? elm.chapitres.length : 0;
  const lessonCount = elm.chapitres
    ? elm.chapitres.reduce(
        (acc, ch) =>
          acc +
          (ch.lessons && Array.isArray(ch.lessons) ? ch.lessons.length : 0),
        0
      )
    : 0;

  return (
    <div className="col-lg-3 col-md-6">
        <div className="coursesCard -type-1 ">
          <div className="relative">
            <div className="coursesCard__image overflow-hidden rounded-8">
              <img
                className="w-1/1"
                src={
                  elm.imageSrc
                    ? "/" + elm.imageSrc
                    : "/assets/img/coursesCards/card2.jpg"
                }
                alt="image"
              />
              <div className="coursesCard__image_overlay rounded-8"></div>
            </div>
            <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3"></div>
          </div>

          <div className="h-100 pt-15">
            <div className="d-flex items-center">
              <div className="text-14 lh-1 text-yellow-1 mr-10">
                {/* Affiche la note moyenne si disponible */}
                {elm.feedbacks && elm.feedbacks.length > 0
                  ? (
                      elm.feedbacks.reduce((acc, fb) => acc + (parseFloat(fb.rating) || 0), 0) /
                      elm.feedbacks.length
                    ).toFixed(1)
                  : "N/A"}
              </div>
              <div className="d-flex x-gap-5 items-center">
                <Star
                  star={
                    elm.feedbacks && elm.feedbacks.length > 0
                      ? (
                          elm.feedbacks.reduce((acc, fb) => acc + (parseFloat(fb.rating) || 0), 0) /
                          elm.feedbacks.length
                        )
                      : 0
                  }
                />
              </div>
            </div>

            <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
              <Link
                className="linkCustom"
                to={`/courses-single-2/${elm.id}`}
              >
                {elm.titre}
              </Link>
            </div>

            <div className="d-flex x-gap-10 items-center pt-10">
              <div className="d-flex items-center">
                <div className="mr-8">
                  <img
                    src="/assets/img/coursesCards/icons/1.svg"
                    alt="icon"
                  />
                </div>
                <div className="text-14 lh-1">
                {chapterCount} chapitre
                </div>
              </div>
              <div className="d-flex items-center">
                <div className="mr-8">
                  <img
                    src="/assets/img/coursesCards/icons/1.svg"
                    alt="icon"
                  />
                </div>
                <div className="text-14 lh-1">
                {lessonCount} lesson
                </div>
              </div>
              <div className="d-flex items-center">
                <div className="mr-8">
                  <img
                    src="/assets/img/coursesCards/icons/2.svg"
                    alt="icon"
                  />
                </div>
                <div className="text-14 lh-1">{elm.duree || "N/A"}</div>
              </div>
            </div>
            <div className="text-20 text-dark-1" style={{ marginLeft: "180px" }}>${elm.price}</div>
          </div>
        </div>
    </div>
  );
}
