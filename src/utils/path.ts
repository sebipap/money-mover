import { WeightedGraph } from "./graph";
import { platforms } from "./platforms";

import { Node, Token } from "./types";

const graph = new WeightedGraph();

const nodes: Node[] = platforms.flatMap((platform) => {
  const { inputs, outputs } = platform;

  return [...inputs, ...outputs].flatMap(({ network, tokens }) =>
    tokens.map((token: Token) => ({
      token: token,
      network: network,
      platform: platform,
    }))
  );
});

const areConnected = (node1: Node, node2: Node) => {
  if (node1 === node2) {
    return false;
  }

  return (
    (node1.network === node2.network && node1.token === node2.token) ||
    node1.platform.name === node2.platform.name
  );
};

const nodeToString = (node: Node) => JSON.stringify(node);

type TokenNetworkPair = {
  token: Token;
  platformName: string;
};

export const shortestPath = (
  from: TokenNetworkPair,
  to: TokenNetworkPair
): Node[] | null => {
  const fromPlatform = platforms.find(
    (platform) => platform.name === from.platformName
  );
  const toPlatform = platforms.find(
    (platform) => platform.name === to.platformName
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

  const startNodeString = nodeToString(startNode);
  const endNodeString = nodeToString(endNode);

  for (const node1 of [...nodes, startNode, endNode]) {
    graph.addVertex(nodeToString(node1));
    for (const node2 of nodes) {
      if (areConnected(node1, node2)) {
        graph.addEdge(nodeToString(node1), nodeToString(node2), 1);
      }
    }
  }

  const stringifiedNodePath: string[] = graph.Dijkstra(
    startNodeString,
    endNodeString
  );

  return stringifiedNodePath.map((stringifiedNode: string) =>
    JSON.parse(stringifiedNode)
  );
};
