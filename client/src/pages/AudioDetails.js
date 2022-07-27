import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import blobUrlFromId from './helpers/blobUrlFromId'
import audiosUrl from './helpers/audiosUrl'

export default function AudioDetails() {
	const [audio, setAudio] = useState(null)
	
	const { id } = useParams()
	const navigate = useNavigate()

    useEffect(() => {
        const blobURLBackEnd = blobUrlFromId(latestBlobID);
        setBlobUrl(blobURLBackEnd); //the backend will change the file to stream from the database
    }, [latestBlobID, blobURL])

	const deleteAudio = () => {
		const storedToken = localStorage.getItem('authToken')
		axios.delete(`/api/audios/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				navigate('/audios')
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			{Audio === null ? <h3>Loaading...</h3> :
				<>
					<h1>Audio Details</h1>
					<h3>{audio.title}</h3>
					<p>{audio.tags.map((el, i) => (
                                i === audio.tags.length - 1 ? <span key={el}>{el}</span> : <span key={el}>{el}, </span>
                            ))}</p>
					<Link to={`/audios/audios/${audio._id}`}>
						<button>Edit this audio 📝</button>
					</Link>
					<button onClick={deleteAudio}>Delete this audio ❌</button>
				</>
			}
		</>
	)
}