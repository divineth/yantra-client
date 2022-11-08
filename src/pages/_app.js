import "../styles/globals.css";
import Layout from "../components/Layout";

import {
  Mainnet,
  DAppProvider,
  Goerli,
  MetamaskConnector,
  CoinbaseWalletConnector,
  Localhost,
  Mumbai,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { YantraDappProvider } from "../providers/YantraProvider/YantraDappProvider";

const config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    // [Mainnet.chainId]: getDefaultProvider("mainnet"),
    // [Goerli.chainId]: getDefaultProvider("goerli"),
    // [Localhost.chainId]: "http://127.0.0.1:7545",
    [Mumbai.chainId]: "https://polygon-mumbai.g.alchemy.com/v2/fgk6Oa3fc9bndH31q-ahB6HwPRK25-mP"
  },
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
  },
  multicallVersion: 1,
  multicallAddresses: {
    [Mumbai.chainId]: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc",
  },
  gasLimitBufferPercentage: 20,
};

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <YantraDappProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </YantraDappProvider>
    </DAppProvider>
  );
}

export default MyApp;
