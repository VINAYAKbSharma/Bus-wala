import React, { useState, useEffect } from "react";
import { 
  FaStepBackward, 
  FaPause, 
  FaPlay, 
  FaStepForward, 
  FaBell, 
  FaExchangeAlt, 
  FaExclamationTriangle,
  FaDoorOpen
} from "react-icons/fa";
import { busSynth } from "../../utils/audioSynth";
import "./BusControls.css";

const BusControls = ({
  isPlaying,
  setIsPlaying,
  setCurrentSongIndex,
  playlistLength,
  volume,
  setVolume,
}) => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [indicatorActive, setIndicatorActive] = useState(false);
  const [brakeActive, setBrakeActive] = useState(false);
  const [hornPressed, setHornPressed] = useState(false);
  const [knobRotation, setKnobRotation] = useState(volume * 270 - 135); // -135deg to +135deg

  // Hazard Indicator Ticking Loop
  useEffect(() => {
    let interval = null;
    if (indicatorActive) {
      interval = setInterval(() => {
        busSynth.playIndicatorTick();
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [indicatorActive]);

  const handlePrev = () => {
    busSynth.playClick();
    setCurrentSongIndex((prev) => (prev === 0 ? playlistLength - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    busSynth.playClick();
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    busSynth.playClick();
    setCurrentSongIndex((prev) => (prev === playlistLength - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setKnobRotation(val * 270 - 135);
  };

  const handleHorn = () => {
    setHornPressed(true);
    busSynth.playHorn();
    setTimeout(() => setHornPressed(false), 600);
  };

  const handleDoor = () => {
    busSynth.playDoor();
    setDoorOpen((prev) => !prev);
  };

  const handleBell = () => {
    busSynth.playBell();
  };

  const handleIndicator = () => {
    busSynth.playClick();
    setIndicatorActive((prev) => !prev);
  };

  const handleBrake = () => {
    busSynth.playBrake();
    setBrakeActive(true);
    setTimeout(() => setBrakeActive(false), 800);
  };

  // Speedometer Needle angle: 0 km/h (-120deg) to 140 km/h (120deg)
  const speed = isPlaying ? 65 : 0;
  const speedAngle = (speed / 140) * 240 - 120;

  return (
    <div className="bus-controls-layer">
      {/* ILLUMINATED DEVOTIONAL SHRINE BOARD */}
      <div className="mangalmay-board">
        <span className="shrine-sparkle">✦</span>
        <span className="shrine-text">अपना सफर मंगलमय हो</span>
        <span className="shrine-sparkle">✦</span>
      </div>





      {/* RIGHT SPEEDOMETER & DASHBOARD INSTRUMENT CLUSTER OVERLAY */}
      <div className="dashboard-cluster-overlay">
        {/* Speedometer Gauge Overlay */}
        <div className="gauge-housing">
          <div className="gauge-dial">
            <div className="gauge-needle" style={{ transform: `rotate(${speedAngle}deg)` }} />
            <div className="gauge-cap" />
          </div>
        </div>

        {/* Indicator Lights Panel */}
        <div className="cluster-lights">
          <span className={`cluster-light ${indicatorActive ? "active-green blink" : ""}`}>🟢</span>
          <span className={`cluster-light ${brakeActive ? "active-red" : ""}`}>🛑</span>
          <span className={`cluster-light ${doorOpen ? "active-yellow" : ""}`}>🚪</span>
        </div>

        {/* Steering Wheel Hotspot */}
        <div className="steering-hotspot" onClick={handleHorn} title="Steering Wheel Horn" />
      </div>
    </div>
  );
};

export default BusControls;