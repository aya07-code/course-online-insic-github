import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Ajouté
    password: "",
    password_confirmation: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // N'envoyez que les champs attendus par l'API
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        phone: formData.phone, // <-- décommentez cette ligne
      };
      const response = await axios.post("http://127.0.0.1:8000/api/register", payload);
      console.log("User registered:", response.data);
      setSuccessMessage("Registration successful! Welcome to the platform.");
      setError(null);
      setFormData({ name: "", email: "", phone: "", password: "", password_confirmation: "" }); // Reset form
    } catch (err) {
      setError(err.response?.data?.errors || { message: "An error occurred" });
      setSuccessMessage(null);
    }
  };

  return (
    <div className="form-page__content lg:py-50" style={{ marginTop: "50px" }}>
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?
                <Link to="/login" className="text-purple-1">
                  Log in
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Name *
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
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Phone
                  </label>
                  <input
                    required
                    type="text"
                    name="phone"
                    placeholder="06 00 00 00 00"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input
                    required
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
                {error && (
                  <div>
                    {error.message && <p className="text-red-500">{error.message}</p>}
                    {error.name && <p className="text-red-500">Name: {error.name.join(", ")}</p>}
                    {error.email && <p className="text-red-500">Email: {error.email.join(", ")}</p>}
                    {error.password && <p className="text-red-500">Password: {error.password.join(", ")}</p>}
                  </div>
                )}
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md bg-purple-1 text-white fw-500 w-1/1"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
