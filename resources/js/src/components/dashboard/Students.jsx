import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Ajout

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await axios.get("/api/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des étudiants.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({
      name: student.user?.name || "",
      email: student.user?.email || "",
      phone: student.phone || "",
      password: "",
      password_confirmation: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    if (!result.isConfirmed) return;
    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
      Swal.fire('Supprimé !', 'L\'étudiant a été supprimé.', 'success');
    } catch {
      setError("Erreur lors de la suppression.");
      Swal.fire('Erreur', "Erreur lors de la suppression.", 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth_token");
    try {
      if (editingId) {
        await axios.put(
          `/api/students/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "/api/students",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setForm({ name: "", email: "", phone: "", password: "", password_confirmation: "" });
      setEditingId(null);
      fetchStudents();
      setError("");
    } catch (err) {
      setError("Erreur lors de l'enregistrement.");
    }
  };

  if (loading) return <div className="p-20">Chargement...</div>;
  if (error) return <div className="p-20 text-red-500">{error}</div>;

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">
              {editingId ? "Modifier étudiant" : "Ajouter un étudiant"}
            </h1>
          </div>
        </div>

        <div className="row y-gap-60"style={{ marginTop: "-50px" }}>
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="py-30 px-30">
                <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
                  <div className="col-md-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Nom</label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Nom"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Téléphone</label>
                    <input
                      required
                      type="text"
                      name="phone"
                      placeholder="Téléphone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      {editingId ? "Nouveau mot de passe" : "Mot de passe"}
                    </label>
                    <input
                      required={!editingId}
                      type="password"
                      name="password"
                      placeholder={editingId ? "Nouveau mot de passe" : "Mot de passe"}
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Confirmer mot de passe
                    </label>
                    <input
                      required={!editingId}
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirmer mot de passe"
                      value={form.password_confirmation}
                      onChange={handleChange}
                    />
                  </div>
                  {error && (
                    <div className="col-12">
                      <p className="text-red-500">{error}</p>
                    </div>
                  )}
                  <div className="col-12">
                    <button type="submit" className="button -md -outline-purple-1 text-purple-1">
                      {editingId ? "Modifier" : "Ajouter"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setForm({ name: "", email: "", password: "", password_confirmation: "" });
                        }}
                        className="button -md text-red-600 ml-15"
                      >
                        Annuler
                      </button>
                    )}
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
                <th>Matricule</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.matricule}</td>
                  <td>{student.user?.name}</td>
                  <td>{student.user?.email}</td>
                  <td>{student.user?.phone}</td>
                  <td>
                    <div className="d-inline-flex align-items-center justify-content-center">
                      <button
                        type="button"
                        className="text-xl text-success-600 hover:text-success-800"
                        onClick={() => handleEdit(student)}
                        style={{ marginRight: "15px", fontSize: "18px", cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ color: "#28a745" }} />
                      </button>
                      <button
                        type="button"
                        className="text-xl text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(student.id)}
                        style={{ fontSize: "18px", cursor: "pointer" }}
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
