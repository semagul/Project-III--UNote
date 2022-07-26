import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function NoteDetails() {

	const { id } = useParams()

	const [note, setNote] = useState(null)

	useEffect(() => {
        const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/notes/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				setNote(response.data)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<>
			{note === null ? <h3>Loading...</h3> :
				<>
					<h1>Note Details</h1>
					<h3>{note.title}</h3>
					<h5>{note.date}</h5>
                    <h5>{note.place}</h5>
                    <h5>{note.details}</h5>
                    <h5>{note.tags}</h5>
					<Link to={`/notes/edit/${note._id}`}>
						<button>Edit this note 📝</button>
					</Link>
				</>
			}
		</>
	)
}