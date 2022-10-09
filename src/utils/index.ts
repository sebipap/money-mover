import { getCost, shortestPath } from "./path";
import { FromToData, Platform } from "./types";

const getAllSubsets = (platforms: Platform[]) =>
  platforms.reduce(
    (subsets: Platform[][], value) => {
      return subsets.concat(subsets.map((set) => [value, ...set]));
    },
    [[]]
  );

export const allInstructionsSets = (
  fromToData: FromToData,
  enabledPlatforms: Platform[]
) => {
  const allInstructionSets = getAllSubsets(enabledPlatforms).map(
    (platformsSubset) => getIntructions(fromToData, platformsSubset)
  );
  return allInstructionSets.filter((instruction) => instruction.length > 0);
};

export const getIntructions = (
  fromToData: FromToData,
  enabledPlatforms: Platform[]
) => {
  const steps = shortestPath(fromToData.from, fromToData.to, enabledPlatforms);

  console.log({
    steps: steps?.map((st) => st.platform.name),
    eps: enabledPlatforms.map((ep) => ep.name),
  });

  const transitions = steps?.map((step, index) => [step, steps[index + 1]]);

  // transitions types
  // 1. in the same platform, swap tokens
  // 2. with the same token and network, send to different platform

  const instructions = [];

  if (transitions) {
    for (const [fromNode, toNode] of transitions) {
      if (!toNode) {
        continue;
      }

      const cost = getCost(fromNode, toNode);

      const isTokenSwap =
        fromNode.platform.name === toNode.platform.name &&
        fromNode.token !== toNode.token;
      const isTokenTransfer =
        fromNode.token === toNode.token &&
        fromNode.network === toNode.network &&
        fromNode.platform.name !== toNode.platform.name;

      if (isTokenSwap) {
        instructions.push(
          `In ${fromNode.platform.name}, swap ${fromNode.token} to ${toNode.token} for $${cost}`
        );
      } else if (isTokenTransfer) {
        instructions.push(
          `In ${fromNode.platform.name}, send ${fromNode.token} through the ${fromNode.network} network to ${toNode.platform.name} for $${cost}`
        );
      }
    }
  }
  return instructions;
};
