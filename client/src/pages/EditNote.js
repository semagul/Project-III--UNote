import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Tags from "../components/Tags";

export default function EditNote() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [tags, setTags] = useState('')

	const { id } = useParams()
	const navigate = useNavigate()

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




	return (
		<>
			<h1>Edit note</h1>
			<h2>Title</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<h2>Details</h2>
				<input
					type="description"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				<h2>Tags</h2>
				<Tags
					tags={tags}
					setTags={setTags}
				/>
				<button type="submit">Update this note</button>
			</form>
			
		</>
	)
}
