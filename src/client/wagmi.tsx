import "./polyfills";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, Chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const test = {
  id: 31337,
  name: "Test",
  network: "test",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["http://10.201.1.235:8545"] },
    default: { http: ["http://10.201.1.235:8545"] },
  },
} as const satisfies Chain;

export const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai, test],
  [
    publicProvider(),
    alchemyProvider({ apiKey: "q0kNwMwj7fQV3pZSonSrjyV17xtnWAbs" }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
