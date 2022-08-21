import { useState, useEffect } from 'react'
import axios from "axios";
import blobUrlFromId from './helpers/blobUrlFromId'


export default function StreamAudio({ audioID }) {
    const [blobURL, setBlobURL] = useState(blobUrlFromId(audioID))
    const [audioSrc, setAudioSrc] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {
        getAudioNodeAxios()
    }, [])

    const onStreamEnded = (event) => {
        getAudioNodeAxios()
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

    // const getAudioNode = () => {

    //     let storedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

    //     // create source
    //     let source = storedAudioCtx.createBufferSource();

    //     // route source
    //     source.connect(storedAudioCtx.destination);

    //     // prepare request
    //     let request = new XMLHttpRequest();
    //     request.open('GET', blobURL, true /* async */);
    //     request.responseType = 'arraybuffer';

    //     request.onload = function () {
    //         // on load callback

    //         // get audio data
    //         let audioData = request.response;

    //         // try to decode audio data
    //         storedAudioCtx.decodeAudioData(audioData,
    //             function (buffer) {
    //                 // on success callback
    //                 console.log("Successfully decoded");

    //                 // set source
    //                 source.buffer = buffer;
    //             },
    //             function (e) {
    //                 // on error callback
    //                 console.log("An error occurred");
    //                 console.log(e);
    //             });
    //     };
    //     request.setRequestHeader("Authorization", `Bearer ${storedToken}`);
    //     request.send();
    //     setAudioSrc(source);
    // }

    const getAudioNodeAxios = () => {

        let storedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // create source
        let source = storedAudioCtx.createBufferSource();

        // route source
        source.connect(storedAudioCtx.destination);

        // // prepare request
        // let request = new XMLHttpRequest();
        // request.open('GET', blobURL, true /* async */);
        // request.responseType = 'arraybuffer';

        axios.get(
            `/api/bloburl/${audioID}`,
            { responseType: 'arraybuffer', headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {

                // get audio data
                let audioData = response.data;
// console.log(audioData)
                // try to decode audio data
                storedAudioCtx.decodeAudioData(audioData,
                    function (buffer) {
                        // on success callback
                        console.log("Successfully decoded");

                        // set source
                        source.buffer = buffer;
                        setAudioSrc(source);

                    },
                    function (e) {
                        // on error callback
                        console.log("An error occurred");
                        console.log(e);
                    });

            })
            .catch(err => console.log(err))

    }

    return (
        <div>
            <button onClick={play}>Start</button>
            <button onClick={stop}>Stop</button>
        </div>
    )
}
