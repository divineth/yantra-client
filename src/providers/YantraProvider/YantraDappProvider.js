import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import YantraDappContext from "./context";

function YantraDappProvider({ children }) {
  const { account } = useEthers();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (account != undefined) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [account]);

  return (
    <YantraDappContext.Provider value={{ isAuthenticated }}>
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
