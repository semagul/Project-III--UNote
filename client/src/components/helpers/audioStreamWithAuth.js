/* 
Whats the purpose of this function?
Initially the audio files were streamed from the backend to the frontend using a URL aka blobUrl.
However, with the introduction of the authorization thingy this was not possible anymore (without 
    a serious security breach eg adding the authorization token as part of the blobUrl).
As an alternative solution to using the html5 audio component, the following function uses the 
Web Audio Api. Code taken from: 
https://stackoverflow.com/questions/48277432/load-html5-audio-from-dynamic-content-provider-with-authentication

Resources:
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
*/
export default function streamAudioWithAuth(blobURL, authToken) {

    console.log("Attempting to stream from");
    console.log(blobURL);

    // create context
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // create source
    let source = audioCtx.createBufferSource();

    // route source
    source.connect(audioCtx.destination);

    // prepare request
    let request = new XMLHttpRequest();
    request.open('GET', blobURL, true /* async */);
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
    request.setRequestHeader("Authorization", `Bearer ${authToken}`);
    request.send();
}

