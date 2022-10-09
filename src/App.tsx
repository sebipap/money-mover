import React, { useState } from "react";
import PlatformTokenInput from "./components/PlatformTokenInput";
import { allInstructionsSets } from "./utils";
import { FromToData } from "./utils/types";

import "./App.css";
import { getPlatforms } from "./utils/platforms";
import { PlatformsModal } from "./components/PlatformsModal";
import { Instructions } from "./components/Instructions";

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

  const instructionSets = allInstructionsSets(fromToData, enabledPlatforms);

  return (
    <div className="mx-44 mt-10">
      <div className="flex gap-10">
        <div className="flex rounded-lg p-5 gap-4 bg-violet-900 flex-1">
          <PlatformTokenInput
            fromToData={fromToData}
            setFromToData={setFromToData}
            enabledPlatformNames={enabledPlatformNames}
          />
        </div>
        <div className="flex rounded-lg p-10 gap-4 bg-violet-900">
          <PlatformsModal
            enabledPlatformNames={enabledPlatformNames}
            setEnabledPlatformNames={setEnabledPlatformNames}
          />
        </div>
      </div>

      <Instructions instructionSets={instructionSets} />
    </div>
  );
};

export default App;
