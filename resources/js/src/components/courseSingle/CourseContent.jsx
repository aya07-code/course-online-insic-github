import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function CourseContent({ formation }) {
  const [activeItemId, setActiveItemId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Sécurité si pas de chapitres
  const chapitres = formation?.chapitres || [];

  // Calcul du nombre total de leçons
  const totalLessons = chapitres.reduce(
    (acc, ch) => acc + (ch.lessons ? ch.lessons.length : 0),
    0
  );

  return (
    <>
      <div id="course-content" className="pt-60 lg:pt-40">
        <h2 className="text-20 fw-500">Course Content</h2>

        <div className="d-flex justify-between items-center mt-30">
          <div className="">
            {chapitres.length} chapitre
            {chapitres.length > 1 ? "s" : ""} • {totalLessons} lesson
            {totalLessons > 1 ? "s" : ""}
          </div>
        </div>

        <div className="mt-10">
          <div className="accordion -block-2 text-left js-accordion">
            {chapitres.map((ch, i) => (
              <div
                key={ch.id}
                className={`accordion__item ${
                  activeItemId === ch.id ? "is-active" : ""
                } `}
              >
                <div
                  onClick={() =>
                    setActiveItemId((pre) => (pre === ch.id ? 0 : ch.id))
                  }
                  className="accordion__button py-20 px-30 bg-light-4"
                >
                  <div className="d-flex items-center">
                    <div className="accordion__icon">
                      <div className="icon">
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                      <div className="icon">
                        <FontAwesomeIcon icon={faChevronUp} />
                      </div>
                    </div>
                    <span className="text-17 fw-500 text-dark-1">
                      {ch.title}
                    </span>
                  </div>
                </div>

                <div
                  className="accordion__content"
                  style={activeItemId === ch.id ? { maxHeight: "700px" } : {}}
                >
                  <div className="accordion__content__inner px-30 py-30">
                    <div className="y-gap-20">
                      {ch.lessons && ch.lessons.length > 0 ? (
                        ch.lessons.map((lesson, index) => (
                          <div key={lesson.id} className="d-flex justify-between">
                            <div className="d-flex items-center">
                              <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                                <div className="icon-play text-9"></div>
                              </div>
                              <div>{lesson.title}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-secondary">Aucune leçon</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
