import { getContract } from "thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { abi } from "./contractABI";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

export const contract = getContract({
	client: client,
	chain: chain,
	address: contractAddress,
	abi: abi,
});
