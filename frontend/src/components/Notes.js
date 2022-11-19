import React, { useContext, useEffect, useRef , useState } from "react";
//useRef -> we can reffer to any elements
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useHistory();
  const { notes, getNotes ,editNote} = context;
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      history.push("/login")
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note,setNote] = useState({id:"",etitle : "" , edescription : "" , etag : "default"})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
  };
  

  const handleClick = (e) => {
    // console.log("updating note",note) 
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click(); 
    props.showAlert("Updated Successfully","success")
    // e.preventDefault();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note
  };
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter-Title"
                    onChange={onChange}
                    value={note.etitle}
                    minLength = {2}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Description"
                    onChange={onChange}
                    value={note.edescription}
                    minLength = {5}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Tag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary" disabled={note.etitle.length<2 || note.edescription.length<5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 ">
        <h2 style={{textDecoration:"underline"}}>Your Notes</h2>
        <div className="conatiner mx-2">
          {notes.length === 0 && 'No notes to display'}  {/* if notes are not their then display this */}
        </div>
        {notes.map((note) => {
          // map.(note)
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          ); // note._id this will error
        })}
      </div>
    </>
  );
};

export default Notes;
