import React from "react";

const Skeleton = () => {
	return (
		<>
			<div className="flex justify-between items-center bg-slate-600/70 mb-3 animate-pulse h-8" />
			{[1, 2, 3, 4].map((item) => (
				<div
					key={item}
					className="flex flex-col gap-2 animate-pulse 
								border border-[#efefef]/40 rounded-md p-3 my-2 
								items-stretch justify-center w-full "
				>
					<div className="flex justify-between items-center bg-slate-400 animate-pulse h-14" />
					<div className="flex justify-between items-center bg-slate-400 animate-pulse h-14" />
				</div>
			))}
		</>
	);
};

export default Skeleton;
