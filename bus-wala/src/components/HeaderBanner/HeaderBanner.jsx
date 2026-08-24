import { useState, useEffect } from "react";
import { FaMusic, FaBus } from "react-icons/fa";
import "./HeaderBanner.css";

const HeaderBanner = () => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // convert 0 to 12
      const formattedHours = String(hours).padStart(2, "0");

      setTimeStr(`${formattedHours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header-banner-container">
      {/* Left Speaker */}
      <div className="bus-speaker left-speaker">
        <div className="speaker-grill" />
      </div>

      {/* Music Icon Toggle */}
      <div className="header-icon-box music-box">
        <FaMusic className="header-icon" />
      </div>

      {/* Main Bus Signboard */}
      <div className="main-signboard">
        <div className="signboard-content">
          <div className="signboard-title-row">
            <FaBus className="sign-bus-icon" />
            <h1 className="signboard-hindi">बस वाला</h1>
            <FaBus className="sign-bus-icon" />
          </div>
          <p className="signboard-slogan">ENJOY THE MUSIC. ENJOY THE RIDE.</p>
        </div>
      </div>

      {/* Live Digital Clock */}
      <div className="header-icon-box clock-box">
        <span className="digital-clock">{timeStr || "05:30:00 PM"}</span>
      </div>

      {/* Right Speaker */}
      <div className="bus-speaker right-speaker">
        <div className="speaker-grill" />
      </div>
    </header>
  );
};

export default HeaderBanner;
