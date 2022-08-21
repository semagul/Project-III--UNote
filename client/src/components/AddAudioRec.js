import { useState, useEffect } from "react"
import MicRecorder from 'mic-recorder-to-mp3'
import blobUrlFromId from './helpers/blobUrlFromId'
import packageJson from '../../package.json'
import Tags from "./Tags";
import axios from "axios";

// Instead of axios the audio notes are posted by XMLHttpRequest

export default function AddAudioRec(props) {

    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [isRecording, setIsRecording] = useState(false);
    const [blobURL, setBlobUrl] = useState('');
    const [isBlocked, setIsBlocked] = useState(false);
    const [Mp3Recorder, setMp3Recorder] = useState(new MicRecorder({ bitRate: 128 }));
    const [latestBlobID, setLatestBlobID] = useState('')
    const [blob, setBlob] = useState(null)


    useEffect(() => {
        const blobURLBackEnd = blobUrlFromId(latestBlobID);
        setBlobUrl(blobURLBackEnd); //the backend will change the file to stream from the database
    }, [latestBlobID, blobURL])

    const handleSubmit = event => {
        event.preventDefault();
        (blob != null) && axiosPost();
    }

    const audiosUrl = () => {
        return `${packageJson.proxy}/api/audios`;
      }

    let start = () => {
        if (isBlocked) {
            console.log('Permission Denied');
        } else {
            setBlob(null)
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
    // let upload = () => {
    //     var xhr = new XMLHttpRequest();

    //     xhr.onload = function (e) { // don't change to arrow arrow func
    //         console.log(e)
    //         if (this.readyState === 4) {
    //             const resp = JSON.parse(e.target.responseText)
    //             console.log(resp)
    //             setLatestBlobID(resp._id);
    //             setTitle('');
    //             setTags([]);
    //             props.getAllAudios();
    //         }
    //     }

    //     xhr.open("POST", audiosUrl(), true);
    //     const storedToken = localStorage.getItem('authToken')
    //     xhr.setRequestHeader('Authorization', 'Bearer ' + storedToken);
    //     xhr.send(fd);
    // }

    const axiosPost = () => {
        const storedToken = localStorage.getItem('authToken')     
        
        var fd = new FormData();
        fd.append("blob", blob);
        fd.append("title", title);
        fd.append("tags", tags);

        axios.post('/api/audios', { blob, title, tags }, { headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${storedToken}` } })
            .then(resp=> {
                setLatestBlobID(resp._id);
                setTitle('');
                setTags([]);
                props.getAllAudios();
            })
            .catch(err => console.log(err))
    }


    let stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                setBlob(blob);
                setIsRecording(false);
                setIsBlocked(false);
            }).catch((e) => console.error(e));
    }

    return (
        <div className="Audios">
            <h2>Save an audio</h2>
            <form onSubmit={handleSubmit}>
                <h3>Title</h3>
                <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <h3>Record an audio</h3>
                <button type="button" onClick={start} disabled={isRecording}>Record</button>
                <button type="button" onClick={stop} disabled={!isRecording}>Stop</button>

                <h3>Tags</h3>
                <Tags
                    tags={tags}
                    setTags={setTags}
                />

                <button type="submit">Save this audio ➕</button>
            </form>

        </div>
    )
}

