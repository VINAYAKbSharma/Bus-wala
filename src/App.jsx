import { useState } from "react";

import SplashScreen from "./components/SplashScreen/SplashScreen";
import BusDashboard from "./components/BusDashboard/BusDashboard";

import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

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