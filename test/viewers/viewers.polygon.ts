import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import { Chain, getChain } from "../../config";
import { polygonConfig } from "../../config/matic_config";
import { logger } from "../logger";
import type { PolygonContext, Signers } from "../types";
import {
  testPolygonViewerBalancer,
  testPolygonViewerCurve,
  testPolygonViewerFetchToken,
  testPolygonViewerUniV2,
} from "./viewers.polygon.behaviors";
import { fixturePolygonViewer } from "./viewers.polygon.fixtures";

describe("/* ---------------------------- viewer (polygon) ---------------------------- */", function () {
  before(async function () {
    const valid = (await getChain(ethers)) === Chain.Polygon;
    if (!valid) {
      logger.log("viewer (polygon) > before: skip polygon");
    }
    /* ----------------------------  ---------------------------- */
    const polygon = {} as PolygonContext;
    polygon.signers = {} as Signers;
    const signers: SignerWithAddress[] = await ethers.getSigners();
    polygon.signers.admin = signers[0];
    polygon.config = polygonConfig;

    /* ----------------------------  ---------------------------- */
    const { balancerViewer, curveViewers, uniV2Viewer, uniV3Viewers, tokenViewer } = await loadFixture(
      fixturePolygonViewer,
    );
    polygon.tokenViewer = tokenViewer;
    polygon.balancerViewer = balancerViewer;
    polygon.curveViewers = curveViewers;
    polygon.uniV2Viewer = uniV2Viewer;
    polygon.uniV3Viewers = uniV3Viewers;

    this.polygon = polygon;
  });

  testPolygonViewerFetchToken();
  testPolygonViewerUniV2();
  testPolygonViewerCurve();
  testPolygonViewerBalancer();
});
