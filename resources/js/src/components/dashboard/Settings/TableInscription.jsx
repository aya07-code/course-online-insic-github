import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default function InscriptionManagement() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricule: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [inscriptions, setInscriptions] = useState([]);
  const [error, setError] = useState(null);

  const fetchInscriptions = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.get("/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInscriptions(response.data);
    } catch (err) {
      console.error("Error fetching inscriptions:", err);
    }
  };

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inscription?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInscriptions();
    } catch (err) {
      console.error("Error deleting inscription:", err);
    }
  };

  const handleEdit = (inscription) => {
    setFormData({
      name: inscription.user?.name || "",
      email: inscription.user?.email || "",
      matricule: inscription.matricule || "",
    });
    setEditingId(inscription.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");

      if (editingId) {
        await axios.put(`/api/students/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/students", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await fetchInscriptions();

      setFormData({
        name: "",
        email: "",
        matricule: "",
      });
      setEditingId(null);
      setError(null);
    } catch (err) {
      console.error("Error saving inscription:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">
              {editingId ? "Edit Inscription" : "Create New Inscription"}
            </h1>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white shadow-4 h-100">
              <div className="py-30 px-30">
                <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Matricule</label>
                    <input
                      type="text"
                      name="matricule"
                      placeholder="Enter matricule"
                      value={formData.matricule}
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
                              name: "",
                              email: "",
                              matricule: "",
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

        <div className="table-responsive scroll-sm" style={{ marginTop:"50px"}} >
          <table className="table bordered-table sm-table mb-0" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Matricule</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {inscriptions.map((inscription) => (
                <tr key={inscription.id}>
                  <td>{inscription.user?.name || "N/A"}</td>
                  <td>{inscription.user?.email || "N/A"}</td>
                  <td>{inscription.matricule || "N/A"}</td>
                  <td>
                    <div className="d-inline-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800"
                        onClick={() => handleEdit(inscription)}
                        style={{ marginRight: "20px", fontSize: "18px" }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "#28a745" }} />
                      </button>
                      <button
                        type="button"
                        className="text-xl text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(inscription.id)}
                        style={{ fontSize: "18px" }}
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