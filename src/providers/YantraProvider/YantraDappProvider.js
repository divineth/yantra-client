import React, { useEffect, useState } from "react";
import { ChainId, Mainnet, useEthers, useUpdateConfig } from "@usedapp/core";
import YantraDappContext from "./context";
import {
  useEthUSDTContract,
  useYantraEthContract,
} from "../../hooks/useContract";
import { usePrice } from "../../hooks/usePrice";

function YantraDappProvider({ children }) {
  const { account, chainId, library } = useEthers();
  const updateConfig = useUpdateConfig();
  const [isChainError, setIsChainError] = useState(false);
  const [prices, setPrices] = useState({});

  const yantraEthContract = useYantraEthContract();
  const ethUSDTContract = useEthUSDTContract();
  const ethValue = usePrice(yantraEthContract, false, 18);
  const usdtValue = usePrice(ethUSDTContract, true, 12);

  // switch to the connectors provider whenever the account is changed
  // help to reduce the number of calls to the alchemy node
  // needs further testing

  useEffect(() => {
    setPrices({
      ethValue: ethValue,
      usdtValue: usdtValue,
    });
  }, [usdtValue]);

  useEffect(() => {
    try {
      if (account != undefined && library != undefined) {
        updateConfig({ readOnlyUrls: { [ChainId.Mainnet]: library } });
      } else {
        updateConfig({
          readOnlyUrls: {
            [ChainId.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
          },
        });
      }
    } catch (e) {
      console.error("Provider switch failed. Going back to alchemy: ", e);
      updateConfig({
        readOnlyUrls: {
          [ChainId.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
        },
      });
    }
  }, [account]);

  useEffect(() => {
    if (account != undefined && chainId != undefined) {
      if (chainId != Mainnet.chainId) {
        setIsChainError(true);
        updateConfig({
          readOnlyUrls: {
            [ChainId.Mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
          },
        });
      } else {
        setIsChainError(false);
        updateConfig({
          readOnlyUrls: {
            [ChainId.Mainnet]: library,
          },
        });
      }
    }
  }, [account, chainId]);

  useEffect(() => {
    if (isChainError && account == undefined) {
      setIsChainError(false);
    }
  }, [isChainError, account]);

  return (
    <YantraDappContext.Provider value={{ isChainError, prices }}>
      {children}
    </YantraDappContext.Provider>
  );
}

function useYantraDapp() {
  const context = React.useContext(YantraDappContext);
  if (context === undefined) {
    throw new Error("useYantraDapp must be used within a YantraDappProvider");
  }
  return context;
}

export { YantraDappProvider, useYantraDapp };
