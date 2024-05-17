export const abi = [
	{
		type: "constructor",
		name: "",
		inputs: [],
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		name: "donateMe",
		inputs: [
			{
				type: "string",
				name: "message",
				indexed: false,
				internalType: "string",
			},
			{
				type: "address",
				name: "sender",
				indexed: true,
				internalType: "address",
			},
			{
				type: "uint256",
				name: "timestamp",
				indexed: false,
				internalType: "uint256",
			},
		],
		outputs: [],
		anonymous: false,
	},
	{
		type: "function",
		name: "allDonates",
		inputs: [
			{
				type: "uint256",
				name: "",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				type: "string",
				name: "message",
				internalType: "string",
			},
			{
				type: "address",
				name: "sender",
				internalType: "address",
			},
			{
				type: "uint256",
				name: "timestamp",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "donateMeSome",
		inputs: [
			{
				type: "string",
				name: "_message",
				internalType: "string",
			},
		],
		outputs: [],
		stateMutability: "payable",
	},
	{
		type: "function",
		name: "getDonate",
		inputs: [
			{
				type: "uint256",
				name: "_index",
				internalType: "uint256",
			},
		],
		outputs: [
			{
				type: "string",
				name: "",
				internalType: "string",
			},
			{
				type: "address",
				name: "",
				internalType: "address",
			},
			{
				type: "uint256",
				name: "",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		name: "getTotalDonates",
		inputs: [],
		outputs: [
			{
				type: "uint256",
				name: "",
				internalType: "uint256",
			},
		],
		stateMutability: "view",
	},
] as const;
