import { useState, useEffect } from "react"
import MicRecorder from 'mic-recorder-to-mp3'
import blobUrlFromId from './helpers/blobUrlFromId'
import audiosUrl from './helpers/audiosUrl'
import Tags from "./Tags";

// Instead of axios the audio notes are posted by XMLHttpRequest

export default function AddAudioRec(props) {

    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobUrl] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
    const [latestBlobID, setLatestBlobID] = useState('')


    useEffect(() => {
        const blobURLBackEnd = blobUrlFromId(latestBlobID);
        setBlobUrl(blobURLBackEnd); //the backend will change the file to stream from the database
    }, [latestBlobID, blobURL])

    const handleSubmit = event => {
        event.preventDefault()
    }

    let start = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                }).catch((e) => console.error(e));
        }
    };

    // this will send the mp3 blob to the backend using:
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    let upload = (blob) => {
        var xhr = new XMLHttpRequest();

        xhr.onload = function (e) { // todo to arrow func
            if (this.readyState === 4) {
                const resp = JSON.parse(e.target.responseText)
                setLatestBlobID(resp._id);

                setTitle('');
                setTags([]);
                props.getAllAudios();
            }
        }

        var fd = new FormData();
        fd.append("data", blob);
        fd.append("title", title);
        fd.append("tags", tags);

        xhr.open("POST", audiosUrl(), true);
        const storedToken = localStorage.getItem('authToken')
        xhr.setRequestHeader('Authorization', 'Bearer ' + storedToken);
        xhr.send(fd);
    }

    let stop = (shouldPostNote) => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                if (shouldPostNote) {
                    upload(blob);
                } else {
                    console.log("Discarding note")
                }
                setIsRecording(false);
                setIsBlocked(false);

                console.log('blobURL' + blobURL);
            }).catch((e) => console.error(e));
    }

    return (
        <div className="Audios">
            <h1>Save an audio</h1>
            <form onSubmit={handleSubmit}>
                <h2>Title</h2>
                <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <h2>Record an audio</h2>
                <button onClick={start} disabled={isRecording}>Record</button>
                <button onClick={() => stop(true)} disabled={!isRecording}>Save</button>
                <button onClick={() => stop(false)} disabled={!isRecording}>Cancel</button>

                <h2>Tags</h2>
                <Tags
                    tags={tags}
                    setTags={setTags}
                />

                <button type="submit">Save this audio ➕</button>
            </form>

        </div>
    )
}

