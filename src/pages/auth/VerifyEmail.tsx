import queryString from "query-string";

import logo from "../../assets/logo/logo-light.svg";

import Button from "../../components/Buttons";

import { verifyEmailAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const VerifyEmail = () => {
	const dispatch = useAppDispatch();
	const l = useLocation();
	const navigate = useNavigate();

	const queries = queryString.parse(l.search);
	const oneTimeToken = queries?.token;

	const { isPerformingAuthAction } = useAppSelector(selectAuth);

	const verify = () => {
		dispatch(verifyEmailAPI({ oneTimeToken }));
	};

	useEffect(() => {
		verify();
	}, []);

	console.log(oneTimeToken);

	return (
		<main className="w-screen h-screen px-4 md:px-0 bg-[#FFFFFF] flex flex-col items-center justify-center">
			<img src={logo} alt="Predictbeta" />
			<section className="mt-10 md:min-w-[400px] md:w-1/3">
				<h3 className="text-xl text-[#222222] font-medium mb-4">
					Verifying your email
				</h3>
				<p className="text-[#222222] mb-8">
					Your email is being verified, you'll be taken to the log in page once
					it's done. If nothing happens after the loading stops, please click
					the button below.
				</p>

				<div className="mt-5">
					<Button
						// className="w-full"
						title="Log in"
						type="submit"
						onClick={() => navigate("/login")}
						loading={isPerformingAuthAction}
					/>
				</div>
			</section>
		</main>
	);
};

export default VerifyEmail;
