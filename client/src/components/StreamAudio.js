import { useState, useEffect } from 'react'
import axios from "axios";

export default function StreamAudio({ audioID }) {

    const [audioSrc, setAudioSrc] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {
        getAudioNodeAxios()
        return () => {
            console.log(isPlaying)
            stop()
        };
    }, [])

    const onStreamEnded = (event) => {
        getAudioNodeAxios()
        setIsPlaying(false)
    }

    const play = () => {
        if (isPlaying === false) {
            audioSrc.start(0)
            setIsPlaying(true)
            console.log(isPlaying)
            audioSrc.onended = onStreamEnded
        }
    }

    const stop = () => {
        isPlaying === true && audioSrc.stop()
    }


    const getAudioNodeAxios = () => {

        let storedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // create source
        let source = storedAudioCtx.createBufferSource();

        // route source
        source.connect(storedAudioCtx.destination);

        axios.get(
            `/api/bloburl/${audioID}`,
            { responseType: 'arraybuffer', headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(response => {
                // get audio data
                let audioData = response.data;

                // try to decode audio data
                storedAudioCtx.decodeAudioData(audioData,
                    buffer => {
                        // set source
                        source.buffer = buffer;
                        setAudioSrc(source);

                    },
                    e => {
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
