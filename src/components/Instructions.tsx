import React from "react";

type Props = {
  instructionSets: string[][];
};

export const Instructions = ({ instructionSets }: Props) => (
  <div>
    <h2 className="mt-10">You have {instructionSets.length} alternatives:</h2>
    {instructionSets.map((instructions, i) => (
      <div className="overfow-x-auto" key={i}>
        <ul key={i} className="steps mb-44 color-yellow">
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
    ))}
  </div>
);
