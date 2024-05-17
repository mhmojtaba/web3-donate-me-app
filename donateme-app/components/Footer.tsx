import React from "react";

const Footer = () => {
	return (
		<footer
			className="w-full h-fit fixed bottom-0 mt-4 mx-auto
          text-white text-center border-t border-[#efefef]/60
           backdrop-blur-md"
		>
			<div className="w-full md:max-w-screen-2xl flex items-center justify-center">
				<div className=" w-full md:w-[45%] py-5 flex justify-between items-center px-4 md:px-8">
					<p className="text-gray-400 text-sm">&copy; all rights reserved!</p>
					<p className="text-gray-400 text-sm">Mojtaba</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
