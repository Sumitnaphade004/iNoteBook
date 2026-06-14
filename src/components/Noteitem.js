import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  return (
    <div className="col-md-3">
      <div
        className="card my-3 border"
        style={{
          width: "18rem",
          backgroundColor: "#2B3035",
          color: "#ffffff",
          borderRadius: "20px",
        }}
      >
        <div className="card-body">
          <div className="d-flex text-center">
            <h5 className="card-title text-success">{note.title}</h5>
          </div>
          <div className="border mb-3"></div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">
            <b>Tag:</b> {note.tag}
          </p>
          <div className="border mb-3"></div>
          <div className="d-flex justify-content-center gap-3">
            <i
              className="fa-solid fa-trash mx-2 text-danger"
              title="Delete Note"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this note?")
                ) {
                  deleteNote(note._id, showAlert);
                }
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2 text-success"
              title="Edit Note"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
