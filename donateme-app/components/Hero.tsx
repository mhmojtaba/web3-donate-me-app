"use client";
import { chain } from "@/utils/chain";
import { client } from "@/utils/client";
import { contract } from "@/utils/contract";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { prepareContractCall, readContract, toWei } from "thirdweb";
import {
	ConnectButton,
	ConnectEmbed,
	TransactionButton,
	useActiveAccount,
	useContractEvents,
	useReadContract,
} from "thirdweb/react";
import DonateForm from "./DonateForm";
import Skeleton from "./Skeleton";

interface TXSData {
	message: string;
	sender: string;
	timestamp: bigint;
}

const Hero: () => JSX.Element = () => {
	const [tipAmount, setTipAmount] = useState(0);
	const [message, setMessage] = useState("");
	const [txs, setTxs] = useState<TXSData[]>([]);
	const [loading, setLoading] = useState(false);

	const account = useActiveAccount();

	const {
		data: totalDonates,
		refetch: refetchTotalDonates,
		isLoading: isGettingTotal,
	} = useReadContract({
		contract: contract,
		method: "getTotalDonates",
	});

	const total: number = Number(totalDonates);
	console.log(total);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const getDonates = async () => {
			setLoading(true);
			if (totalDonates) {
				for (let index = 0; index < total; index++) {
					const donates = await readContract({
						contract: contract,
						method: "getDonate",
						params: [BigInt(index)],
					});

					setTxs((prev) => [
						...prev,
						{
							message: donates[0],
							sender: donates[1],
							timestamp: donates[2],
						},
					]);
				}
			}
			setLoading(false);
		};
		getDonates();
	}, [totalDonates]);

	const { data: allEvent, refetch: refetchEvent } = useContractEvents({
		contract: contract,
	});

	console.log(txs);
	console.log(loading);

	const truncateAddress = (address: string) => {
		return `${address.slice(0, 6)}......${address.slice(-4)}`;
	};

	const convertDate = (timestamp: bigint) => {
		return new Date(Number(timestamp) * 1000).toLocaleString();
	};
	// console.log(event);
	return (
		<>
			{account ? (
				<div className="w-96 md:w-1/2 md:max-w-screen-sm">
					<div className="p-4 w-full border border-[#434343]/90 rounded-xl text-center">
						<ConnectButton
							client={client}
							chain={chain}
							theme={"dark"}
							connectModal={{ size: "wide" }}
						/>
						<div className="mt-5 flex flex-col items-start w-full gap-5">
							<DonateForm
								message={message}
								setMessage={setMessage}
								tipAmount={tipAmount}
								setTipAmount={setTipAmount}
							/>
							<div className=" w-full ">
								<TransactionButton
									style={{
										width: "100%",
										backgroundColor: "royalBlue",
										color: "white",
									}}
									disabled={!account || tipAmount <= 0 || !message}
									transaction={() =>
										prepareContractCall({
											contract: contract,
											method: "donateMeSome",
											params: [message],
											value: BigInt(toWei(tipAmount.toString())),
										})
									}
									onTransactionConfirmed={() => {
										setTipAmount(0);
										toast.success("Donate me successfully. \n thank you bro!");
										setMessage("");
										refetchTotalDonates();
									}}
									onError={() => {
										toast.error("Donate failed");
									}}
								>
									Send Message
								</TransactionButton>
							</div>
						</div>
					</div>
					<div className="text-left w-full h-fit mb-20">
						<h3 className="text-2xl my-3 text-gray-100">
							{isGettingTotal ? (
								<p className="animate-pulse">Loading...</p>
							) : (
								<p>Total Donates : {totalDonates?.toString() || 0} </p>
							)}
						</h3>
						{loading ? (
							<Skeleton />
						) : (
							<>
								{txs && txs.length > 0 && (
									<p className=" text-lg text-gray-400">latest Donates:</p>
								)}
								{txs &&
									txs.length > 0 &&
									[...txs].reverse().map((e, index) => (
										<div
											className="flex flex-col gap-2 
								border border-[#efefef]/40 rounded-md p-3 my-2 
								items-stretch justify-center w-full "
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
										>
											<div className="flex justify-between items-center text-slate-300 ">
												<p>
													{/* @ts-ignore */}
													{truncateAddress(e?.sender)}
												</p>
												<p>
													{/* @ts-ignore */}
													{convertDate(e?.timestamp)}
												</p>
											</div>
											<div className="flex justify-between items-center text-white text-2xl">
												<p>
													{/* @ts-ignore */}
													{e?.message}
												</p>
											</div>
										</div>
									))}
							</>
						)}
					</div>
				</div>
			) : (
				<ConnectEmbed
					client={client}
					chain={chain}
					modalSize={"wide"}
					theme={"dark"}
				/>
			)}
		</>
	);
};

export default Hero;
