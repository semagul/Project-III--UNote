import { useState, useEffect } from 'react'
import blobUrlFromId from './helpers/blobUrlFromId'


export default function StreamAudio({ audioID }) {
    const [blobURL, setBlobURL] = useState(blobUrlFromId(audioID))
    const [audioSrc, setAudioSrc] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {
        getAudioNode()
    }, [])

    const onStreamEnded = (event) => {
        getAudioNode()
        setIsPlaying(false)
    }

    const play = () => {
        if (isPlaying === false) {
            audioSrc.start(0)
            setIsPlaying(true)
            audioSrc.onended = onStreamEnded
        }
    }

    const stop = () => {
        isPlaying === true && audioSrc.stop()  
    }

    const getAudioNode = () => {

        let storedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // create source
        let source = storedAudioCtx.createBufferSource();

        // route source
        source.connect(storedAudioCtx.destination);

        // prepare request
        let request = new XMLHttpRequest();
        request.open('GET', blobURL, true /* async */);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            // on load callback

            // get audio data
            let audioData = request.response;

            // try to decode audio data
            storedAudioCtx.decodeAudioData(audioData,
                function (buffer) {
                    // on success callback
                    console.log("Successfully decoded");

                    // set source
                    source.buffer = buffer;
                },
                function (e) {
                    // on error callback
                    console.log("An error occurred");
                    console.log(e);
                });
        };
        request.setRequestHeader("Authorization", `Bearer ${storedToken}`);
        request.send();
        setAudioSrc(source);
    }

    return (
        <div>
            <button onClick={play}>Start</button>
            <button onClick={stop}>Stop</button>
        </div>
    )
}
