import { states } from "@/data/dashboardS";
import React, { useEffect, useState } from "react";
import Charts from "./ChartsS";
import PieChartComponent from "./PieCharts";

export default function DashboardOne() {
  const [quizNotesResults, setQuizNotesResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    fetch("/api/test-quiz-notes-results-raw", {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuizNotesResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Grouper par formation
  const groupedByFormation = quizNotesResults
    .filter(
      row =>
        row.formation_titre &&
        row.chapitre_title &&
        row.quiz_title &&
        row.notes &&
        row.resultats
    )
    .reduce((acc, row) => {
      if (!acc[row.formation_titre]) acc[row.formation_titre] = [];
      acc[row.formation_titre].push(row);
      return acc;
    }, {});

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
          </div>
        </div>

        <div className="row y-gap-30">
          {states.map((elm, i) => (
            <div key={i} className="col-xl-4 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">{elm.title}</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    {elm.value}
                  </div>
                </div>

                <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>              </div>
            </div>
          ))}
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="col-xl-8 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-18 lh-1 fw-500">Quiz réussis par mois</h2>
              </div>
              <div className="py-40 px-30">
                <Charts />
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Formations suivis par mois</h2>
              </div>
              <div className="py-40 px-30">
                <PieChartComponent />
              </div>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="col-xl-12 col-md-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Notes/résultats des quiz</h2>
              </div>
              <div className="py-30 px-30">
                {loading ? (
                  <div>Chargement...</div>
                ) : Object.keys(groupedByFormation).length === 0 ? (
                  <div>Aucune donnée</div>
                ) : (
                  Object.entries(groupedByFormation).map(([formation, rows], idx) => (
                    <div key={idx} style={{ marginBottom: 32 }}>
                      <div className="fw-700 mb-10" style={{ fontSize: 18, color: "#6c2eb9" }}>
                        {formation}
                      </div>
                      <table className="table table-bordered" style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Chapitre</th>
                            <th>Quiz</th>
                            <th>Note</th>
                            <th>Résultat</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i) => (
                            <tr key={i}>
                              <td>{row.chapitre_title}</td>
                              <td>{row.quiz_title}</td>
                              <td>{row.notes}</td>
                              <td>{row.resultats}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}