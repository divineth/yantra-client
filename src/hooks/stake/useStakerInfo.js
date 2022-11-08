import { Mumbai, useCall } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useStakerInfo = (userAddress) => {
  const stakeContract = useStakeContract();

  const { value, error } =
    useCall(
      userAddress && {
        contract: stakeContract,
        method: "getStake",
        args: [userAddress],
      },
      { chainId: Mumbai.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};
