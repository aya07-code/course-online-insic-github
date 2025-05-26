import React, { useEffect, useState } from "react";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowLeft, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Ajout

export default function LessonManagement() {
  const { id } = useParams(); // ID du chapitre
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null); // State for the lesson being edited
  const [lessonFormData, setLessonFormData] = useState({ title: "", content: "", file: null }); // Form data
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const titre = queryParams.get("titre");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`/api/lessons?chapitre_id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLessons(response.data.data);
      } catch (err) {
        console.error("Error fetching lessons:", err);
        setError("Failed to load lessons.");
      }
    };

    fetchLessons();
  }, [id]);

  const handleAddOrEditLesson = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");

    const formData = new FormData();
    formData.append("title", lessonFormData.title);
    formData.append("content", lessonFormData.content);
    formData.append("chapitre_id", id);
    formData.append("type", lessonFormData.type);

    // N'ajoutez le fichier que si un nouveau fichier est sélectionné
    if (lessonFormData.file) {
      formData.append("file", lessonFormData.file);
    }

    try {
      if (editingLesson) {
        await axios.post(`/api/lessons/${editingLesson}?_method=PUT`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        setLessons((prevLessons) =>
          prevLessons.map((lesson) =>
            lesson.id === editingLesson
              ? { ...lesson, ...lessonFormData }
              : lesson
          )
        );
      } else {
        const response = await axios.post(`/api/lessons`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        setLessons([...lessons, response.data.data || response.data]);
      }

      // Reset
      setEditingLesson(null);
      setLessonFormData({ title: "", content: "", file: null, type: "" });
    } catch (err) {
      console.error("Error saving lesson:", err);
      setError("Failed to save lesson.");
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`/api/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== lessonId));
      Swal.fire('Supprimé !', 'La leçon a été supprimée.', 'success');
    } catch (err) {
      console.error("Error deleting lesson:", err);
      setError("Failed to delete lesson.");
      Swal.fire('Erreur', "Erreur lors de la suppression.", 'error');
    }
  };

  const handleEditLesson = (lesson) => {
    setLessonFormData({
      title: lesson.title,
      content: lesson.content,
      file: null, // Ne pas pré-remplir le fichier
      type: lesson.type,
    });
    setEditingLesson(lesson.id);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setLessonFormData({ ...lessonFormData, file: files[0] });
    } else {
      setLessonFormData({ ...lessonFormData, [name]: value });
    }
  };

  return (
    <div style={{ marginTop: "30px", width: "100%" }}>
      <div className="bg-light-4" style={{ marginTop: "50px", padding: "50px", borderRadius: "10px" }}>
        <button
          className="button -md -outline-purple-1 text-purple-1 mb-20"
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Retour à la liste des chapitres
        </button>
        <h2 style={{ marginBottom: "50px" }}>Leçons du chapitre : <em style={{ color: "#6440fb", fontFamily: "Times New Roman, Times, serif" }}>{titre}</em></h2>
        {error && <p className="text-red-500">{error}</p>}

        {/* Formulaire d'ajout/modification */}
        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="py-30 px-30">
                <h6 className="text-30 lh-12 fw-700" style={{ marginBottom: "20px" }}>
                  {editingLesson ? "Modifier la Leçon" : "Créer une Nouvelle Leçon"}
                </h6>
                <form onSubmit={handleAddOrEditLesson} className="contact-form row y-gap-30">
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Titre de la Leçon</label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Titre de la leçon"
                      value={lessonFormData.title}
                      onChange={handleFormChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Contenu</label>
                    <textarea
                      required
                      name="content"
                      placeholder="Contenu de la leçon"
                      rows="7"
                      value={lessonFormData.content}
                      onChange={handleFormChange}
                      className="form-control"
                    ></textarea>
                  </div>

                  <div className="col-12">
                  <div className="form-upload col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Fichier (PDF, Vidéo, Image)
                    </label>
                    <div className="form-upload__wrap">
                      <select
                        name="type"
                        className="form-control"
                        onChange={handleFormChange}
                        value={lessonFormData.type}
                      >
                        <option value="pdf">PDF</option>
                        <option value="video">Vidéo</option>
                        <option value="img">Image</option>
                      </select>
                      <button
                        type="button"
                        className="button -dark-3 text-white"
                        onClick={() => document.getElementById("imageUpload2").click()}
                        style={{ marginLeft: "10px" }}
                      >
                        Upload Files
                      </button>
                      <input
                        id="imageUpload2"
                        type="file"
                        name="file"
                        accept=".pdf,.mp4,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={handleFormChange}
                        className="form-control"
                        required={!editingLesson}
                      />
                      {/* Affichez le nom du fichier sélectionné */}
                      {lessonFormData.file && (
                        <span style={{ marginLeft: "10px" }}>{lessonFormData.file.name}</span>
                      )}
                    </div>
                  </div>
                  </div>

                  <div className="row y-gap-20 justify-between pt-15">
                    <div className="col-auto">
                      <button type="submit" className="button -md -outline-purple-1 text-purple-1">
                        {editingLesson ? "Modifier" : "Créer"}
                      </button>
                      {editingLesson && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingLesson(null);
                            setLessonFormData({ title: "", content: "", file: null });
                          }}
                          className="button -md text-red-600 ml-15"
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des leçons */}
        <div className="table-responsive scroll-sm" style={{ marginTop: "50px" }}>
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Contenu</th>
                <th scope="col">Type</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>{lesson.title}</td>
                  <td>{lesson.content}</td> 
                  <td>{lesson.type}</td>
                  <td>
                    <div className="d-inline-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800"
                        style={{ marginRight: "15px", fontSize: "18px", cursor: "pointer" }}
                        onClick={() => handleEditLesson(lesson)}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "#28a745" }} />
                      </button>
                      <button
                        type="button"
                        className="text-xl text-red-600 hover:text-red-800"
                        style={{ fontSize: "18px", cursor: "pointer" }}
                        onClick={() => handleDeleteLesson(lesson.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545" }} />
                      </button>
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800 "
                        style={{ marginLeft: "15px", fontSize: "18px", cursor: "pointer" }}
                        onClick={() => {
                          navigate(`/lesson-single-2/${lesson.id}`, {
                            state: {
                              title: lesson.title,
                              description: lesson.description,
                            },
                          });
                        }} >
                        <FontAwesomeIcon icon={faEye} style={{ color: "#0d6efd" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
