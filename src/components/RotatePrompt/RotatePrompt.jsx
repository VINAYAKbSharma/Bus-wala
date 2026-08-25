import React from "react";
import "./RotatePrompt.css";

const RotatePrompt = () => {
  return (
    <div className="rotate-prompt-overlay">
      <div className="rotate-card">
        <div className="rotate-icon-wrapper">
          <span className="phone-icon">📱</span>
          <span className="arrow-icon">🔄</span>
        </div>
        <h2 className="rotate-hindi-text">
          मैंने बनाई है एक म्यूज़िक प्लेयर ऐप! देखने के लिए करिए अपने फोन को रोटेट
        </h2>
        <p className="rotate-english-sub">
          Please rotate your phone to landscape mode for the best bus cockpit experience.
        </p>
      </div>
    </div>
  );
};

export default RotatePrompt;
