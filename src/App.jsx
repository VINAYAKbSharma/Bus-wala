import { useState, useEffect } from "react";

import SplashScreen from "./components/SplashScreen/SplashScreen";
import BusDashboard from "./components/BusDashboard/BusDashboard";

import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Automatic Fullscreen & Landscape Orientation Lock
  useEffect(() => {
    const handleAutoFullscreen = async () => {
      try {
        if (window.screen?.orientation?.lock) {
          await window.screen.orientation.lock("landscape").catch(() => {});
        }
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen().catch(() => {});
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen().catch(() => {});
        }
      } catch (err) {
        // Catch browser security policies
      }
    };

    window.addEventListener("touchstart", handleAutoFullscreen, { once: true });
    window.addEventListener("click", handleAutoFullscreen, { once: true });

    return () => {
      window.removeEventListener("touchstart", handleAutoFullscreen);
      window.removeEventListener("click", handleAutoFullscreen);
    };
  }, []);

  return (
    <div className="app">

      {showSplash ? (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      ) : (
        <BusDashboard />
      )}

    </div>
  );
}

export default App;