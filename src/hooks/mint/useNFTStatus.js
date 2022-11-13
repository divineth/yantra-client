import { useCall } from "@usedapp/core";
import { useNFTContract } from "../useContract";

export const useNFTStatus = () => {
  const nftContract = useNFTContract();

  const { value, error } =
    useCall(
      nftContract && {
        contract: nftContract,
        method: "saleStatus",
        args: [],
      }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value;
};
