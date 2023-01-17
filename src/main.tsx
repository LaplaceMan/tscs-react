import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.less";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { ApplicationProvider } from "./context/ApplicationContext";
import { DataProvider } from "./context/DataContext";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiClient, chains } from "./client/wagmi";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <DataProvider>
          <ApplicationProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ApplicationProvider>
        </DataProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </GlobalProvider>
);
