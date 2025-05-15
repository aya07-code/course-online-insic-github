import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Listing() {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    categories_id: "",
    duree: "",
    price: "",
  });

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
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`/api/formations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFormations();
    } catch (err) {
      console.error("Error deleting formation:", err);
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
            <div className="mt-10">Lorem ipsum dolor sit amet, consectetur.</div>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Basic Information</h2>
              </div>

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
                      <img
                        src="/assets/images/nft/nft-items-img1.png"
                        alt=""
                        className="flex-shrink-0 me-12 w-40-px h-40-px rounded-circle me-12"
                      />
                      <div className="flex-grow-1">
                        <h6 className="text-md mb-0 fw-semibold">
                          {formation.titre}
                        </h6>
                        <span className="text-sm text-secondary-light fw-normal">
                          {formation.description}
                        </span>
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
                        onClick={() => handleEdit(formation)}  style={{ marginRight: "20px",fontSize: "18px" }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "#28a745" }}/>
                      </button>
                      <button
                        type="button"
                        className="text-xl text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(formation.id)}  style={{fontSize: "18px" }}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ color: "#dc3545" }} />
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
