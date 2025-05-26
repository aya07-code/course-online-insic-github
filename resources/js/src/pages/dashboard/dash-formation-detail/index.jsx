import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Ajout

export default function FormationDetail() {
  const { id } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const titre = queryParams.get("titre");
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null); // State for the chapter being edited
  const [editFormData, setEditFormData] = useState({ title: "", description: "" }); // Form data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`/api/chapitres?formation_id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChapters(response.data.data);
      } catch (err) {
        console.error("Error fetching chapters:", err);
        setError("Failed to load chapters.");
      }
    };

    fetchChapters();
  }, [id]);

  const handleDeleteChapter = async (chapterId) => {
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
      await axios.delete(`/api/chapitres/${chapterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChapters((prevChapters) => prevChapters.filter((chapter) => chapter.id !== chapterId));
      Swal.fire('Supprimé !', 'Le chapitre a été supprimé.', 'success');
    } catch (err) {
      console.error("Error deleting chapter:", err);
      setError("Failed to delete chapter.");
      Swal.fire('Erreur', "Erreur lors de la suppression.", 'error');
    }
  };

  const handleEditChapter = (chapter) => {
    setEditFormData({ 
      title: chapter.title,
      description: chapter.description, 
    }); 
     setEditingChapter(chapter.id);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");

    try {
      if (editingChapter) {
        await axios.put(`/api/chapitres/${editingChapter}`, {
          title: editFormData.title,
          description: editFormData.description,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChapters((prevChapters) =>
          prevChapters.map((chapter) =>
            chapter.id === editingChapter
              ? { ...chapter, title: editFormData.title, description: editFormData.description }
              : chapter
          )
        );
      } else {
        const response = await axios.post(`/api/chapitres`, {
          title: editFormData.title,
          description: editFormData.description,
          formation_id: id, 
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChapters([...chapters, response.data.data]); // Ajoute le nouveau chapitre à la liste
      }

      // Reset form
      setEditingChapter(null);
      setEditFormData({ title: "", description: "" });
    } catch (err) {
      console.error("Erreur lors de la requête :", err);
      setError("Échec de la sauvegarde du chapitre.");
    }
  };

  return (
    <div style={{ marginTop: "30px", width: "100%" }}>
      <div className="bg-light-4" style={{ marginTop: "50px", padding: "50px", borderRadius: "10px" }}>
        {/* Bouton pour revenir à la liste des formations */}
        <button
          className="button -md -outline-purple-1 text-purple-1 mb-20"
          onClick={() => navigate("/dshb-listing")}
          // onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Retour à la liste des formations
        </button>

        <h2 style={{ marginBottom: "50px" }}>Chapitres de la formation : <em style={{ color: "#6440fb", fontFamily: "Times New Roman, Times, serif" }}>{titre}</em></h2>
        {error && <p className="text-red-500">{error}</p>}

        {/* Formulaire d'ajout/modification */}
        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="py-30 px-30">
                <h6 className="text-30 lh-12 fw-700" style={{ marginBottom: "20px" }}>
                  {editingChapter ? "Modifier le Chapitre" : "Créer un Nouveau Chapitre"}
                </h6>
                <form onSubmit={handleEditFormSubmit} className="contact-form row y-gap-30">
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Titre du Chapitre</label>
                    <input
                      required
                      type="text"
                      name="title"
                      placeholder="Titre du chapitre"
                      value={editFormData.title}
                      onChange={handleEditFormChange}
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Description</label>
                    <textarea
                      required
                      name="description"
                      placeholder="Description du chapitre"
                      rows="7"
                      value={editFormData.description}
                      onChange={handleEditFormChange}
                      className="form-control"
                    ></textarea>
                  </div>

                  {error && <p className="text-red-500">{error}</p>}

                  <div className="row y-gap-20 justify-between pt-15">
                    <div className="col-auto">
                      <button type="submit" className="button -md -outline-purple-1 text-purple-1">
                        {editingChapter ? "Modifier" : "Créer"}
                      </button>
                      {editingChapter && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingChapter(null);
                            setEditFormData({ title: "", description: "" });
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

        {/* Liste des chapitres */}
        <div className="table-responsive scroll-sm" style={{ marginTop: "50px" }}>
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map((chapter) => (
                <tr key={chapter.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="text-md mb-0 fw-semibold">{chapter.title}</h6>
                      </div>
                    </div>
                  </td>
                  <td>{chapter.description || "N/A"}</td>
                  <td>
                    <div className="d-inline-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800 "
                        style={{ marginRight: "15px", fontSize: "18px", cursor: "pointer" }}
                        onClick={() => handleEditChapter(chapter)}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "#28a745" }} />
                      </button>
                      <button
                        type="button"
                        className="text-xl text-red-600 hover:text-red-800"
                        style={{ fontSize: "18px", cursor: "pointer" }}
                        onClick={() => handleDeleteChapter(chapter.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545" }} />
                      </button>
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800 "
                        style={{ marginLeft: "15px", fontSize: "18px", cursor: "pointer" }}
                        onClick={() => navigate(`/lesson-create/${chapter.id}?titre=${encodeURIComponent(chapter.title)}`)}
                      >
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
