import { Mumbai, useCall } from "@usedapp/core";
import { useStakeContract } from "../useContract";

export const useTotalStaked = () => {
  const stakeContract = useStakeContract();

  const { value, error } =
    useCall(
      stakeContract && {
        contract: stakeContract,
        method: "totalStakedTokens",
        args: [],
      },
      { refresh: 10, chainId: Mumbai.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};
