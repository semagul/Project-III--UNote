import React from 'react'
import { Link } from 'react-router-dom'
import streamAudioWithAuth from './helpers/audioStreamWithAuth'
import blobUrlFromId from './helpers/blobUrlFromId'

export default function AudioCard({ title, _id, tags, createdAt }) {
    const formattedDate = new Date(createdAt).toDateString()
    const storedToken = localStorage.getItem('authToken')

    return (
        <div>
            <Link to={`/audios/${_id}`}>
                <h3>{title}</h3>
            </Link>

            <button onClick={() => streamAudioWithAuth(blobUrlFromId(_id), storedToken)}>Play</button>

            <p>{tags.join(", ")}</p>

            <p>{formattedDate} </p>

        </div>
    )
}