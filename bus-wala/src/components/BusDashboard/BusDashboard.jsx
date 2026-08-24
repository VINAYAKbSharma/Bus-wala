import React, { useState, useRef, useEffect } from "react";
import HeaderBanner from "../HeaderBanner/HeaderBanner";
import InfotainmentPlayer from "../InfotainmentPlayer/InfotainmentPlayer";
import BusControls from "../BusControls/BusControls";
import { playlistData } from "../../data/playlist";
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
  }, [volume]);

  // Play audio when currentSongIndex or isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log("Audio play error:", err);
      });
    }
  }, [currentSongIndex]);

  return (
    <main className="bus-dashboard-main">
      {/* Background Cockpit Image imported properly for Vite build */}
      <img
        src={busBg}
        alt="Bus Wala Cockpit Dashboard"
        className="bus-background-img"
      />

      {/* Invisible HTML Audio Element */}
      <audio ref={audioRef} src={activeSong.src} />

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