import { getCost, shortestPath } from "./path";
import { FromToData, Node, Platform } from "./types";

const getAllSubsets = (platforms: Platform[]) =>
  platforms.reduce(
    (subsets: Platform[][], value) => {
      return subsets.concat(subsets.map((set) => [value, ...set]));
    },
    [[]]
  );

const groupByPlatformAndNetwork = (paths: Node[][]) => {
  const groups = paths.reduce(
    (group: Record<string, Node[][]>, path: Node[]) => {
      const category = path
        .map(
          ({ platform: { name: platformName }, network }) =>
            `${platformName}-${network}`
        )
        .join(" -> ");
      group[category] = group[category] ?? [];
      group[category].push(path);
      return group;
    },
    {}
  );

  const pathGroups = Object.values(groups).map((paths) => paths[0]);

  return pathGroups;
};

export const allInstructionsSets = (
  fromToData: FromToData,
  enabledPlatforms: Platform[]
) => {
  const allPaths = getAllSubsets(enabledPlatforms).map(
    (platformsSubset) =>
      shortestPath(fromToData.from, fromToData.to, platformsSubset) || []
  );

  const groupedPaths = groupByPlatformAndNetwork(allPaths);

  const allInstructionSets = groupedPaths.map((path) =>
    path ? getIntructions(path) : []
  );

  return allInstructionSets.filter((instruction) => instruction.length > 0);
};

export const getIntructions = (steps: Node[]) => {
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

      const isTokenSwap =
        fromNode.platform.name === toNode.platform.name &&
        fromNode.token !== toNode.token;
      const isTokenTransfer =
        fromNode.token === toNode.token &&
        fromNode.network === toNode.network &&
        fromNode.platform.name !== toNode.platform.name;

      if (isTokenSwap) {
        instructions.push(
          `In ${fromNode.platform.name}, swap ${fromNode.token} to ${toNode.token}`
        );
      } else if (isTokenTransfer) {
        instructions.push(
          `In ${fromNode.platform.name}, send ${fromNode.token} through the ${fromNode.network} network to ${toNode.platform.name}`
        );
      }
    }
  }
  return instructions;
};
