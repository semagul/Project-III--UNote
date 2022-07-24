import { useState } from "react"
import MicRecorder from 'mic-recorder-to-mp3';
import axios from "axios";

export default function AddAudioRec(props) {

    const [title, setTitle] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobUrl] = useState('http://localhost:5005/bloburl');
    const [isBlocked, setIsBlocked] = useState(false);
    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));

    const handleSubmit = event => {
        event.preventDefault()
        axios.post('/api/audios', { title, blobURL, tags: selectedTags })
            .then(response => {
                setTitle('')
// WHAT TO  DO FOR BLOB
                setSelectedTags([])
                props.getAllAudios()
            })
            .catch(err => console.log(err))
    }

    let start = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    setIsRecording(true);
                    //console.log(isRecording);
                }).catch((e) => console.error(e));
        }
    };

    // E: this will send the mp3 blob to the backend!
    let upload = (blob) => {
        var xhr = new XMLHttpRequest();
        var filename = new Date().toLocaleString(); // S:before toISOString()
        xhr.onload = function (e) {
            if (this.readyState === 4) {
                console.log("Server returned: ", e.target.responseText);
            }
        }

        var fd = new FormData();
        fd.append("fname", filename);
        fd.append("data", blob);
        xhr.open("POST", process.env.REACT_APP_POST_AUDIO_FILE, true);
        xhr.responseType = 'arraybuffer/blob';
        xhr.send(fd);
    }

    let stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const blobURLBackEnd = "http://localhost:5005/bloburl"
                setBlobUrl(blobURLBackEnd); // E: the backend will change the file to stream from the database
                upload(blob);

                // setBlobUrl(false);
                setIsRecording(false);
                setIsBlocked(false);
            }).catch((e) => console.error(e));
    }


    let updateSelectedTags = (event) => {
        let options = event.target.options;
        let arr = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                arr.push(options[i].value)
            }
        }
        setSelectedTags(arr)
        console.log(selectedTags)
    }

    const tags = ["daily", "podcast", "restaurant", "bar", "spending",
        "earning", "job-search", "coding", "film", "series", "music", "concert",
        "to-do", "period-tracking", "birthday", "networking", "mood-tracking",
        "appointment", "for-tomorrow"]


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
                <button onClick={stop} disabled={!isRecording}>Stop</button> 
                <audio src={blobURL} controls="controls" />

                <h2>Tags</h2>

                <select name="tags" multiple value={selectedTags}
                    onChange={event => updateSelectedTags(event)}>
                    {tags?.map((tag) => <option key={tag} value={tag}>{tag}</option>)}

                </select>
                <button type="submit">Save this audio ➕</button>
            </form>

        </div>
    )
}

