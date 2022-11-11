import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import { CurveDex, Uni2Dex } from "../../config/types";
import { Approve, ApproveProxy, RouteProxy } from "../../src/types";
import type {
  BalancerAdapter,
  CurveAdapter,
  EllipsisAdapter,
  StableSwapAdapter,
  StableSwapNoRegistryAdapter,
  UniV2Adapter,
  UniV3Adapter,
} from "../../src/types/SmartRoute/adapter";
import { UniV2Viewer } from "../../src/types/Viewer/UniV2Viewer";

export const fixtureCommonRoute = async (
  wnative: string,
  uni2Dexes: Uni2Dex[],
  curveDexes: CurveDex[],
): Promise<{
  balancerAdapter: BalancerAdapter;
  curveAdapter: CurveAdapter | undefined;
  stableSwapNoRegistryAdapter: StableSwapNoRegistryAdapter;
  stableSwapAdapter: StableSwapAdapter | undefined;
  ellipsisAdapter: EllipsisAdapter | undefined;
  uniV2Adapter: UniV2Adapter;
  uniV3Adapter: UniV3Adapter;
  uniV2Viewer: UniV2Viewer;
  routeProxy: RouteProxy;
  approveProxy: ApproveProxy;
  approve: Approve;
}> => {
  const uniV2Viewer = await ethers
    .getContractFactory("UniV2Viewer")
    .then(f =>
      f.deploy(
        uni2Dexes.map(uni2 => uni2.factory),
        uni2Dexes.map(uni2 => uni2.fee),
      ),
    )
    .then(c => c.deployed());

  const balancerAdapter = await ethers
    .getContractFactory("BalancerAdapter")
    .then(f => f.deploy(wnative))
    .then(c => c.deployed());

  let curveAdapter: CurveAdapter | undefined;
  let ellipsisAdapter: EllipsisAdapter | undefined;
  let stableSwapAdapter: StableSwapAdapter | undefined;
  for (const curveDex of curveDexes) {
    if (curveDex.forkType == "curve") {
      curveAdapter = await ethers
        .getContractFactory("CurveAdapter")
        .then(f =>
          f.deploy(wnative, curveDex.registry, curveDex.registry, curveDex.factoryRegistry, curveDex.factoryRegistry),
        )
        .then(c => c.deployed());
    } else if (curveDex.forkType == "ellipsis") {
      ellipsisAdapter = await ethers
        .getContractFactory("EllipsisAdapter")
        .then(f => f.deploy(wnative, curveDex.registry));
    } else if (curveDex.forkType == "stableswap") {
      stableSwapAdapter = await ethers
        .getContractFactory("StableSwapAdapter")
        .then(f => f.deploy(curveDex.registry, wnative))
        .then(c => c.deployed());
    }
  }
  const uniV2Adapter = await ethers
    .getContractFactory("UniV2Adapter")
    .then(f => f.deploy(uniV2Viewer.address))
    .then(c => c.deployed());
  const uniV3Adapter = await ethers
    .getContractFactory("UniV3Adapter")
    .then(f => f.deploy(wnative))
    .then(c => c.deployed());
  const stableSwapNoRegistryAdapter = await ethers
    .getContractFactory("StableSwapNoRegistryAdapter")
    .then(f => f.deploy())
    .then(c => c.deployed());

  const approve = await ethers
    .getContractFactory("Approve")
    .then(f => f.deploy())
    .then(c => c.deployed());
  const approveProxy = await ethers
    .getContractFactory("ApproveProxy")
    .then(f => f.deploy(approve.address))
    .then(c => c.deployed());
  const routeProxy = await ethers
    .getContractFactory("RouteProxy")
    .then(f => f.deploy(approveProxy.address, "0x0000000000000000000000000000000000000000", wnative))
    .then(c => c.deployed());

  const signer = (await ethers.getSigners())[0];
  await approve.init(signer.address, approveProxy.address);
  await approveProxy.init(signer.address, [routeProxy.address]);

  return {
    balancerAdapter,
    ellipsisAdapter,
    curveAdapter,
    uniV2Adapter,
    uniV3Adapter,
    uniV2Viewer,
    stableSwapNoRegistryAdapter,
    stableSwapAdapter,
    routeProxy,
    approveProxy,
    approve,
  };
};
