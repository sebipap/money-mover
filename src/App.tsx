import { useState } from "react";
import PlatformTokenInput from "./PlatformTokenInput";
import { getIntructions } from "./utils";
import { FromToData, Platform } from "./utils/types";

import "./App.css";
import { platforms } from "./utils/platforms";

const App = () => {
  const [fromToData, setFromToData] = useState<FromToData>({
    from: {
      platformName: "Deel",
      token: "USD",
    },
    to: {
      platformName: "Banco Galicia",
      token: "ARS",
    },
  });

  const [enabledPlatformNames, setEnabledPlatformNames] = useState<string[]>(
    platforms.map((platform) => platform.name)
  );

  const enabledPlatforms = platforms.filter((platform, i) => {
    console.log(platform);
    return enabledPlatformNames.includes(platform.name);
  });

  const instructions = getIntructions(fromToData, enabledPlatforms);

  return (
    <div className="p-10">
      <div className={"form-control w-96 border p-5 rounded border-slate-50"}>
        {platforms.map((platform, index) => {
          const checked = enabledPlatformNames.includes(platform.name);

          return (
            <div key={`${platform.name}-${index}`}>
              <label className="label cursor-pointer">
                <span className="label-text">{platform.name}</span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => {
                    if (checked) {
                      setEnabledPlatformNames((prevEnabledPlatforms) =>
                        prevEnabledPlatforms.filter(
                          (platformName) => platformName !== platform.name
                        )
                      );
                      return;
                    }
                    setEnabledPlatformNames((prevEnabledPlatforms) => [
                      ...prevEnabledPlatforms,
                      platform.name,
                    ]);
                  }}
                  className="toggle toggle-accent"
                />
              </label>
            </div>
          );
        })}
      </div>
      <PlatformTokenInput
        {...{ fromToData, setFromToData, enabledPlatforms }}
      />
      <ul className="steps steps-vertical">
        {instructions.map((instruction) => (
          <li
            data-content={instruction.includes("swap") ? "↺" : "→"}
            className="step step-primary"
          >
            {instruction}
          </li>
        ))}
      </ul>
      {JSON.stringify(enabledPlatforms.map((ep) => ep.name))}
    </div>
  );
};

export default App;
