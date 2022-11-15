import InfoSection from "../../components/InfoSection";
import Stake from "../../components/Stake";
import { useEthers } from "@usedapp/core";
import { useStakerInfo } from "../../hooks/stake/useStakerInfo";
import { usePendingRewards } from "../../hooks/stake/usePendingRewards";
import Head from "next/head";


export default function StakePage() {
  const { account } = useEthers();
  const staker = useStakerInfo(account);
  const rewards = usePendingRewards(account);

  return (
    <>
    <Head>
      <title>$YANTRA | SRI</title>
    </Head>
      <InfoSection info={staker} pendingRewards={rewards} />
      <Stake info={staker} pendingRewards={rewards}/>
    </>
  );
}
