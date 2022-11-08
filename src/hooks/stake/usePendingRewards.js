import { Mumbai, useCall } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const usePendingRewards = (userAddress) => {
  const stakeContract = useStakeContract();

  const { value, error } =
    useCall(
      userAddress && {
        contract: stakeContract,
        method: "pendingReward",
        args: [userAddress],
      },
      { refresh: 10, chainId: Mumbai.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};
