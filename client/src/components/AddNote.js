import React, { useState } from "react"
import axios from "axios"
import Tags from "./Tags";

export default function AddNote(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])

    const handleSubmit = event => {
        event.preventDefault()
        const storedToken = localStorage.getItem('authToken')
        axios.post('/api/notes', { title, description, tags }, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                setTitle('')
                setDescription('')
                setTags([])
                props.getAllNotes()
            })
            .catch(err => console.log(err))
    }

    return (
        <>
        <div className="mb-3">
            <h2>Add a note</h2>
            <form onSubmit={handleSubmit}>
            <label className="form-label"><h2>Title</h2></label>
                  <input className="form-control"  placeholder="Checkout Bootstrap" type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)} />

<label className="form-label"><h2>Details</h2></label>
                <textarea className="form-control" placeholder="Watch tutorials"
                    type="text"
                    rows="3"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                ></textarea>

<label className="form-label"><h2>Tags</h2></label>
                <Tags
                    tags={tags}
                    setTags={setTags}
                />
                
                <button type="submit">Add this Note ➕</button>
            </form>

            
  

</div>

        </>
    )
}

