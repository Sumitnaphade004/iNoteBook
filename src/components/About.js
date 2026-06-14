import React from "react";

const About = () => {
  return (
    <div className="container" style={{ backgroundColor: "#212529" }}>
      <div
        className="card border-0"
        style={{ backgroundColor: "#212529", color: "#ffffff" }}
      >
        <div className="card-body p-3">
          <h1 className="text-center mb-4">About iNoteBook</h1>

          <p className="lead text-center mb-5">
            A simple and secure platform to create, manage, and organize your
            notes anytime, anywhere.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="card h-100 border-primary"
                style={{ backgroundColor: "#2B3035", color: "#ffffff" }}
              >
                <div className="card-body text-center">
                  <h3>📝 Create Notes</h3>
                  <p>
                    Quickly add notes for important tasks, ideas, reminders, and
                    information you want to save.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100 border-success"
                style={{ backgroundColor: "#2B3035", color: "#ffffff" }}
              >
                <div className="card-body text-center">
                  <h3>👀 View Notes</h3>
                  <p>
                    Access all your saved notes in one place and stay organized
                    with an easy-to-use interface.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100 border-danger"
                style={{ backgroundColor: "#2B3035", color: "#ffffff" }}
              >
                <div className="card-body text-center">
                  <h3>🗑️ Delete Notes</h3>
                  <p>
                    Remove notes that are no longer needed and keep your
                    workspace clutter-free.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-5" />

          <div className="text-center">
            <h2>Why Use iNoteBook?</h2>
            <p className="mt-3">
              Notes App helps you manage your daily information efficiently.
              Whether you're tracking tasks, storing ideas, or keeping personal
              records, our application provides a fast and reliable way to keep
              everything organized.
            </p>
          </div>

          <hr className="my-5" />

          <div className="mt-5 mb-5">
            <h3>Features</h3>
            <ul className="list-group border-0">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <li
                    className="list-group-item border-0"
                    style={{ backgroundColor: "#212529", color: "#ffffff" }}
                  >
                    ✅ Create and save notes instantly
                  </li>
                  <li
                    className="list-group-item border-0"
                    style={{ backgroundColor: "#212529", color: "#ffffff" }}
                  >
                    ✅ View all notes in a clean interface
                  </li>
                </div>
                <div className="col-md-6">
                  <li
                    className="list-group-item border-0"
                    style={{ backgroundColor: "#212529", color: "#ffffff" }}
                  >
                    ✅ Delete unwanted notes easily
                  </li>
                  <li
                    className="list-group-item border-0"
                    style={{ backgroundColor: "#212529", color: "#ffffff" }}
                  >
                    ✅ Simple and user-friendly experience
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
