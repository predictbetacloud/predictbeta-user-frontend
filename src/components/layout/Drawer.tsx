import { useState } from "react";

const Drawer = () => {
	const [showDrawer, setShowDrawer] = useState(false);

	const toggleDrawer = () => setShowDrawer(!showDrawer);

	return (
		<main className="md:hidden">
			<button
				type="button"
				className="bg-[#D82E2E]"
				onClick={toggleDrawer}
			></button>
		</main>
	);
};

export default Drawer;
