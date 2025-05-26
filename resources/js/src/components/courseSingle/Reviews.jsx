import React from "react";
import Star from "../common/Star";

export default function Reviews({ feedbacks }) {
  // Calcul de la note moyenne
  let avgRating = 0;
  if (feedbacks && feedbacks.length > 0) {
    const sum = feedbacks.reduce(
      (acc, fb) => acc + (parseFloat(fb.rating) || 0),
      0
    );
    avgRating = (sum / feedbacks.length).toFixed(1);
  }

  // Calcul du pourcentage de chaque note (5 à 1)
  const total = feedbacks.length;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) =>
    feedbacks.filter((fb) => parseInt(fb.rating) === star).length
  );
  const ratingPercents = ratingCounts.map((count) =>
    total > 0 ? Math.round((count / total) * 100) : 0
  );

  // Pourcentage fixe basé sur le nombre d'étoiles (5=100%, 4=80%, ..., 1=20%)
  const starPercents = [5, 4, 3, 2, 1].map((star) => star * 20);

  return (
    <div id="reviews" className="pt-60 lg:pt-40">
      <div className="blogPost -comments">
        <div className="blogPost__content">
          <h2 className="text-20 fw-500">Student feedback</h2>
          <div className="row x-gap-10 y-gap-10 pt-30">
            <div className="col-md-4">
              <div className="d-flex items-center justify-center flex-column py-50 text-center bg-light-6 rounded-8">
                <div className="text-60 lh-11 text-dark-1 fw-500">
                  {avgRating || "N/A"}
                </div>
                <div className="d-flex x-gap-5 mt-10">
                  <Star star={avgRating} textSize={"text-11"} />
                </div>
                <div className="mt-10">Course Rating</div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="py-20 px-30 bg-light-6 rounded-8">
                <div className="row y-gap-15">
                  {[5, 4, 3, 2, 1].map((star, idx) => (
                    <div className="col-12" key={star}>
                      <div className="d-flex items-center">
                        <div className="progress-bar w-1/1 mr-15">
                          <div className="progress-bar__bg bg-light-12"></div>
                          <div
                            className="progress-bar__bar bg-purple-1"
                            style={{ width: `${starPercents[idx]}%` }}
                          ></div>
                        </div>
                        <div className="d-flex x-gap-5 pr-15">
                          <Star star={star} />
                        </div>
                        <div className="text-dark-1">{starPercents[idx]}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-20 fw-500 mt-60 lg:mt-40">Reviews</h2>
          <ul className="comments__list mt-30">
            {feedbacks && feedbacks.length > 0 ? (
              feedbacks.map((fb, i) => (
                <li key={fb.id || i} className="comments__item">
                  <div className="comments__item-inner md:direction-column">
                    <div className="comments__img mr-20">
                      <div
                        className="bg-image rounded-full js-lazy"
                        style={{
                          backgroundImage: `url(/assets/img/dashboard/edit/2j.jpg)`,
                        }}
                      ></div>
                    </div>
                    <div className="comments__body md:mt-15">
                      <div className="comments__header">
                        <h4 className="text-17 fw-500 lh-15">
                          {fb.user?.name || "Utilisateur"}
                          <span className="text-13 text-light-1 fw-400">
                            {/* Affichez la date si besoin */}
                          </span>
                        </h4>
                        <div className="d-flex x-gap-5 pr-15">
                          {/* Affiche au maximum 5 étoiles */}
                          <Star star={Math.min(5, fb.rating)} />
                        </div>
                      </div>
                      <h5 className="text-15 fw-500 mt-15">{fb.titre || ""}</h5>
                      <div className="comments__text mt-10">
                        <p>{fb.contenu}</p>
                      </div>
                      {/* Optionnel : boutons "helpful" */}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="comments__item">
                <div className="comments__item-inner">
                  <div className="comments__body">
                    <div className="comments__text mt-10">
                      <p>Aucun avis pour cette formation.</p>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
