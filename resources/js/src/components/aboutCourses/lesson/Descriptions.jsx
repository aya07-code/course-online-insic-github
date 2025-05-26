import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Descriptions({ lessonId: propLessonId }) {
  const { state } = useLocation(); // récupération des données envoyées via navigate
  const params = useParams();
  const lessonId = propLessonId || params.id;
  const [lesson, setLesson] = useState(state || null); // Utilise d'abord les données si elles sont passées
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lesson) return; // Si les données sont déjà là, ne pas faire de fetch
    if (!lessonId) return;

    const fetchLesson = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`/api/lessons/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLesson(response.data.data || response.data);
      } catch (err) {
        setError("Impossible de charger la leçon.");
      }
    };

    fetchLesson();
  }, [lessonId, lesson]);

  if (error) {
    return <div className="mt-60 lg:mt-40 text-red-500">{error}</div>;
  }

  if (!lesson) {
    return <div className="mt-60 lg:mt-40">Chargement...</div>;
  }

  return (
    <div className="mt-60 lg:mt-40">
      <h2 className="text-24 fw-700 mb-20">{lesson.title}</h2>
      <p className="mb-10"><strong>Description :</strong> {lesson.description}</p>
    </div>
  );
}
