import { shortestPath } from "./path";
import { FromToData } from "./types";

export const getSteps = (fromToData: FromToData) => {
  return shortestPath(fromToData.from, fromToData.to);
};

export const getIntructions = (fromToData: FromToData) => {
  const steps = getSteps(fromToData);

  const transitions = steps?.map((step, index) => [step, steps[index + 1]]);

  // transitions types
  // 1. in the same platform, swap tokens
  // 2. with the same token and network, send to different platform

  let instructions = [];

  if (transitions) {
    let i = 1;
    for (const [fromNode, toNode] of transitions) {
      if (!toNode) {
        continue;
      }

      const isTokenSwap =
        fromNode.platform.name === toNode.platform.name &&
        fromNode.token !== toNode.token;
      const isTokenTransfer =
        fromNode.token === toNode.token &&
        fromNode.network === toNode.network &&
        fromNode.platform.name !== toNode.platform.name;

      if (isTokenSwap) {
        instructions.push(`swap ${fromNode.token} to ${toNode.token}`);
      } else if (isTokenTransfer) {
        instructions.push(
          `send ${fromNode.token} through the ${fromNode.network} network to ${toNode.platform.name}`
        );
      }
      i++;
    }
  }
  return instructions;
};
