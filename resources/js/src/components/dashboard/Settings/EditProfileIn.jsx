import React, { useState } from "react";
import axios from "axios";

export default function EditProfileIn() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const defaultAvatar = "/assets/img/dashboard/edit/2j.jpg";
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [previewImage, setPreviewImage] = useState(defaultAvatar);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      const response = await axios.post("/api/students", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
         if (response.data.avatar) {
           setPreviewImage(response.data.avatar);
         }
      setPreviewImage(defaultAvatar);
      setSelectedImage(null);
      setSuccessMessage("Student registered successfully!");
      setErrorMessage(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSuccessMessage(null);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
    const handleImageUpload = async () => {
    if (!selectedImage) return;

    const token = localStorage.getItem("auth_token");
    const formData = new FormData();
    formData.append("avatar", selectedImage);

    const response = await axios.post("/api/user/avatar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setPreviewImage(response.data.avatar);
    setSelectedImage(null);
  };

  const handleImageRemove = async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(
      "/api/user/avatar",
      { remove_avatar: "1" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPreviewImage(defaultAvatar);
  };
  return (
    <div>

    <div>
      <div className="row y-gap-20 x-gap-20 items-center">
        <label
          className="col-auto"
          htmlFor="imageUpload1"
          style={
            previewImage
              ? {}
              : { backgroundColor: "#f2f3f4", width: 100, height: 100 }
          }
        >
          <img className="size-100" src={previewImage} alt="Profile" />
        </label>

        <div className="col-auto">
          <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
            <div>
              <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
                <label htmlFor="imageUpload1" className="icon-cloud text-16" />
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
                onClick={handleImageRemove}
                className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
              >
                <div className="icon-bin text-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="mt-3">
          <button
            className="button -sm -blue-1 text-white"
            onClick={handleImageUpload}
          >
            Save Image
          </button>
        </div>
      )}
    </div>

      <div className="border-top-light pt-30 mt-30">
        <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Full Name
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
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

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Password
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

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              Confirm Password
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
            <div className="col-12">
              <p className="text-green-500">{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="col-12">
              <p className="text-red-500">{errorMessage}</p>
            </div>
          )}

          <div className="col-12">
            <button className="button -md -purple-1 text-white">
             Inscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}













// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function EditProfileIn() {
//   const defaultAvatar = "/assets/img/dashboard/edit/2j.jpg";

//   const [previewImage, setPreviewImage] = useState(defaultAvatar);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     // Charger l'avatar existant de l'utilisateur
//     const fetchUser = async () => {
//       const token = localStorage.getItem("auth_token");
//       const res = await axios.get("/api/user", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.data.avatar) {
//         setPreviewImage(res.data.avatar);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!selectedImage) return;

//     const token = localStorage.getItem("auth_token");
//     const formData = new FormData();
//     formData.append("avatar", selectedImage);

//     const response = await axios.post("/api/user/avatar", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     setPreviewImage(response.data.avatar);
//     setSelectedImage(null);
//   };

//   const handleImageRemove = async () => {
//     const token = localStorage.getItem("auth_token");
//     const response = await axios.post(
//       "/api/user/avatar",
//       { remove_avatar: "1" },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     setPreviewImage(defaultAvatar);
//   };

//   return (
//     <div>
//       <div className="row y-gap-20 x-gap-20 items-center">
//         <label
//           className="col-auto"
//           htmlFor="imageUpload1"
//           style={
//             previewImage
//               ? {}
//               : { backgroundColor: "#f2f3f4", width: 100, height: 100 }
//           }
//         >
//           <img className="size-100" src={previewImage} alt="Profile" />
//         </label>

//         <div className="col-auto">
//           <div className="d-flex x-gap-10 y-gap-10 flex-wrap pt-15">
//             <div>
//               <div className="d-flex justify-center items-center size-40 rounded-8 bg-light-3">
//                 <label htmlFor="imageUpload1" className="icon-cloud text-16" />
//                 <input
//                   id="imageUpload1"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   style={{ display: "none" }}
//                 />
//               </div>
//             </div>
//             <div>
//               <div
//                 style={{ cursor: "pointer" }}
//                 onClick={handleImageRemove}
//                 className="d-flex justify-center items-center size-40 rounded-8 bg-light-3"
//               >
//                 <div className="icon-bin text-16" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {selectedImage && (
//         <div className="mt-3">
//           <button
//             className="button -sm -blue-1 text-white"
//             onClick={handleImageUpload}
//           >
//             Save Image
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
