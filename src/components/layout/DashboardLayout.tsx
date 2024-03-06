import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = { children: ReactNode; title?: string };

const DashboardLayout = ({ children, title }: Props) => {
	return (
		<section>
			<Header title={title} />
			<main className="flex w-screen">
				<Sidebar />
				<section className="flex-grow">{children}</section>
			</main>
		</section>
	);
};

export default DashboardLayout;
