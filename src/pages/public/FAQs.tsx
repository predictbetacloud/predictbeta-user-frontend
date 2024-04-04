import FAQ from "../../components/FAQ";
import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";
import faqs from "../../utils/faqs";

const FaqPage = () => {
	return (
		<>
			<PublicHeader />
			<main>
				{/* Banner */}
				<section className="py-20 px-4 bg-[#051B30] text-center mb-16">
					<h1 className="text-white font-semibold text-4xl mb-4">
						Frequently Asked Questions
					</h1>
					<p className="text-[#E1E7EC] max-w-[600px] mx-auto">
						Got a question? we got an answer for you.
					</p>
				</section>
				<section className="px-4 md:px-40 mb-20 flex flex-col items-center gap-y-4">
					{faqs.map((faq, idx) => (
						<FAQ key={idx} title={faq.title} content={faq.content} />
					))}
				</section>
			</main>
			<PublicFooter />
		</>
	);
};

export default FaqPage;
