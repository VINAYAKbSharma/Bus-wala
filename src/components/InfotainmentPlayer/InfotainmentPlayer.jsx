import React, { useState, useEffect } from "react";
import { 
  FaPlay, 
  FaPause, 
  FaStepBackward, 
  FaStepForward, 
  FaHeart, 
  FaRegHeart, 
  FaMusic, 
  FaBars,
  FaVolumeUp,
  FaVolumeMute
} from "react-icons/fa";
import { busSynth } from "../../utils/audioSynth";
import "./InfotainmentPlayer.css";

const InfotainmentPlayer = ({
  playlist,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
  audioRef,
  volume = 0.8,
  setVolume,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const activeSong = playlist[currentSongIndex] || playlist[0];

  // Sync audio progress & duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) setDuration(audio.duration);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || activeSong.duration);
    };

    const handleEnded = () => {
      setCurrentSongIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
      setIsPlaying(true);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, currentSongIndex, activeSong]);

  const togglePlay = () => {
    busSynth.playClick();
    setIsPlaying((prev) => !prev);
  };

  const handlePrev = () => {
    busSynth.playClick();
    setCurrentSongIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleNext = () => {
    busSynth.playClick();
    setCurrentSongIndex((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const handleSelectSong = (index) => {
    busSynth.playClick();
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="infotainment-container">
      {/* LEFT SCREEN: NOW PLAYING TABLET */}
      <div className="now-playing-card">
        <div className="player-top-row">
          {/* Cover Art */}
          <div className="album-art-wrapper">
            <img 
              src={activeSong.cover} 
              alt={activeSong.title} 
              className="album-art-img"
            />
          </div>

          {/* Song Details & Waveform */}
          <div className="song-details">
            <div className="song-header">
              <div>
                <h2 className="song-title">{activeSong.title}</h2>
                <p className="song-artist">{activeSong.artist}</p>
              </div>
              <button 
                className="like-btn" 
                onClick={() => {
                  busSynth.playClick();
                  setIsLiked(!isLiked);
                }}
              >
                {isLiked ? (
                  <FaHeart className="heart-icon liked" />
                ) : (
                  <FaRegHeart className="heart-icon" />
                )}
              </button>
            </div>

            {/* Audio Waveform Equalizer Display */}
            <div className="waveform-visualizer">
              {[40, 65, 30, 85, 55, 95, 70, 45, 80, 60, 90, 40, 75, 50, 85, 65, 45, 70, 90, 55].map((h, i) => (
                <div
                  key={i}
                  className={`wave-bar ${isPlaying ? "animating" : ""}`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h + (i % 3) * 10) % 95)}%` : "20%",
                    animationDelay: `${(i % 5) * 0.12}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Seek Bar & Timestamps */}
        <div className="progress-section">
          <div className="timestamp-row">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || activeSong.duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || activeSong.duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="seek-slider"
          />
        </div>

        {/* Player Controls & Volume */}
        <div className="player-controls-row">
          <button className="ctrl-btn prev-btn" onClick={handlePrev} title="Previous">
            <FaStepBackward />
          </button>
          
          <button className="ctrl-btn play-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <FaPause /> : <FaPlay className="play-icon-offset" />}
          </button>

          <button className="ctrl-btn next-btn" onClick={handleNext} title="Next">
            <FaStepForward />
          </button>

          {setVolume && (
            <div className="inline-volume-control" title="Adjust Volume">
              <button 
                className="volume-toggle-btn"
                onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              >
                {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="inline-volume-slider"
              />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SCREEN: PLAYLIST DRAWER */}
      <div className="playlist-card">
        <div className="playlist-header">
          <div>
            <h3 className="playlist-title">PLAYLIST</h3>
            <span className="playlist-author-credit">By Vinayak Sharma</span>
          </div>
          <FaBars className="playlist-menu-icon" />
        </div>

        <div className="playlist-tracks">
          {playlist.map((track, idx) => {
            const isActive = idx === currentSongIndex;
            return (
              <div
                key={track.id}
                className={`playlist-item ${isActive ? "active-track" : ""}`}
                onClick={() => handleSelectSong(idx)}
              >
                <div className="track-icon-wrapper">
                  {isActive && isPlaying ? (
                    <div className="mini-equalizer">
                      <span className="eq-bar eq-1" />
                      <span className="eq-bar eq-2" />
                      <span className="eq-bar eq-3" />
                    </div>
                  ) : (
                    <FaMusic className="track-music-icon" />
                  )}
                </div>

                <div className="track-info">
                  <h4 className="track-name">{track.title}</h4>
                  <p className="track-artist">{track.artist}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfotainmentPlayer;
