import { ethers } from "hardhat";

import { Chain, getChain } from "../../config";
import { logger } from "../logger";
import { testCommonViewerCurve, testCommonViewerFetchToken, testCommonViewerUniV2 } from "./viewers.common.behaviors";

export function testPolygonViewerFetchToken(): void {
  it("viewer-meta", async function () {
    if ((await getChain(ethers)) !== Chain.Polygon) {
      logger.log("testPolygonViewerFetchToken: skip test");
      return;
    }
    const config = this.polygon.config;
    await testCommonViewerFetchToken(config.tokens.wnative, this.polygon.tokenViewer);
  });
}

export function testPolygonViewerUniV2(): void {
  it("viewer-uni2", async function () {
    if ((await getChain(ethers)) !== Chain.Polygon) {
      logger.log("testPolygonViewerUniV2: skip test");
      return;
    }
    const config = this.polygon.config;
    await testCommonViewerUniV2(config.uni2Dexes, this.polygon.uniV2Viewer);
  });
}

export function testPolygonViewerCurve(): void {
  it("viewer-curve", async function () {
    if ((await getChain(ethers)) !== Chain.Polygon) {
      logger.log("testPolygonViewerCurve: skip test");
      return;
    }
    const config = this.polygon.config;
    await testCommonViewerCurve(this.polygon.curveViewers);
  });
}

export function testPolygonViewerBalancer(): void {
  it("viewer-balancer", async function () {
    if ((await getChain(ethers)) !== Chain.Polygon) {
      logger.log("testPolygonViewerBalancer: skip test");
      return;
    }
    const config = this.polygon.config;
    // test code ...
  });
}
