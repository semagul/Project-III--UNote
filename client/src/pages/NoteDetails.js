import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function NoteDetails() {
	const [note, setNote] = useState(null)

	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				setNote(response.data)
			})
			.catch(err => console.log(err))
	}, [])

	const deleteNote = () => {
		const storedToken = localStorage.getItem('authToken')
		axios.delete(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				navigate('/notes')
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			{note === null ? <h3>Loading...</h3> :
				<>
					<h1>Note Details</h1>
					<h3>{note.title}</h3>
					<p>{note.description}</p>
					<p>{note.tags.map((el, i) => (
						i === note.tags.length - 1 ? <span key={el}>{el}</span> : <span key={el}>{el}, </span>
					))}</p>
					<p>{note.date}</p>
					<Link to={`/notes/edit/${note._id}`}>
						<button>Edit this note 📝</button>
					</Link>
					<button onClick={deleteNote}>Delete this note ❌</button>
				</>
			}

		</>
	)
}
