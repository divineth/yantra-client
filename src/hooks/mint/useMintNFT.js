import { useContractFunction } from "@usedapp/core";
import { useNFTContract } from "../useContract";

export const useMintNFT = () => {
  const contract = useNFTContract();

  const { state, send } = useContractFunction(contract, "mint", {
    transactionName: "Mint NFTs",
  });

  return {state, send};
};
