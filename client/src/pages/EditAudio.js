import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Tags from "../components/Tags";

export default function EditAudio() {
	const [title, setTitle] = useState('')
	const [tags, setTags] = useState([])

	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/audio/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				const { title, date, place, details, tags } = response.data
				setTitle(title)
				setTags(tags)
			})
			.catch(err => console.log(err))
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { title, tags }
		const storedToken = localStorage.getItem('authToken')
		axios.put(`/api/audio/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				navigate('/audio')
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			<h1>Edit audio</h1>
			<form onSubmit={handleSubmit}>
				<h2>Title</h2>
				<input
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<h2>Tags</h2>
				<Tags
					tags={tags}
					setTags={setTags}
				/>

				<button type="submit">Update this audio</button>
			</form>

		</>
	)
}