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
    for (const node2 of [...nodes, startNode, endNode]) {
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
