import React, { useState } from "react";
import { locationData } from "@/data/officeLocation";
import axios from "axios";

export default function ContactTwo() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      // Remplacez par la logique d'identification de l'utilisateur si besoin
      const user_id = null; // ou récupérez l'id utilisateur connecté si besoin
      await axios.post("/api/messages", {
        content: form.comment,
        date: new Date().toISOString(),
        status: "unread",
        user_id: user_id,
        name: form.name,
        email: form.email,
      });
      setSuccess("Message envoyé avec succès !");
      setForm({ name: "", email: "", comment: "" });
    } catch (err) {
      setError("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <>
      <section className="page-header -type-4 bg-beige-1" style={{ marginTop: "-50px" , height: "300px" }}>
        <div className="container">
          <div className="page-header__content">
            <div className="row">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">Contact Us</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    We’re on a mission to deliver engaging, curated
                    <br /> courses at a reasonable price.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg" >
        <div className="container">
          <div className="row y-gap-50 justify-between">
            <div className="col-xl-5 col-lg-6">
              <h3 className="text-24 lh-1 fw-500">Our offices</h3>
              <div className="row y-gap-30 pt-40">
                {locationData.map((elm, i) => (
                  <div key={i} className="col-sm-6">
                    <div className="text-20 fw-500 text-dark-1">
                      {elm.location}
                    </div>
                    <div className="y-gap-10 pt-15">
                      <a href="#" className="d-block">
                        {elm.address}
                      </a>
                      <a href="#" className="d-block">
                        {elm.phoneNumber}
                      </a>
                      <a href="#" className="d-block">
                        {elm.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              {/* Ajout de la carte Google Maps */}
              <div className="mt-40 rounded-16 overflow-hidden shadow-1" style={{ border: "2px solid #eee" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d202.35011902049686!2d-5.840278545607235!3d35.76058835583081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2sma!4v1748270937638!5m2!1sar!2sma"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-6" style={{ marginTop: "127px" }}>
              <div className="px-40 py-40 bg-white border-light shadow-1 rounded-8 contact-form-to-top">
                <h3 className="text-24 fw-500">Send a Message</h3>
                <p className="mt-25">
                  Neque convallis a cras semper auctor. Libero id faucibus nisl
                  <br /> tincidunt egetnvallis.
                </p>

                <form
                  className="contact-form row y-gap-30 pt-60 lg:pt-40"
                  onSubmit={handleSubmit}
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      placeholder="Name..."
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="Email..."
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      Message...
                    </label>
                    <textarea
                      name="comment"
                      placeholder="Message"
                      rows="8"
                      required
                      value={form.comment}
                      onChange={handleChange}
                    ></textarea>
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
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -md -purple-1 text-white"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
