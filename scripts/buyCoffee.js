const hre = require("hardhat");

const getBalance = async (addr) => {
  const balanceInBigInt = await hre.ethers.provider.getBalance(addr);
  return hre.ethers.formatEther(balanceInBigInt);
};

const printBalances = async (addresses) => {
  for (const address of addresses) {
    console.log(`Address ${address} balance:`, await getBalance(address));
  }
};

const printMemos = async (memos) => {
  for (const memo of memos) {
    console.log(
      `At ${memo.timestamp}, ${memo.name} ${memo.from} said: ${memo.message}`
    );
  }
};

async function main() {
  // get example accounts
  const [owner, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();

  // get the contract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");

  // deploy contract
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.waitForDeployment();
  console.log("== start ==");
  console.log(`Contract deployed to ${buyMeACoffee.target}`);

  // check balances before coffee purchase
  console.log(
    await printBalances([owner.address, tipper1.address, buyMeACoffee.target])
  );

  // buy the owner a coffee
  const tip = { value: hre.ethers.parseEther("1") };
  await buyMeACoffee.connect(tipper1).buyCoffee("Dolly", "Keep it bro!", tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Mummy", "Take care kid", tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("Dad", "Want more?", tip);

  // check balances after coffee purchase
  console.log("== coffee bought ==");
  console.log(
    await printBalances([owner.address, tipper1.address, buyMeACoffee.target])
  );

  // withdraw tips
  await buyMeACoffee.connect(owner).withdrawTips();

  // check balances after withdraw
  console.log("== withdraw tips ==");
  console.log(
    await printBalances([owner.address, tipper1.address, buyMeACoffee.target])
  );

  // read all the memos
  console.log("== memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
