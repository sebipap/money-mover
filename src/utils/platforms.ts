import { Conversion, TransferMethod, Platform } from "./types";

const usdArsOfficial: Conversion = {
  from: "USD",
  to: "ARS",
  exchangeRate: 120,
};

const arsUsdSolidario: Conversion = {
  from: "ARS",
  to: "USD",
  exchangeRate: 0.005,
};

const pesosTransactionArgentinaBankNetwork: TransferMethod = {
  network: "CBU",
  tokens: ["ARS"],
  fixedCost: 0,
};

const dollarTransactionArgentinaBankNetwork: TransferMethod = {
  network: "CBU",
  tokens: ["ARS"],
  fixedCost: 0,
};

const pesosTransactionArgentinaCash: TransferMethod = {
  network: "CASH",
  tokens: ["ARS"],
  fixedCost: 0,
};

const dollarTransactionArgentinaCash: TransferMethod = {
  network: "CASH",
  tokens: ["ARS"],
  fixedCost: 0,
};

const argentineBankStandardTransactionMethods: TransferMethod[] = [
  pesosTransactionArgentinaBankNetwork,
  dollarTransactionArgentinaBankNetwork,
  pesosTransactionArgentinaCash,
  dollarTransactionArgentinaCash,
];

const argentineBank: Platform = {
  name: "Argentina Bank",
  conversions: [usdArsOfficial, arsUsdSolidario],
  inputs: argentineBankStandardTransactionMethods,
  outputs: argentineBankStandardTransactionMethods,
};

const btcUsdt: Conversion = {
  from: "BTC",
  to: "USDT",
  exchangeRate: 20000,
};

const usdtBtc: Conversion = {
  from: "USDT",
  to: "BTC",
  exchangeRate: 0.00005,
};

const arsUsdt: Conversion = {
  from: "ARS",
  to: "USDT",
  exchangeRate: 0.00005,
};

const usdtArs: Conversion = {
  from: "USDT",
  to: "ARS",
  exchangeRate: 20000,
};

const btcBtcMainnet: TransferMethod = {
  network: "BTC mainnet",
  tokens: ["BTC"],
  fixedCost: 10,
};

const btcBtcLn: TransferMethod = {
  network: "BTC LN",
  tokens: ["BTC"],
  fixedCost: 0.5,
};

const lemonErcMethod: TransferMethod = {
  network: "ERC",
  tokens: ["USDT", "USDC", "ETH", "BTC", "USDC"],
  fixedCost: 3,
};

const lemonBSCMethod: TransferMethod = {
  network: "BSC",
  tokens: ["USDT", "BUSD", "BNB", "BTC"],
  fixedCost: 1.2,
};

const lemonTag: TransferMethod = {
  network: "lemon",
  tokens: ["USDT", "USDC", "ETH", "BTC", "BUSD", "BNB"],
  fixedCost: 0,
};

const deelPaypalTransferMethod: TransferMethod = {
  network: "paypal",
  tokens: ["USD"],
  fixedCost: 15,
};

const paypal: Platform = {
  name: "Paypal",
  conversions: [],
  inputs: [deelPaypalTransferMethod],
  outputs: [deelPaypalTransferMethod],
};

const lemonCash: Platform = {
  name: "Lemon Cash",
  conversions: [btcUsdt, usdtBtc, arsUsdt, usdtArs],
  inputs: [
    pesosTransactionArgentinaBankNetwork,
    lemonErcMethod,
    lemonBSCMethod,
    lemonTag,
  ],
  outputs: [
    pesosTransactionArgentinaBankNetwork,
    lemonErcMethod,
    lemonBSCMethod,
    lemonTag,
  ],
};

const deelWiseTransferMethod: TransferMethod = {
  network: "wise",
  tokens: ["USD", "EUR", "GBP"],
  fixedCost: 0,
};

const usdEur: Conversion = {
  from: "USD",
  to: "EUR",
  exchangeRate: 0.85,
};

const eurUsd: Conversion = {
  from: "EUR",
  to: "USD",
  exchangeRate: 1.18,
};

const fiatConversions: Conversion[] = [usdEur, eurUsd];

const usBankTransfer: TransferMethod = {
  network: "us bank transfer",
  tokens: ["USD"],
  fixedCost: 5.7,
};

const wise: Platform = {
  name: "Wise",
  conversions: [...fiatConversions],
  inputs: [deelWiseTransferMethod, usBankTransfer],
  outputs: [deelWiseTransferMethod, usBankTransfer],
};

const deelExtraction: TransferMethod = {
  network: "deel extraction",
  tokens: ["BTC", "DASH", "ETH", "SOL", "USDC"],
  fixedCost: 20,
};

const coinbaseErcTransferMethods: TransferMethod = {
  network: "ERC",
  tokens: ["BTC", "DASH", "ETH", "SOL", "USDC"],
  fixedCost: 2,
};

const coinbase: Platform = {
  name: "Coinbase",
  conversions: [usdtBtc, btcUsdt],
  inputs: [btcBtcMainnet, btcBtcLn, deelExtraction, coinbaseErcTransferMethods],
  outputs: [btcBtcMainnet, btcBtcLn, coinbaseErcTransferMethods],
};

const binance: Platform = {
  name: "Binance",
  conversions: [usdtBtc, btcUsdt],
  inputs: [
    btcBtcMainnet,
    btcBtcLn,
    deelExtraction,
    coinbaseErcTransferMethods,
    usBankTransfer,
  ],
  outputs: [
    btcBtcMainnet,
    btcBtcLn,
    coinbaseErcTransferMethods,
    usBankTransfer,
  ],
};

const usdUsdc: Conversion = {
  from: "USD",
  to: "USDC",
  exchangeRate: 1,
};

const deel: Platform = {
  name: "Deel",
  conversions: [usdUsdc],
  inputs: [],
  outputs: [deelPaypalTransferMethod, deelWiseTransferMethod, deelExtraction],
};

export const platformTokens = ({ conversions, inputs, outputs }: Platform) => {
  const conversionTokens = conversions.flatMap((conversion) => [
    conversion.from,
    conversion.to,
  ]);

  const inputTokens = inputs.flatMap((input) => input.tokens);
  const outputTokens = outputs.flatMap((output) => output.tokens);

  return [...new Set([...conversionTokens, ...inputTokens, ...outputTokens])];
};

const bankOfAmerica: Platform = {
  name: "Bank of America",
  conversions: [],
  inputs: [usBankTransfer],
  outputs: [usBankTransfer],
};

export const getPlatforms = (): Platform[] =>
  JSON.parse(
    JSON.stringify([
      argentineBank,
      paypal,
      lemonCash,
      wise,
      coinbase,
      binance,
      deel,
      bankOfAmerica,
    ])
  );
