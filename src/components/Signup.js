import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  // const refDisabled = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ Check if passwords match
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return; // Stop the submission
    }

    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/login");
      props.showAlert(" User created successfully", "success");
    } else {
      props.showAlert(" Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-card">
          <h2 className="signup-title">Create an Account</h2>
          <p className="signup-subtitle">Sign up to start using iNotebook</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control custom-input"
                name="name"
                id="name"
                value={credentials.name}
                onChange={onChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control custom-input"
                name="email"
                id="email"
                value={credentials.email}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control custom-input"
                name="password"
                id="password"
                value={credentials.password}
                onChange={onChange}
                minLength={5}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control custom-input"
                name="cpassword"
                id="cpassword"
                value={credentials.cpassword}
                onChange={onChange}
                minLength={5}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className="btn signup-btn w-100">
              Create Account
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .signup-page {
          min-height: 85vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .signup-card {
          width: 100%;
          max-width: 500px;
          background: #fff;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .signup-title {
          text-align: center;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 5px;
        }

        .signup-subtitle {
          text-align: center;
          color: #64748b;
          margin-bottom: 25px;
        }

        .form-label {
          font-weight: 600;
          color: #475569;
        }

        .custom-input {
          height: 50px;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          transition: all 0.3s ease;
        }

        .custom-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .signup-btn {
          height: 50px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          color: white;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }
      `}</style>
    </>
  );
};

export default Signup;
