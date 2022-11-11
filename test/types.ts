import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import { BscConfig } from "../config/bsc_config";
import { PolygonConfig } from "../config/matic_config";
// import { ChainConfig } from "../config/types";
import { Approve, ApproveProxy } from "../src/types";
import type {
  BalancerAdapter,
  CurveAdapter,
  EllipsisAdapter,
  StableSwapAdapter,
  StableSwapNoRegistryAdapter,
  TrashUniV2Adapter,
  UniV2Adapter,
  UniV3Adapter,
} from "../src/types/SmartRoute/adapter";
import type { RouteProxy } from "../src/types/SmartRoute/proxies";
import type { BalancerViewer, TokenViewer, UniV2Viewer, UniV3Viewer } from "../src/types/Viewer";
import { ICurvePoolInfoViewer } from "../src/types/Viewer/intf";

export interface BscContext {
  config: BscConfig;
  signers: Signers;
  balancerAdapter: BalancerAdapter;
  curveAdapter: CurveAdapter | undefined;
  ellipsisAdapter: EllipsisAdapter | undefined;
  uniV2Adapter: UniV2Adapter;
  uniV3Adapter: UniV3Adapter;
  stableSwapNoRegistryAdapter: StableSwapNoRegistryAdapter;
  stableSwapAdapter: StableSwapAdapter | undefined;
  balancerViewer: BalancerViewer;
  curveViewers: ICurvePoolInfoViewer[];
  uniV2Viewer: UniV2Viewer;
  uniV3Viewers: UniV3Viewer[];
  tokenViewer: TokenViewer;
  routeProxy: RouteProxy;
  approveProxy: ApproveProxy;
  approve: Approve;
}

export interface PolygonContext {
  config: PolygonConfig;
  signers: Signers;
  balancerAdapter: BalancerAdapter;
  curveAdapter: CurveAdapter | undefined;
  uniV2Adapter: UniV2Adapter;
  trashUniV2Adapter: TrashUniV2Adapter;
  uniV3Adapter: UniV3Adapter;
  stableSwapNoRegistryAdapter: StableSwapNoRegistryAdapter;
  stableSwapAdapter: StableSwapAdapter | undefined;
  balancerViewer: BalancerViewer;
  curveViewers: ICurvePoolInfoViewer[];
  uniV2Viewer: UniV2Viewer;
  uniV3Viewers: UniV3Viewer[];
  tokenViewer: TokenViewer;
  routeProxy: RouteProxy;
  approveProxy: ApproveProxy;
  approve: Approve;
}

declare module "mocha" {
  export interface Context {
    bsc: BscContext;
    polygon: PolygonContext;
  }
}

export interface Signers {
  admin: SignerWithAddress;
}
