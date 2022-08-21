import React from 'react'
import { Link } from 'react-router-dom'
import streamAudioWithAuth from './helpers/audioStreamWithAuth'
import blobUrlFromId from './helpers/blobUrlFromId'
import StreamAudio from './StreamAudio'

export default function AudioCard({ title, _id, tags, createdAt }) {
    const formattedDate = new Date(createdAt).toDateString()
    const storedToken = localStorage.getItem('authToken')

    return (
        <div>
            <Link to={`/audios/${_id}`}>
                <h3>{title}</h3>
            </Link>

            {/* <button onClick={() => streamAudioWithAuth(blobUrlFromId(_id), storedToken)}>Play</button> */}
            <StreamAudio
                audioID={_id}
            />



            <p>{tags.join(", ")}</p>

            <p>{formattedDate} </p>

        </div>
    )
}