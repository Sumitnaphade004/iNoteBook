import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNotes = (props) => {
    const context= useContext(noteContext);
    const {addNote} = context;

    const[note, setNote]= useState({title: "", description: "", tag: ""})

    const {showAlert}= props;
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        showAlert(" Note Added Successfully", "success");
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <div className="container my-3" style={{"textAlign": "justify"}}>
          <h1 className="text-center mb-4">Add Note</h1>
          <form>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-1 col-form-label">Title</label>
              <div class="col-sm-11">
                <input type="text" className="form-control bg-dark text-light" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-1 col-form-label">Description</label>
              <div class="col-sm-11">
                <textarea type="text" className="form-control bg-dark text-light"  name="description" id="description" value={note.description} onChange={onChange}/>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-1 col-form-label">Tag</label>
              <div class="col-sm-11">
                <input type="text" className="form-control bg-dark text-light"  name="tag" id="tag" value={note.tag} onChange={onChange}/>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-3" onClick={handleClick} >Add Note</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default AddNotes;
