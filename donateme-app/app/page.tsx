import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Toaster } from "react-hot-toast";

export default function Home() {
	return (
		<div className=" w-full max-h-screen flex flex-col justify-start mt-8 items-center">
			<h2
				className="mb-4 text-3xl font-bold bg-gradient-to-r
			from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent"
			>
				Donate me some
			</h2>
			<Hero />
			<Footer />
			<Toaster />
		</div>
	);
}
