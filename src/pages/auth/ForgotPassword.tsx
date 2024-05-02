import { FieldValues, useForm } from "react-hook-form";

import logo from "../../assets/logo/logo-light.svg";

import ErrorMessage from "../../components/inputs/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/inputs/Input";
import Button from "../../components/Buttons";

import { forgotPasswordAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const dispatch = useAppDispatch();
	const { isPerformingAuthAction } = useAppSelector(selectAuth);

	// Form Handler
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Form Submission Handler
	const submit = ({ email }: FieldValues) => {
		dispatch(forgotPasswordAPI({ email }));
	};

	return (
		<main className="w-screen h-screen px-4 md:px-0 bg-[#FFFFFF] flex flex-col items-center justify-center">
			<img src={logo} alt="Predictbeta" />
			<form
				onSubmit={handleSubmit(submit)}
				className="mt-10 md:min-w-[400px] md:w-1/3"
			>
				<h3 className="text-xl text-[#222222] font-medium mb-4">
					Forgot your password?
				</h3>
				<p className="text-[#222222] mb-8">
					Enter your registered email address and we’ll send you a link to reset
					your password.
				</p>

				{/* Email */}
				<div className="mt-5">
					<label htmlFor="email" className="mb-2 block">
						<P className="text-[#222222] text-sm">Email address</P>
					</label>
					<Input
						id="email"
						type="email"
						placeholder="Enter email"
						{...register("email", {
							required: "Enter a valid email",
						})}
						className={`w-full input ${errors?.email ? "invalid" : ""}`}
					/>
					{errors?.email && (
						<ErrorMessage message={errors.email.message?.toString()} />
					)}
				</div>

				<div className="mt-5">
					<Button
						className="w-full"
						title="Request password reset"
						type="submit"
						loading={isPerformingAuthAction}
					/>
				</div>

				<p className="mt-4 md:text-center text-xs">
					Remember your password{" "}
					<Link to="/login" className="">
						<span className="text-[#EB1536]">Log in</span>
					</Link>
				</p>
			</form>
		</main>
	);
};

export default ForgotPassword;
