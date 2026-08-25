import React, { useState, useEffect } from "react";
import "./RotatePrompt.css";

const RotatePrompt = () => {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobileWidth = Math.min(window.innerWidth, window.innerHeight) <= 1024;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      setIsPortraitMobile(isPortrait && (isMobileWidth || isTouch));
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener("change", checkOrientation);
    }

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener("change", checkOrientation);
      }
    };
  }, []);

  return (
    <div className={`rotate-prompt-overlay ${isPortraitMobile ? "show-rotate-prompt" : ""}`}>
      <div className="rotate-card">
        <div className="rotate-icon-wrapper">
          <span className="phone-icon">📱</span>
          <span className="arrow-icon">🔄</span>
        </div>
        <h2 className="rotate-hindi-text">
          मैंने बनाई है एक म्यूज़िक प्लेयर ऐप! देखने के लिए करिए अपने फोन को रोटेट 🔄
        </h2>
        <p className="rotate-english-sub">
          Please rotate your phone to landscape mode for the best bus cockpit experience.
        </p>
      </div>
    </div>
  );
};

export default RotatePrompt;
