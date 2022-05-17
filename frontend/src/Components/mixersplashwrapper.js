import React, { useEffect, useState } from "react";
import { Mixer } from "./mixer.js";
import { SplashPage } from "./splashpage.js";

const MixerWrapper = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleStartClick = () => setShowSplash(false);

  return (
    <div>
      {showSplash ? (
        <SplashPage handleStartClick={handleStartClick} />
      ) : (
        <Mixer showSplash={showSplash}/>
      )}
    </div>
  );
};

export { MixerWrapper };


// frontend/src/Components/Mixer.js