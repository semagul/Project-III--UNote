import React, { useEffect, useState } from "react"
import axios from "axios"

export default function AddNote(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    // const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    const handleSubmit = event => {
        // PREVENT refreshing the pagee 
        event.preventDefault()
        // USING "API" here as you send to the backend
        axios.post('/api/notes', { title, description, tags: selectedTags })
            .then(response => {
                // console.log("response")
                // reset the form
                setTitle('')
                setDescription('')
                setSelectedTags([])
                // refresh the list of projects in 'ProjectsList'
                props.getAllNotes()
            })
            .catch(err => console.log(err))
    }

    let updateSelectedTags  =  (event) => {
        let options = event.target.options;
        let arr = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                arr.push(options[i].value)
            }
        }
     setSelectedTags(arr)
        console.log(selectedTags)
    }

        const tags = ["daily", "podcast", "restaurant", "bar", "spending",
        "earning", "job-search", "coding", "film", "series", "music", "concert",
        "to-do", "period-tracking", "birthday", "networking", "mood-tracking",
        "appointment", "for-tomorrow" ]
   

    return (
        <>
            <h1>Add a Note</h1>
            <form onSubmit={ handleSubmit }>
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

