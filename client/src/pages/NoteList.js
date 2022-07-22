import React, { useEffect, useState } from "react"
import axios from "axios"
import AddNote from "../components/AddNote"
import NoteCard from "../components/NoteCard"

export default function NoteList() {
	const [notes, setNotes] = useState([])

	const getAllNotes = () => {
		axios.get("/api/notes")
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