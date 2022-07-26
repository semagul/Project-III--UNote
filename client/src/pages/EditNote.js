import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditNote() {

	const { id } = useParams()

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
	
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				const { title, description, tags } = response.data
				setTitle(title)
				setDescription(description)
                setTags(tags)
			})
			.catch(err => console.log(err))
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { title, description, tags }
        const storedToken = localStorage.getItem('authToken')
		// put request to the backend to update the note
		axios.put(`/api/notes/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				navigate('/notes')
			})
			.catch(err => console.log(err))
	}

	const deleteEvent = () => {
        const storedToken = localStorage.getItem('authToken')
		axios.delete(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				navigate('/notes')
			})
			.catch(err => console.log(err))
	}


    
	return (
		<>
			<h1>Edit note</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				
                <input
					type="description"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

                <input
					type="text"
					value={tags}
					onChange={e => setTags(e.target.value)}
				/>
				<button type="submit">Update this note</button>
			</form>
			<button onClick={deleteEvent}>Delete this note ❌</button>
		</>
	)
}