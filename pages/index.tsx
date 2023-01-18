import * as React from "react";
import { useState } from "react";
import Script from "next/script";

import { AnimateCC, GetAnimationObjectParameter } from "react-adobe-animate";

const Home = () => {
  const [scriptsLoadedCount, setScriptsLoadedCount] = useState(0);
  const [isCreateJSLoaded, setIsCreateJSLoaded] = useState(false);

  const [animationObject, getAnimationObject] =
    useState<GetAnimationObjectParameter | null>(null);
  const [paused, setPaused] = useState(false);

  console.log(animationObject);

  const onScriptLoad = () => {
    setScriptsLoadedCount((n) => n + 1);
  };

  const onPausedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPaused(value === "true");
  };

  const areScriptsLoaded = isCreateJSLoaded && scriptsLoadedCount === 1;

  return (
    <div>
      <Script
        src="https://code.createjs.com/1.0.0/createjs.min.js"
        onReady={() => setIsCreateJSLoaded(true)}
      />
      {isCreateJSLoaded && (
        <>
          <Script
            src="/hahow.js"
            type="text/javascript"
            onReady={onScriptLoad}
          />
        </>
      )}

      <div>
        <div>
          <p>Paused</p>
          <select onChange={onPausedChange} defaultValue="false">
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
      </div>
      <div style={{ width: "600px" }}>
        {!areScriptsLoaded && "Loading scripts..."}
        {areScriptsLoaded && (
          <AnimateCC
            animationName="hahow"
            getAnimationObject={getAnimationObject}
            paused={paused}
            onError={() => console.log("onError")}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
