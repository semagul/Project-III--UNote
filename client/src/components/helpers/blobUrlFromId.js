import packageJson from '../../../package.json';

// Uses the 'package.json' to get the IP and port of the backend and build the blobUrl URL.
export default function blobUrlFromId(audio_id) {
  return `${packageJson.proxy}/api/bloburl/${audio_id}`;
}