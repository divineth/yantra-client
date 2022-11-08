import React, { useEffect, useState } from "react";
import { Localhost, useEthers } from "@usedapp/core";
import YantraDappContext from "./context";

function YantraDappProvider({ children }) {
  const { account, chainId } = useEthers();
  const [isChainError, setIsChainError] = useState(false);

  useEffect(() => {
    if (account != undefined && chainId != undefined) {
      if (chainId != Localhost.chainId) {
        setIsChainError(true);
      } else {
        setIsChainError(false);
      }
    }
  }, [account, chainId]);

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
