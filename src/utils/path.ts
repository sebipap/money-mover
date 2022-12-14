import { WeightedGraph } from "./graph";
import { getPlatforms } from "./platforms";

import { Node, Platform, Token } from "./types";

const getNodesFromPlatforms = (enabledPlatforms: Platform[]) => {
  console.log({ enabledPlatforms });

  return getPlatforms()
    .flatMap((platform) => {
      const { inputs, outputs } = platform;

      return [...inputs, ...outputs].flatMap(({ network, tokens }) =>
        tokens.map((token: Token) => ({
          token: token,
          network: network,
          platform: platform,
        }))
      );
    })
    .filter((node) =>
      enabledPlatforms.map((plat) => plat.name).includes(node.platform.name)
    );
};

export const getCost = (node1: Node, node2: Node) => {
  const isTokenSwap = node1.platform.name === node2.platform.name;

  const transferMethod =
    node1.platform.outputs.find((output) => output.network === node1.network) ||
    node2.platform.inputs.find((input) => input.network === node2.network);

  if (!transferMethod) {
    console.log({ node1, node2 });
  }

  return isTokenSwap ? 0.1 : transferMethod?.fixedCost || 0.2;
};

const getWeight = (node1: Node, node2: Node) => {
  return 1 / (getCost(node1, node2) || 0.0001);
};

const areConnected = (node1: Node, node2: Node) => {
  if (node1 === node2) {
    return false;
  }

  // two nodes are connected when money can move from 1 to 2
  const isTokenSwap = node1.platform.name === node2.platform.name;

  if (isTokenSwap) {
    return true;
  }

  const isSameToken = node1.token === node2.token;
  const isSameNetwork = node1.network === node2.network;

  if (isSameToken && isSameNetwork) {
    // can send from one platform to another if the first has is as output and the second one as input

    return (
      node1.platform.outputs.some(
        (output) =>
          output.network === node2.network &&
          output.tokens.includes(node2.token)
      ) &&
      node2.platform.inputs.some(
        (input) =>
          input.network === node1.network && input.tokens.includes(node1.token)
      )
    );
  }
};

const nodeToStringifiedNode = ({ network, platform, token }: Node) =>
  [network || "null", platform.name, token].join(",");

const stringifiedNodeToNode = (stringifiedNode: string) => {
  const [network, platformName, token] = stringifiedNode.split(",");

  const platform = getPlatforms().find(
    (platform) => (platform.name = platformName)
  );

  return {
    network,
    platform,
    token,
  } as Node;
};

type TokenNetworkPair = {
  token: Token;
  platformName: string;
};

export const shortestPath = (
  from: TokenNetworkPair,
  to: TokenNetworkPair,
  enabledPlatforms: Platform[]
): Node[] | null => {
  const fromPlatform = enabledPlatforms.find(
    (platform) => platform?.name === from.platformName
  );
  const toPlatform = enabledPlatforms.find(
    (platform) => platform?.name === to.platformName
  );

  if (!fromPlatform || !toPlatform) {
    return null;
  }

  const startNode: Node = {
    token: from.token,
    network: null,
    platform: fromPlatform,
  };

  const endNode: Node = {
    token: to.token,
    network: null,
    platform: toPlatform,
  };

  const startNodeString = nodeToStringifiedNode(startNode);
  const endNodeString = nodeToStringifiedNode(endNode);

  const nodes = getNodesFromPlatforms(enabledPlatforms);

  const graph = new WeightedGraph();

  for (const node1 of [...nodes, startNode, endNode]) {
    graph.addVertex(nodeToStringifiedNode(node1));

    for (const node2 of [...nodes, startNode, endNode]) {
      if (areConnected(node1, node2)) {
        graph.addEdge(
          nodeToStringifiedNode(node1),
          nodeToStringifiedNode(node2),
          getWeight(node1, node2)
        );
      }
    }
  }

  const stringifiedNodePath: string[] = graph.Dijkstra(
    startNodeString,
    endNodeString
  );

  return stringifiedNodePath.map((stringifiedNode: string) =>
    stringifiedNodeToNode(stringifiedNode)
  );
};
