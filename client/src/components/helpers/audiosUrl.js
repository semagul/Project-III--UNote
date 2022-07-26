import packageJson from '../../../package.json';

// Uses the 'package.json' to get the IP and port of the backend and fetch all audio notes.
export default function audiosUrl() {
  return `${packageJson.proxy}/api/audios`;
}