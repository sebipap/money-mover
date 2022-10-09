import React, { useState } from "react";
import PlatformTokenInput from "./PlatformTokenInput";
import { getIntructions } from "./utils";
import { FromToData } from "./utils/types";

import "./App.css";
import { getPlatforms } from "./utils/platforms";

const App = () => {
  const defaultFromToData: FromToData = {
    from: {
      platformName: "Deel",
      token: "USD",
    },
    to: {
      platformName: "Argentina Bank",
      token: "ARS",
    },
  };

  const [fromToData, setFromToData] = useState<FromToData>(defaultFromToData);

  const allPlatformNames = getPlatforms().map((platform) => platform.name);

  const [enabledPlatformNames, setEnabledPlatformNames] =
    useState<string[]>(allPlatformNames);

  const enabledPlatforms = getPlatforms().filter((platform) => {
    return enabledPlatformNames.includes(platform.name);
  });

  const instructions = getIntructions(fromToData, enabledPlatforms);

  return (
    <div className="p-10">
      <div className={"form-control w-96 border p-5 rounded border-slate-50"}>
        {getPlatforms().map((platform, index) => {
          const checked = enabledPlatformNames.includes(platform.name);

          return (
            <div key={`${platform.name}-${index}`}>
              <label className="label cursor-pointer">
                <span className="label-text">{platform.name}</span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    if (checked) {
                      setEnabledPlatformNames((prevEnabledPlatforms) =>
                        prevEnabledPlatforms.filter(
                          (platformName) => platformName !== platform.name
                        )
                      );
                    } else {
                      setEnabledPlatformNames((prevEnabledPlatforms) => [
                        ...prevEnabledPlatforms,
                        platform.name,
                      ]);
                    }
                  }}
                  className="toggle toggle-accent"
                />
              </label>
            </div>
          );
        })}
      </div>
      <PlatformTokenInput
        fromToData={fromToData}
        setFromToData={setFromToData}
        enabledPlatformNames={enabledPlatformNames}
      />
      <ul className="steps steps-vertical">
        {instructions.map((instruction) => (
          <li
            key={instruction}
            data-content={instruction.includes("swap") ? "↺" : "→"}
            className="step step-primary"
          >
            {instruction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
