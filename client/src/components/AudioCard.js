import React from 'react'
import { Link } from 'react-router-dom'
import packageJson from '../../package.json';

export default function AudioCard({ title, _id, blobURL, tags, createdAt }) {
    const formattedDate = new Date(createdAt).toDateString();
    const storedToken = localStorage.getItem('authToken');


	let streamWithAuth = (audio_id) => {
		const blobURL =            `${packageJson.proxy}/api/bloburl/${audio_id}`;

		console.log(" Attempt to stream from");
		console.log(blobURL);

// create context
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create source
let source = audioCtx.createBufferSource();

// route source
source.connect(audioCtx.destination);

// prepare request
let request = new XMLHttpRequest();
request.open('GET', blobURL, true /* async */ );
request.responseType = 'arraybuffer';

request.onload = function () {
// on load callback

// get audio data
let audioData = request.response;

// try to decode audio data
audioCtx.decodeAudioData(audioData,
		function (buffer) {
				// on success callback
				console.log("Successfully decoded");

				// set source
				source.buffer = buffer;

				// .. do whatever you want with the source
				// e.g. play it
				source.start(0);
				// or stop
				// source.stop();
		},
		function (e) {
				// on error callback
				console.log("An error occurred");
				console.log(e);
		});
};
request.setRequestHeader("Authorization", `Bearer ${storedToken}`);
request.send();
}

    return (
        <div>
            <Link to={`/bloburl/${_id}`}>
                <h3>{title}</h3>
            </Link>

            {/* <audio src={`${process.env.REACT_APP_BLOB_URL}/${_id}`} controls="controls" /> */}
            <button onClick={() => streamWithAuth(_id)}> play</button> 

            {tags.map((el, i) => (
                i === tags.length - 1 ? <span key={el}>{el}</span> : <span key={el}>{el}, </span>
            ))}

            <p>Created: {formattedDate} </p>

        </div>
    )
}