  import React, {useContext, useEffect, useRef, useState} from 'react'
  import noteContext from '../context/notes/noteContext'
  import Noteitem from './Noteitem';
  import AddNotes from './AddNotes';
  import { useNavigate } from 'react-router-dom';

  const Notes = (props) => {
      const context = useContext(noteContext);
      const {notes, getNotes, editNote} = context;

      let navigate= useNavigate();
      
      useEffect(()=>{
        if(localStorage.getItem("token")){
          getNotes();
        }
        else{
          navigate("/login");
        }
        // eslint-disable-next-line
      },[])

      const ref = useRef(null);
      const refClose = useRef(null);

      const[note, setNote]= useState({id: "",etitle: "", edescription: "", etag: ""})

      const updateNote = (currentNote)=>{
          ref.current.click();
          setNote({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
      }
      
      const {showAlert}= props
      const handleClick =(e)=>{
        // e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert(" Note has been successfully edited", "success")
      }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
      }

    return (
      <>
        <AddNotes showAlert={showAlert} />
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              </div>
              <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Discription</label>
                  <input type="text" className="form-control"  name="edescription" id="edescription" value={note.edescription} onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control"  name="etag" id="etag" value={note.etag} onChange={onChange}/>
                </div>
                {/* <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button> */}
              </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-5">
          <div className="row my-3">
              <h2>Your Notes</h2>
              <div className="container">
                {notes.length === 0 && "No notes available. Create your first note."}
              </div>
              {notes.map((note) => {
                return (
                <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
              );
              })}
          </div>
        </div>
      </>
    )
  }

  export default Notes;
