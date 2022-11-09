import React, { useEffect, useState } from "react";
import { ChainId, Mumbai, useEthers, useUpdateConfig } from "@usedapp/core";
import YantraDappContext from "./context";

function YantraDappProvider({ children }) {
  const { account, chainId, library } = useEthers();
  const updateConfig = useUpdateConfig();
  const [isChainError, setIsChainError] = useState(false);

  // switch to the connectors provider whenever the account is changed
  // help to reduce the number of calls to the alchemy node
  // needs further testing
  useEffect(() => {
    try {
      if (account != undefined && library != undefined) {
        updateConfig({ readOnlyUrls: { [ChainId.Mumbai]: library } });
      } else {
        updateConfig({
          readOnlyUrls: {
            [ChainId.Mumbai]:
              "https://polygon-mumbai.g.alchemy.com/v2/fgk6Oa3fc9bndH31q-ahB6HwPRK25-mP",
          },
        });
      }
    } catch (e) {
      console.error("Provider switch failed. Going back to alchemy: ", e);
      updateConfig({
        readOnlyUrls: {
          [ChainId.Mumbai]:
            "https://polygon-mumbai.g.alchemy.com/v2/fgk6Oa3fc9bndH31q-ahB6HwPRK25-mP",
        },
      });
    }
  }, [account]);

  useEffect(() => {
    if (account != undefined && chainId != undefined) {
      if (chainId != Mumbai.chainId) {
        setIsChainError(true);
        updateConfig({
          readOnlyUrls: {
            [ChainId.Mumbai]:
              "https://polygon-mumbai.g.alchemy.com/v2/fgk6Oa3fc9bndH31q-ahB6HwPRK25-mP",
          },
        });
      } else {
        setIsChainError(false);
        updateConfig({
          readOnlyUrls: {
            [ChainId.Mumbai]: library,
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
    <YantraDappContext.Provider value={{ isChainError }}>
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
