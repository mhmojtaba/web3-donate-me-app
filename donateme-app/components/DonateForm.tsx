// biome-ignore lint/style/useImportType: <explanation>
import { SetStateAction } from "react";

interface props {
	tipAmount: number;
	setTipAmount: (value: SetStateAction<number>) => void;
	message: string;
	setMessage: (value: SetStateAction<string>) => void;
}

const DonateForm = ({
	tipAmount,
	setTipAmount,
	message,
	setMessage,
}: props) => {
	return (
		<>
			<div className=" w-full text-left">
				<label htmlFor="tip" className="text-3xl mb-1 block text-gray-200">
					Tip Amount:
				</label>
				<p className="text-[8px] text-[#888] mb-3">must be greater then 0</p>
				<input
					type="number"
					id="tip"
					min={0}
					value={tipAmount}
					onChange={(e) => setTipAmount(Number.parseFloat(e.target.value))}
					className="w-full border border-gray-400 rounded-2xl px-4 py-1 outline-none"
					step={0.001}
				/>
			</div>
			<div className=" w-full text-left">
				<label htmlFor="msg" className="text-xl mb-4 block text-white">
					Message:
				</label>

				<textarea
					id="msg"
					cols={10}
					rows={5}
					value={message}
					placeholder="leave your message here ...."
					onChange={(e) => setMessage(e.target.value)}
					className="w-full border border-gray-400 rounded-2xl 
									px-4 py-2 outline-none resize-none"
				/>
			</div>
		</>
	);
};

export default DonateForm;
