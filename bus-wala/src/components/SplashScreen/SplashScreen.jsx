import { useEffect } from "react";
import { FaBus, FaPlay } from "react-icons/fa";
import "./SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-screen" onClick={onComplete}>
      <video
        className="splash-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/videos/bus-wala-animated-splash.mp4"
          type="video/mp4"
        />
      </video>

      <div className="splash-overlay">
        <div className="splash-card">
          <div className="splash-bus-badge">
            <FaBus className="splash-bus-icon" />
          </div>
          <h1 className="splash-title">बस वाला</h1>
          <p className="splash-subtitle">ENJOY THE MUSIC. ENJOY THE RIDE.</p>
          
          <button className="splash-enter-btn" onClick={onComplete}>
            <FaPlay className="enter-icon" /> START RIDE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;