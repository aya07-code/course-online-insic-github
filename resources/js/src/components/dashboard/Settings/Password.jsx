import React, { useState } from "react";
import axios from "axios";

export default function Password({ activeTab }) {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("auth_token");
      await axios.put(
        "/api/user/password",
        {
          current_password: formData.current_password,
          new_password: formData.new_password,
          new_password_confirmation: formData.new_password_confirmation,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Mot de passe mis à jour !");
      setFormData({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la mise à jour du mot de passe."
      );
    }
    setLoading(false);
  };

  return (
    <div
      className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Current password
          </label>
          <input
            required
            type="password"
            name="current_password"
            placeholder="Current password"
            value={formData.current_password}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            New password
          </label>
          <input
            required
            type="password"
            name="new_password"
            placeholder="New password"
            value={formData.new_password}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            Confirm New Password
          </label>
          <input
            required
            type="password"
            name="new_password_confirmation"
            placeholder="Confirm New Password"
            value={formData.new_password_confirmation}
            onChange={handleChange}
          />
        </div>
        {success && (
          <div className="col-12">
            <p className="text-green-600">{success}</p>
          </div>
        )}
        {error && (
          <div className="col-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="col-12">
          <button className="button -md -purple-1 text-white" disabled={loading}>
            {loading ? "Mise à jour..." : "Save Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
