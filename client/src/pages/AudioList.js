import React, { useEffect, useState } from "react"
import axios from "axios"
import AddAudioRec from "../components/AddAudioRec"
import AudioCard from "../components/AudioCard"
import packageJson from '../../package.json';

export default function NoteList() {
	const [audios, setAudios] = useState([])

	const storedToken = localStorage.getItem('authToken')
	const getAllAudios = () => {
		axios.get("/api/audios", { headers: { Authorization: `Bearer ${storedToken}`}})
			.then(response => {
				setAudios(response.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getAllAudios()
	}, [])


	return (
		<>
			<h1>All your audio recordings</h1>
			<AddAudioRec getAllAudios={getAllAudios} />
			{audios.map(audio => <AudioCard key={audio._id} {...audio} />)}
		</>
	)
}