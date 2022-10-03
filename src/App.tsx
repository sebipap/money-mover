import { useState } from "react";
import PlatformTokenInput from "./PlatformTokenInput";
import { getIntructions, getSteps } from "./utils";
import { FromToData } from "./utils/types";

import "./App.css";

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

  const steps = getSteps(fromToData);
  const instructions = getIntructions(fromToData);

  return (
    <>
      <PlatformTokenInput {...{ fromToData, setFromToData }} />
      <div className="path">
        {instructions.map((instruction, index) => (
          <>
            <div className="step">{steps?.[index].platform.name}</div>
            <div className="transition">
              <p>
                {">>  "}
                {instruction}
                {"  >>"}
              </p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default App;
