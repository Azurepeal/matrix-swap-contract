import { expect } from "chai";

import { Uni2Dex } from "../../config/types";
import { BalancerViewer, ICurvePoolInfoViewer, TokenViewer, UniV2Viewer } from "../../src/types";
import { logger } from "../logger";

export const testCommonViewerFetchToken = async (wnative: string, tokenViewer: TokenViewer): Promise<void> => {
  await tokenViewer.getTokenMetadata(wnative);
};

export const testCommonViewerUniV2 = async (uni2Dexes: Uni2Dex[], uniV2Viewer: UniV2Viewer): Promise<void> => {
  for (const uni2 of uni2Dexes) {
    const len = await uniV2Viewer.allPairsLength(uni2.factory);
    if (len.lte(0)) {
      continue;
    }

    await uniV2Viewer.getPairInfo(uni2.factory, 0);
  }
};

export const testCommonViewerCurve = async (curveViewers: ICurvePoolInfoViewer[]): Promise<void> => {
  for (const curveViewer of curveViewers) {
    const poolAddrs = await curveViewer.pools();
    expect(poolAddrs.length).greaterThan(0);
    await curveViewer.getPoolInfo(poolAddrs[0]);
  }
};

// export function testCommonViewerBalancer(config: IConfig, balancerViewer: BalancerViewer): void {
//   it("viewer-balancer", async function () {
//     if (!config.balancerPools || !config.balancerPools.***) {
//       return;
//     }
//     await this.balancerViewer.getPoolInfo(this.config.balancerPool);
//   });
// }
