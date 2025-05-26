import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoriesTwo() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Charger les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Découpage pour garder le style d'origine (4, 1, 2)
  const firstCol = categories.slice(0, 4);
  const middleCol = categories[4] ? [categories[4]] : [];
  const lastCol = categories.slice(5, 7);

  return (
    <section className="layout-pt-lg layout-pb-lg " style={{ marginTop: "-100px" }}>
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Top Categories</h2>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          <div className="col-lg-6">
            <div className="row y-gap-30">
              {firstCol.map((cat, i) => (
                <Link
                  to={`/courses-list-5`}
                  className="col-md-6 linkCustomTwo"
                  key={cat.id}
                >
                  <div className="categoryCard -type-1">
                    <div className="categoryCard__image">
                      <div
                        className="bg-image ratio ratio-30:16 js-lazy"
                        style={{ backgroundImage: `url(${cat.imageSrc || "/assets/img/categories/default.jpg"})` }}
                      ></div>
                    </div>

                    <div className="categoryCard__content text-center">
                      <h4 className="categoryCard__title text-17 lh-15 fw-500 text-white">
                        {cat.name}
                      </h4>
                      <div className="categoryCard__subtitle text-13 text-white lh-1 mt-5">
                        {/* Optionnel: nombre de formations si dispo */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="row y-gap-30">
              {middleCol.length > 0 && (
                <div className="col-12">
                  <Link to={`/courses-list-5`} className="categoryCard -type-1">
                    <div className="categoryCard__image">
                      <div
                        className="bg-image ratio ratio-30:35 js-lazy"
                        style={{
                          backgroundImage: `url(${middleCol[0].imageSrc || "/assets/img/categories/default.jpg"})`,
                        }}
                      ></div>
                    </div>
                    <div className="categoryCard__content text-center">
                      <h4 className="categoryCard__title text-17 lh-15 fw-500 text-white">
                        {middleCol[0].name}
                      </h4>
                      <div className="categoryCard__subtitle text-13 text-white lh-1 mt-5">
                        {/* Optionnel: nombre de formations si dispo */}
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="row y-gap-30">
              {lastCol.map((cat, i) => (
                <Link
                  to={`/courses-list-5`}
                  key={cat.id}
                  className="col-lg-12"
                >
                  <div className="categoryCard -type-1">
                    <div className="categoryCard__image">
                      <div
                        className="bg-image ratio ratio-30:16 js-lazy"
                        style={{ backgroundImage: `url(${cat.imageSrc || "/assets/img/categories/default.jpg"})` }}
                      ></div>
                    </div>
                    <div className="categoryCard__content text-center">
                      <h4 className="categoryCard__title text-17 lh-15 fw-500 text-white">
                        {cat.name}
                      </h4>
                      <div className="categoryCard__subtitle text-13 text-white lh-1 mt-5">
                        {/* Optionnel: nombre de formations si dispo */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
