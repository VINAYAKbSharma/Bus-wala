import { useEffect, useRef, useState } from "react";
import "./MusicControls.css";

const BASE = import.meta.env.BASE_URL || "/";
const getAudioUrl = (filename) => {
  const base = BASE.endsWith("/") ? BASE : `${BASE}/`;
  return `${base}audio/${filename}`;
};

const songs = [
  {
    title: "Bahut Jatate Ho Chah Humse",
    artist: "Lucky Ali",
    src: getAudioUrl("bahut_jatate_ho.mp3"),
  },
  {
    title: "Main Agar Saamne",
    artist: "Arijit Singh",
    src: getAudioUrl("main_agar_saamne.mp3"),
  },
];

const MusicControls = () => {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const song = songs[currentSong];

  // Set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Previous song
  const previousSong = () => {
    setCurrentSong((prev) =>
      prev === 0 ? songs.length - 1 : prev - 1
    );

    setIsPlaying(true);
  };

  // Next song
  const nextSong = () => {
    setCurrentSong((prev) =>
      prev === songs.length - 1 ? 0 : prev + 1
    );

    setIsPlaying(true);
  };

  // Automatically play newly selected song
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSong]);

  return (
    <>
      <audio ref={audioRef} src={song.src} />

      {/* PREVIOUS */}
      <button
        className="hotspot prev-hotspot"
        onClick={previousSong}
        aria-label="Previous song"
      />

      {/* PLAY / PAUSE */}
      <button
        className="hotspot play-hotspot"
        onClick={togglePlay}
        aria-label="Play or pause music"
      />

      {/* NEXT */}
      <button
        className="hotspot next-hotspot"
        onClick={nextSong}
        aria-label="Next song"
      />

      {/* VOLUME */}
      <input
        className="volume-hotspot"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        aria-label="Volume"
      />

      {/* Current song indicator */}
      <div className="song-status">
        {isPlaying ? "♪" : "Ⅱ"} {song.title}
      </div>
    </>
  );
};

export default MusicControls;