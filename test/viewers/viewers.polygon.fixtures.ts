import { polygonConfig } from "../../config/matic_config";
import type { BalancerViewer, TokenViewer, UniV2Viewer, UniV3Viewer } from "../../src/types/Viewer";
import { ICurvePoolInfoViewer } from "../../src/types/Viewer/intf";
import { fixtureCommonViewer } from "./viewers.common.fixtures";

export async function fixturePolygonViewer(): Promise<{
  balancerViewer: BalancerViewer;
  curveViewers: Array<ICurvePoolInfoViewer>;
  uniV2Viewer: UniV2Viewer;
  uniV3Viewers: UniV3Viewer[];
  tokenViewer: TokenViewer;
}> {
  return await fixtureCommonViewer(polygonConfig.curveDexes, polygonConfig.uni2Dexes, polygonConfig.uni3Dexes);
}
