import "../styles/globals.css";
import Layout from "../components/Layout";

import {
  Mainnet,
  DAppProvider,
  Goerli,
  MetamaskConnector,
  CoinbaseWalletConnector,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    // [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Goerli.chainId]: getDefaultProvider("goerli"),
  },
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
  },
  gasLimitBufferPercentage: 10,
};

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DAppProvider>
  );
}

export default MyApp;
