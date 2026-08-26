import { useEffect, useState } from "react";
import { FaBus, FaPlay, FaHeadphones } from "react-icons/fa";
import { getAndIncrementListeners } from "../../utils/listenersCounter";
import "./SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  const [listenersCount, setListenersCount] = useState(0);

  useEffect(() => {
    setListenersCount(getAndIncrementListeners());
  }, []);

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
          src={`${(import.meta.env.BASE_URL || "/").endsWith("/") ? (import.meta.env.BASE_URL || "/") : `${import.meta.env.BASE_URL}/`}videos/bus-wala-animated-splash.mp4`}
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
          <p className="splash-author">By Vinayak Sharma</p>

          <div className="splash-listeners-badge" title="Total Website Listeners">
            <FaHeadphones className="splash-listeners-icon" />
            <span>{listenersCount.toLocaleString()} LISTENERS</span>
          </div>
          
          <button className="splash-enter-btn" onClick={onComplete}>
            <FaPlay className="enter-icon" /> START RIDE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;