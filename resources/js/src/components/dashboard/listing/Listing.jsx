import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Ajout

export default function Listing() {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    categories_id: "",
    duree: "",
    price: "",
  });
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [formations, setFormations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchFormations = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.get("/api/formations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormations(response.data);
    } catch (err) {
      console.error("Error fetching formations:", err);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
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

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("auth_token");
        await axios.delete(`/api/formations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFormations();
        Swal.fire('Supprimé !', 'Le cours a été supprimé.', 'success');
      } catch (err) {
        Swal.fire('Erreur', "Erreur lors de la suppression.", 'error');
      }
    }
  };

  const handleEdit = (formation) => {
    setFormData({
      titre: formation.titre,
      description: formation.description,
      categories_id: formation.categories_id,
      duree: formation.duree,
      price: formation.price,
    });
    setEditingId(formation.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");

      if (editingId) {
        await axios.put(`/api/formations/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/formations", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchFormations();

      setFormData({
        titre: "",
        description: "",
        categories_id: "",
        duree: "",
        price: "",
      });
      setEditingId(null);
      setError(null);
    } catch (err) {
      console.error("Error saving formation:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">
              {editingId ? "Edit Course" : "Create New Course"}
            </h1>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="py-30 px-30">
                <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Course Title</label>
                    <input
                      required
                      type="text"
                      name="titre"
                      placeholder="Learn Figma - UI/UX Design Essential Training"
                      value={formData.titre}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Description</label>
                    <textarea
                      required
                      name="description"
                      placeholder="Description"
                      rows="7"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Category</label>
                    <select
                      required
                      name="categories_id"
                      value={formData.categories_id}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Duration</label>
                    <input
                      required
                      type="text"
                      name="duree"
                      placeholder="e.g., 10 hours"
                      value={formData.duree}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Price</label>
                    <input
                      required
                      type="text"
                      name="price"
                      placeholder="19.99 $$"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>

                  {error && <p className="text-red-500">{error}</p>}

                  <div className="row y-gap-20 justify-between pt-15">
                    <div className="col-auto">
                      <button type="submit" className="button -md -outline-purple-1 text-purple-1">
                        {editingId ? "Update" : "Create"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setFormData({
                              titre: "",
                              description: "",
                              categories_id: "",
                              duree: "",
                              price: "",
                            });
                          }}
                          className="button -md text-red-600 ml-15"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive scroll-sm" style={{ marginTop: "50px" }}>
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Titre</th>
                <th scope="col">Catégorie</th>
                <th scope="col">Durée</th>
                <th scope="col">Prix</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {formations.map((formation) => (
                <tr key={formation.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <h6
                          className="text-md mb-0 fw-semibold"
                          style={{ cursor: "pointer", color: "#6440fb", textDecoration: "underline" }}
                          onClick={() => navigate(`/courses-single-2/${formation.id}`)}
                        >
                          {formation.titre}
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>{formation.category?.name || "N/A"}</td>
                  <td>{formation.duree}</td>
                  <td>{formation.price} $$</td>
                  <td>
                    <div className="d-inline-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800 "
                        onClick={() => handleEdit(formation)}  style={{ marginRight: "15px",fontSize: "18px", cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "#28a745" }}/>
                      </button>
                      <button
                        type="button"
                        className="text-xl text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(formation.id)}  style={{fontSize: "18px", cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545" }} />
                      </button>
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800 "
                        style={{ marginLeft: "15px",fontSize: "18px", cursor: "pointer" }}
                        onClick={() => navigate(`/formations/${formation.id}`)}
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
