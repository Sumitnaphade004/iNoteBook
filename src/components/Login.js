import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    // console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      // console.log(localStorage)  //This used for to check authtoken is getting or not
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <h2 className="login-title">Login to Continue</h2>

          <form onSubmit={handleSubmit}>
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
              />
            </div>

            <div className="mb-4">
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
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn login-btn w-100">
              Login
            </button>
          </form>
        </div>
      </div>
      <style>{`
        .login-page {
          min-height: 85vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .login-title {
          text-align: center;
          margin-bottom: 25px;
          font-weight: 700;
          color: #1e293b;
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

        .login-btn {
          height: 50px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          );
          font-size: 16px;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }
      `}</style>
    </>
  );
};

export default Login;
