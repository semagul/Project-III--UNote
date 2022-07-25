import React, { useEffect, useState } from "react"
import axios from "axios"
import AddNote from "../components/AddNote"
import NoteCard from "../components/NoteCard"

export default function NoteList() {
	const [notes, setNotes] = useState([])

	const storedToken = localStorage.getItem('authToken')
// for every request to a project route we need to also send the token
	const getAllNotes = () => {
		axios.get("/api/notes", { headers: { Authorization: `Bearer ${storedToken}`}})
			.then(response => {
				setNotes(response.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getAllNotes()
	}, [])

	return (
		<>
			<h1>All your notes</h1>
			<AddNote getAllNotes={getAllNotes} />
			{notes.map(note => <NoteCard key={note._id} {...note} />)}
		</>
	)
}