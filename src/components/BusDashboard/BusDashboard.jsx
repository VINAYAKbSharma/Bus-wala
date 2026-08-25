import React, { useState, useRef, useEffect } from "react";
import HeaderBanner from "../HeaderBanner/HeaderBanner";
import InfotainmentPlayer from "../InfotainmentPlayer/InfotainmentPlayer";
import BusControls from "../BusControls/BusControls";
import MobileNightBusBg from "../MobileNightBusBg/MobileNightBusBg";
import { playlistData } from "../../data/playlist";
import { busSynth } from "../../utils/audioSynth";
import busBg from "../../assets/buss.png";
import "./BusDashboard.css";

const BusDashboard = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  const activeSong = playlistData[currentSongIndex];

  // Keep audio volume in sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    busSynth.setSynthVolume(volume);
  }, [volume]);

  // Handle play/pause and song changes cleanly
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (activeSong?.src && audio.getAttribute("src") !== activeSong.src) {
        audio.src = activeSong.src;
      }
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            busSynth.stopSynthMusic();
          })
          .catch((err) => {
            console.warn("Audio playback notice:", err.message);
            busSynth.startSynthMusic(volume);
          });
      }
    } else {
      audio.pause();
      busSynth.stopSynthMusic();
    }
  }, [currentSongIndex, isPlaying, activeSong, volume]);

  const handleAudioError = () => {
    if (isPlaying) {
      busSynth.startSynthMusic(volume);
    }
  };

  return (
    <main className="bus-dashboard-main">
      {/* Background Cockpit Image imported properly for Vite build (Desktop) */}
      <img
        src={busBg}
        alt="Bus Wala Cockpit Dashboard"
        className="bus-background-img"
      />

      {/* Running Night Bus Driver Perspective Video Background (Mobile Only) */}
      <MobileNightBusBg />

      {/* Invisible HTML Audio Element */}
      <audio
        ref={audioRef}
        src={activeSong?.src || ""}
        onError={handleAudioError}
      />

      {/* Top Windshield Signboard & Clock */}
      <HeaderBanner />

      {/* Central Floating Infotainment Media Player */}
      <InfotainmentPlayer
        playlist={playlistData}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        volume={volume}
        setVolume={setVolume}
      />

      {/* Physical Dashboard Controls & Gauges */}
      <BusControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        playlistLength={playlistData.length}
        volume={volume}
        setVolume={setVolume}
        audioRef={audioRef}
      />
    </main>
  );
};

export default BusDashboard;