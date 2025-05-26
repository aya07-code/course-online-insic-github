import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile({ activeTab }) {
  const [previewImage, setPreviewImage] = useState(
    "/assets/img/dashboard/edit/1.png",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Charger les infos utilisateur connecté
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
      if (user.avatar) setPreviewImage(user.avatar);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
      const response = await axios.put(
        "/api/user/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // Debug : afficher la réponse API
      console.log("Réponse API profil:", response.data);

      if (response.data && response.data.user) {
        setSuccess("Profil mis à jour !");
        // Mettre à jour le localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setFormData({
          name: response.data.user.name || "",
          email: response.data.user.email || "",
          phone: response.data.user.phone || "",
          avatar: response.data.user.avatar || "",
        });
        if (response.data.user.avatar) setPreviewImage(response.data.user.avatar);
      } else {
        setError("Erreur lors de la mise à jour du profil (données manquantes).");
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil.");
    }
    setLoading(false);
  };

  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""} `}
    >
      <div className="row y-gap-20 x-gap-20 items-center">
        <label
          className="col-auto"
          htmlFor="imageUpload"
          style={
            previewImage
              ? {}
              : { backgroundColor: "#f2f3f4", width: 100, height: 100 }
          }
        >
          {previewImage && (
            <img
              className="size-100"
              src={previewImage}
              alt={previewImage ? "image" : ""}
            />
          )}
        </label>

        <div className="col-auto">
          <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
            <div>
              <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <label
                  style={{ cursor: "pointer" }}
                  htmlFor="imageUpload1"
                  className="icon-cloud text-16"
                ></label>
                <input
                  id="imageUpload1"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  document.getElementById("imageUpload1").value = "";
                  setPreviewImage("");
                  setFormData((prev) => ({ ...prev, avatar: "" }));
                }}
                className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
              >
                <div className="icon-bin text-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
          <div className="col-md-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Phone
            </label>
            <input
              required
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
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
            <button
              className="button -md -purple-1 text-white"
              disabled={loading}
            >
              {loading ? "Mise à jour..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
