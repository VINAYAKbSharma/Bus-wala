import React, { useState, useEffect } from "react";
import { 
  FaStepBackward, 
  FaPause, 
  FaPlay, 
  FaStepForward, 
  FaVolumeUp, 
  FaVolumeMute,
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
  currentSongIndex,
  setCurrentSongIndex,
  playlistLength,
  volume,
  setVolume,
  audioRef
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
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
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

      {/* LEFT PHYSICAL MEDIA & SWITCH CONSOLE */}
      <div className="left-console-panel">
        {/* Physical Media Buttons Row */}
        <div className="physical-media-row">
          <button className="dash-btn media-dash-btn" onClick={handlePrev} title="Previous Track">
            <FaStepBackward className="dash-icon" />
            <span className="dash-btn-label">PREV</span>
          </button>

          <button 
            className={`dash-btn media-dash-btn ${isPlaying ? "active-media" : ""}`} 
            onClick={handleTogglePlay}
            title="Play / Pause"
          >
            {isPlaying ? <FaPause className="dash-icon" /> : <FaPlay className="dash-icon" />}
            <span className="dash-btn-label">{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>

          <button className="dash-btn media-dash-btn" onClick={handleNext} title="Next Track">
            <FaStepForward className="dash-icon" />
            <span className="dash-btn-label">NEXT</span>
          </button>
        </div>

        {/* Volume Rotary Dial Panel */}
        <div className="volume-dial-container">
          <div className="vol-header">
            <span className="vol-title">VOLUME</span>
          </div>
          <div className="knob-wrapper">
            <span className="vol-minus">-</span>
            <div className="rotary-knob" style={{ transform: `rotate(${knobRotation}deg)` }}>
              <div className="knob-indicator-dot" />
            </div>
            <span className="vol-plus">+</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={handleVolumeChange}
              className="invisible-vol-slider"
              title="Volume Control"
            />
          </div>
        </div>

        {/* Bottom 4 Bus Feature Switch Buttons */}
        <div className="bus-switches-row">
          {/* Door */}
          <button className={`switch-btn door-switch ${doorOpen ? "switched-on" : ""}`} onClick={handleDoor}>
            <div className="switch-icon-box green-icon">
              <FaDoorOpen />
            </div>
            <span className="switch-label">DOOR</span>
          </button>

          {/* Bell */}
          <button className="switch-btn bell-switch" onClick={handleBell}>
            <div className="switch-icon-box yellow-icon">
              <FaBell />
            </div>
            <span className="switch-label">BELL</span>
          </button>

          {/* Indicator */}
          <button 
            className={`switch-btn indicator-switch ${indicatorActive ? "blinking-indicator" : ""}`} 
            onClick={handleIndicator}
          >
            <div className="switch-icon-box green-icon">
              <FaExchangeAlt />
            </div>
            <span className="switch-label">INDICATOR</span>
          </button>

          {/* Brake */}
          <button className={`switch-btn brake-switch ${brakeActive ? "switched-on" : ""}`} onClick={handleBrake}>
            <div className="switch-icon-box red-icon">
              <FaExclamationTriangle />
            </div>
            <span className="switch-label">BRAKE</span>
          </button>
        </div>
      </div>

      {/* CENTER BIG RED HORN BUTTON */}
      <div className="horn-button-wrapper">
        <button 
          className={`big-red-horn ${hornPressed ? "pressed" : ""}`} 
          onClick={handleHorn}
          title="Press Horn"
        >
          <div className="horn-inner">
            <span className="horn-symbol">📢</span>
            <span className="horn-text">HORN</span>
          </div>
        </button>
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