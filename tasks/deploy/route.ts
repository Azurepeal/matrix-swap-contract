import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { loadConfig } from "../../config";

task("deploy:Route").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const config = await loadConfig(ethers);
  const [signer] = await ethers.getSigners();

  const approve = await ethers
    .getContractFactory("Approve")
    .then(f => f.deploy())
    .then(c => c.deployed());
  console.log("Approve deployed to: ", approve.address);

  const approveProxy = await ethers
    .getContractFactory("ApproveProxy")
    .then(f => f.deploy(approve.address))
    .then(c => c.deployed());
  console.log("ApproveProxy deployed to: ", approveProxy.address);

  const routeProxy = await ethers
    .getContractFactory("RouteProxy")
    .then(f => f.deploy(approveProxy.address, config.FlashloanSwap, config.WETH))
    .then(c => c.deployed());
  console.log("RouteProxy deployed to: ", routeProxy.address);
  await approve.init(signer.address, approveProxy.address);
  await approveProxy.init(signer.address, [routeProxy.address]);
});
