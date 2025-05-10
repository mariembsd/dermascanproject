import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminLogin.css";

const AdminLogin = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const response = await fetch("http://localhost:5000/api/admins/login", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
     email,
     password
    })
   });

   const result = await response.json();

   if (response.ok) {
    alert("Login successful!");
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.admin));
    navigate("/admin/"); 
   } else {
    alert(result.message || "Login failed");
   }
  } catch (err) {
   console.error("Login error:", err);
   alert("An error occurred during login");
  }
 };

 return (
  <div className="admin-login-container d-flex justify-content-center align-items-center">
   <div className="login-card shadow-lg p-4 rounded">
    <h2 className="text-center mb-4 text-primary">Admin Login</h2>
    <form onSubmit={handleSubmit}>
     <div className="form-group mb-3">
      <label>Email address</label>
      <input
       type="email"
       className="form-control"
       placeholder="Enter admin email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       required
      />
     </div>
     <div className="form-group mb-3">
      <label>Password</label>
      <input
       type="password"
       className="form-control"
       placeholder="Enter password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       required
      />
     </div>
     <button type="submit" className="btn btn-primary w-100">
      Login
     </button>
    </form>
   </div>
  </div>
 );
};

export default AdminLogin;
