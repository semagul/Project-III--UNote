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
            <h1>Add a note</h1>
            <form onSubmit={handleSubmit}>
                <h2>Title</h2>
                <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <h2>Description</h2>
                <input
                    type="text"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />

                <h2>Tags</h2>
                <Tags
                    tags={tags}
                    setTags={setTags}
                />
                
                <button type="submit">Add this Note ➕</button>
            </form>

        </>
    )
}

