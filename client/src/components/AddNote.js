import React, { useState } from "react"
import axios from "axios"

export default function AddNote(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedTags, setSelectedTags] = useState([])

    const handleSubmit = event => {
        event.preventDefault()
        axios.post('/api/notes', { title, description, tags: selectedTags })
            .then(response => {
                setTitle('')
                setDescription('')
                setSelectedTags([])
                props.getAllNotes()
            })
            .catch(err => console.log(err))
    }

    let updateSelectedTags = (event) => {
        let options = event.target.options;
        let arr = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                arr.push(options[i].value)
            }
        }

        // state is not updated when you console.log here
        setSelectedTags(arr)
        console.log(selectedTags)
    }

    const tags = ["daily", "podcast", "restaurant", "bar", "spending",
        "earning", "job-search", "coding", "film", "series", "music", "concert",
        "to-do", "period-tracking", "birthday", "networking", "mood-tracking",
        "appointment", "for-tomorrow"]


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

                <select name="tags" multiple value={selectedTags}
                    onChange={event => updateSelectedTags(event)}>
                    {tags?.map((tag) => <option key={tag} value={tag}>{tag}</option>)}

                </select>
                <button type="submit">Add this Note ➕</button>
            </form>

        </>
    )
}

