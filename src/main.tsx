import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/index.less";
import "./css/antd.less";
import "antd/dist/antd.less";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { ApplicationProvider } from "./context/ApplicationContext";
import { DataProvider } from "./context/DataContext";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { wagmiClient, chains } from "./client/wagmi";
import { ConfigProvider, Empty } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={chains}
      theme={lightTheme({ accentColor: "#00BEA1" })}
      modalSize="compact"
    >
      <GlobalProvider>
        <DataProvider>
          <ApplicationProvider>
            <BrowserRouter>
              <ConfigProvider
                renderEmpty={() => (
                  <Empty
                    description={
                      <div style={{ color: "#696969", fontWeight: "700" }}>
                        No Data
                      </div>
                    }
                  />
                )}
              >
                <App />
              </ConfigProvider>
            </BrowserRouter>
          </ApplicationProvider>
        </DataProvider>
      </GlobalProvider>
    </RainbowKitProvider>
  </WagmiConfig>
);
