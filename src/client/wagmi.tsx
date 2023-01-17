import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const { chains, provider, webSocketProvider } = configureChains(
  [goerli, polygonMumbai],
  [
    publicProvider(),
    alchemyProvider({ apiKey: "T9pjpB1dNWUdJsELbLHnJy1ntDHWSAO3" }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      metaMaskWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
