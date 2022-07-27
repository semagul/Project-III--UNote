import React, { useEffect, useState } from "react"
import axios from "axios"
import AddAudioRec from "../components/AddAudioRec"
import AudioCard from "../components/AudioCard"

export default function AudioList() {
	const [audios, setAudios] = useState([])

	const storedToken = localStorage.getItem('authToken')
	const getAllAudios = () => {
		axios.get("/api/audios", { headers: { Authorization: `Bearer ${storedToken}`}})
			.then(response => {
				setAudios(response.data.createdAudios)
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