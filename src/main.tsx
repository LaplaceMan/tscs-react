import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.less";
import { BrowserRouter } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import { GlobalProvider } from "./context/GlobalContext";
import { ApplicationProvider } from "./context/ApplicationContext";
import { DataProvider } from "./context/DataContext"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <WalletProvider>
      <ApplicationProvider>
        <DataProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DataProvider>
      </ApplicationProvider>
    </WalletProvider>
  </GlobalProvider>
);
