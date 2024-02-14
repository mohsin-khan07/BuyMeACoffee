import { ethers } from "ethers";

export const withdrawTips = async (provider, contractAddress, contractAbi) => {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  await contract.withdrawTips();
  console.log("All the tips withdrawn");
};
