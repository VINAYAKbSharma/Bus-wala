import { useState } from "react";

import SplashScreen from "./components/SplashScreen/SplashScreen";
import BusDashboard from "./components/BusDashboard/BusDashboard";
import RotatePrompt from "./components/RotatePrompt/RotatePrompt";

import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="app">
      {/* Mobile Portrait Phone Rotation Prompt */}
      <RotatePrompt />

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