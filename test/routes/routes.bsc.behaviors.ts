import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";

import { Chain, getChain } from "../../config";
import { BscConfig } from "../../config/bsc_config";
import { logger } from "../logger";
import {
  testCommonRouteEllipsisNativeToToken,
  testCommonRouteEllipsisTokenToNative,
  testCommonRouteEllipsisTokenToToken,
  testCommonRouteUniv2NativeToToken,
  testCommonRouteUniv2TokenToNative,
  testCommonRouteUniv2TokenToToken,
} from "./routes.common.behaviors";

/* ========================================================
 * new code
 * ======================================================== */
export function testBscRouteUniv2NativeToToken() {
  it("route-univ2-native-token", async function () {
    /**
     * adapter: univ2
     * fromToken: native
     * toToken: usdc
     */
    if ((await getChain(ethers)) !== Chain.Bsc) {
      logger.log("testBscRouteUniv2NativeToToken: skip test");
      return;
    }

    const signer = this.bsc.signers.admin;
    const routeProxy = this.bsc.routeProxy;
    const adapter = this.bsc.uniV2Adapter;
    const config = this.bsc.config;
    const fromTokenAddr = config.tokens.native;
    const toTokenAddr = config.tokens.usdc;
    const poolAddr = config.uni2Pools.poolWnativeUsdc;

    await testCommonRouteUniv2NativeToToken(signer, routeProxy, adapter, fromTokenAddr, toTokenAddr, poolAddr);
  });
}

export function testBscRouteUniv2TokenToNative() {
  it("route-univ2-token-native", async function () {
    /**
     * adapter: univ2
     * fromToken: usdc
     * toToken: native
     */
    if ((await getChain(ethers)) !== Chain.Bsc) {
      logger.log("testBscRouteUniv2TokenToNative: skip test");
      return;
    }

    const signer = this.bsc.signers.admin;
    const routeProxy = this.bsc.routeProxy;
    const approve = this.bsc.approve;
    const adapter = this.bsc.uniV2Adapter;
    const adapterForDeposit = this.bsc.uniV2Adapter;
    const config = this.bsc.config;
    const fromTokenAddr = config.tokens.usdc;
    const toTokenAddr = config.tokens.native;
    const poolAddr = config.uni2Pools.poolWnativeUsdc;
    const depositFromToken = async (signer: SignerWithAddress, amountIn: BigNumber) => {
      await config.depositUsdc(signer, amountIn, adapterForDeposit);
    };

    await testCommonRouteUniv2TokenToNative(
      signer,
      routeProxy,
      approve,
      adapter,
      fromTokenAddr,
      toTokenAddr,
      poolAddr,
      depositFromToken,
    );
  });
}

export function testBscRouteUniv2TokenToToken() {
  it("route-univ2-token-token", async function () {
    /**
     * adapter: univ2
     * fromToken: usdc
     * toToken: uset
     */
    if ((await getChain(ethers)) !== Chain.Bsc) {
      logger.log("testBscRouteUniv2TokenToToken: skip test");
      return;
    }

    const signer = this.bsc.signers.admin;
    const routeProxy = this.bsc.routeProxy;
    const approve = this.bsc.approve;
    const adapter = this.bsc.uniV2Adapter;
    const adapterForDeposit = this.bsc.uniV2Adapter;
    const config = this.bsc.config;
    const fromTokenAddr = config.tokens.usdc;
    const toTokenAddr = config.tokens.usdt;
    const poolAddr = config.uni2Pools.poolUsdcUsdt;
    const depositFromToken = async (signer: SignerWithAddress, amountIn: BigNumber) => {
      await config.depositUsdc(signer, amountIn, adapterForDeposit);
    };

    await testCommonRouteUniv2TokenToToken(
      signer,
      routeProxy,
      approve,
      adapter,
      fromTokenAddr,
      toTokenAddr,
      poolAddr,
      depositFromToken,
    );
  });
}

export function testBscRouteEllipsisNativeToToken() {
  it("route-ellipsis-native-token", async function () {
    /**
     * adapter: ellipsis
     * fromToken: native
     * toToken: bnbx
     */
    if ((await getChain(ethers)) !== Chain.Bsc) {
      logger.log("testBscRouteEllipsisNativeToToken: skip test");
      return;
    }
    if (!this.bsc.ellipsisAdapter) {
      logger.log("testBscRouteEllipsisNativeToToken: no ellipsis adapter");
      return;
    }

    const signer = this.bsc.signers.admin;
    const routeProxy = this.bsc.routeProxy;
    // const approve = this.bsc.approve;
    const adapter = this.bsc.ellipsisAdapter;
    // const adapterForDeposit = this.bsc.uniV2Adapter;
    const config = this.bsc.config;
    const fromTokenAddr = config.tokens.native;
    const toTokenAddr = config.tokens.bnbx;
    const poolAddr = config.curvePools.poolNativeBnbx;
    // const depositFromToken = async (signer: SignerWithAddress, amountIn: BigNumber) => {
    //   await config.depositUsdc(signer, amountIn, adapterForDeposit);
    // };

    await testCommonRouteEllipsisNativeToToken(signer, routeProxy, adapter, fromTokenAddr, toTokenAddr, poolAddr);
  });
}

export function testBscRouteEllipsisTokenToNative() {
  it("route-ellipsis-token-native", async function () {
    /**
     * adapter: ellipsis
     * fromToken: bnbx
     * toToken: token
     */
    if ((await getChain(ethers)) !== Chain.Bsc) {
      logger.log("testBscRouteEllipsisTokenToNative: skip test");
      return;
    }
    if (!this.bsc.ellipsisAdapter) {
      logger.log("testBscRouteEllipsisTokenToNative: no ellipsis adapter");
      return;
    }

    const signer = this.bsc.signers.admin;
    const routeProxy = this.bsc.routeProxy;
    const approve = this.bsc.approve;
    const adapter = this.bsc.ellipsisAdapter;
    const adapterForDeposit = this.bsc.ellipsisAdapter;
    const config = this.bsc.config;
    const fromTokenAddr = config.tokens.bnbx;
    const toTokenAddr = config.tokens.native;
    const poolAddr = config.curvePools.poolNativeBnbx;
    const depositFromToken = async (signer: SignerWithAddress, amountIn: BigNumber) => {
      await config.depositBnbx(signer, amountIn, adapterForDeposit);
    };

    await testCommonRouteEllipsisTokenToNative(
      signer,
      routeProxy,
      approve,
      adapter,
      fromTokenAddr,
      toTokenAddr,
      poolAddr,
      depositFromToken,
    );
  });
}

export function testBscRouteEllipsisTokenToToken() {
  it("route-ellipsis-token-token", async function () {
    /**
     * adapter: ellipsis
     * fromToken: token(usdc)
     * toToken: token(usdt)
     */
    if ((await getChain(ethers)) !== Chain.Bsc) {
      logger.log("testBscRouteEllipsisTokenToToken: skip test");
      return;
    }
    if (!this.bsc.ellipsisAdapter) {
      logger.log("testBscRouteEllipsisTokenToToken: no ellipsis adapter");
      return;
    }

    const signer = this.bsc.signers.admin;
    const routeProxy = this.bsc.routeProxy;
    const approve = this.bsc.approve;
    const adapter = this.bsc.ellipsisAdapter;
    const adapterForDeposit = this.bsc.uniV2Adapter;
    const config = this.bsc.config;
    const fromTokenAddr = config.tokens.usdc;
    const toTokenAddr = config.tokens.usdt;
    const poolAddr = config.curvePools.poolUsdcUsdt;
    const depositFromToken = async (signer: SignerWithAddress, amountIn: BigNumber) => {
      await config.depositUsdc(signer, amountIn, adapterForDeposit);
    };

    await testCommonRouteEllipsisTokenToToken(
      signer,
      routeProxy,
      approve,
      adapter,
      fromTokenAddr,
      toTokenAddr,
      poolAddr,
      depositFromToken,
    );
  });
}
