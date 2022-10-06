export type CryptoToken =
  | "BTC"
  | "ETH"
  | "USDT"
  | "USDC"
  | "BNB"
  | "BUSD"
  | "DASH"
  | "SOL";

export type FiatCurrency =
  | "ARS"
  | "USD"
  | "EUR"
  | "GBP"
  | "BRL"
  | "CAD"
  | "CLP";

export type Token = CryptoToken | FiatCurrency;

export type CryptoNetwork = "BTC mainnet" | "BTC LN" | "ERC" | "BSC" | "CBU";

export type Network =
  | CryptoNetwork
  | "CBU"
  | "CASH"
  | "lemon"
  | "paypal"
  | "wise"
  | "deelCoinbase"
  | "us bank transfer";

export type TransferMethod = {
  network: Network;
  tokens: Token[];
};

export type Conversion = {
  from: Token;
  to: Token;
  exchangeRate: number;
};

export type Platform = {
  name: string;
  conversions: Conversion[];
  inputs: TransferMethod[];
  outputs: TransferMethod[];
};

export type Node = {
  token: Token;
  network: Network | null; // network can be null in the case of the start and end node.
  platform: Platform;
};

export type Transfer = {
  from: {
    token: Token;
    platform: Platform;
  };
  to: {
    token: Token;
    platform: Platform;
  };
};

export type PlatformTokenPair = {
  platformName: string;
  token: Token;
};

export type FromToData = {
  from: PlatformTokenPair;
  to: PlatformTokenPair;
};
