import { useCall } from "@usedapp/core";
import { useNFTContract } from "../useContract";

export const useWalletMints = (userAddress) => {
  const nftContract = useNFTContract();

  const { value, error } =
    useCall(
      nftContract &&
        userAddress && {
          contract: nftContract,
          method: "walletMints",
          args: [userAddress],
        }, {refresh: 10}
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};
