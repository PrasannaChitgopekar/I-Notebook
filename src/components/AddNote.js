import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);

  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //...note means whatever data is their don't make any madifie to that and [e.target.name] will append the data to note
  };

  return (
    <>
      <div className="container my-3" style={{fontSize:"20px"}}>
        <h1 style={{textDecoration:"underline"}}>Add Note</h1>
        <div className="conatainer">
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="emailHelp"
                placeholder="Enter-Title"
                onChange={onChange}
                minLength={5}
                required value={note.title}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
                onChange={onChange}
                minLength={5}
                required
                 value={note.description}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="tag">Tag</label>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                placeholder="Tag"
                onChange={onChange}
                minLength={5}
                required value={note.tag}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
              disabled={note.title.length < 2 || note.description.length < 5}
            >
              Add-Note
            </button>
          </form>
        </div>
        {/* <h1>your notes</h1> */}
      </div>
    </>
  );
};

export default AddNote;
