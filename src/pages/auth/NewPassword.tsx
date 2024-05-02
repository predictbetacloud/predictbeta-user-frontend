import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import logo from "../../assets/logo/logo-light.svg";

import ErrorMessage from "../../components/inputs/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/inputs/Input";
import Button from "../../components/Buttons";

import { loginAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import { Link } from "react-router-dom";

const NewPassword = () => {
	const dispatch = useAppDispatch();
	const { isPerformingAuthAction } = useAppSelector(selectAuth);

	const [showPassword, setShowPassword] = useState(false);

	// Form Handler
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Form Submission Handler
	const submit = ({ oneTimeToken, password }: FieldValues) => {
		dispatch(loginAPI({ oneTimeToken, password }));
	};

	return (
		<main className="w-screen h-screen px-4 md:px-0 bg-[#FFFFFF] flex flex-col items-center justify-center">
			<img src={logo} alt="Predictbeta" />
			<form onSubmit={handleSubmit(submit)} className="mt-10 md:min-w-[400px]">
				<h3 className="text-xl text-[#222222] font-medium mb-1">
					New password
				</h3>
				<p className="text-[#222222] mb-8">
					Set a password you can easily remember.
				</p>

				{/* Email */}
				<div className="mt-5">
					<label htmlFor="oneTimeToken" className="mb-2 block">
						<P className="text-[#222222] text-sm">OTP</P>
					</label>
					<Input
						id="oneTimeToken"
						type="text"
						placeholder="Enter OTP"
						{...register("oneTimeToken", {
							required: "Enter the OTP sent to you",
						})}
						className={`w-full input ${errors?.oneTimeToken ? "invalid" : ""}`}
					/>
					{errors?.oneTimeToken && (
						<ErrorMessage message={errors.oneTimeToken.message?.toString()} />
					)}
				</div>

				{/* Passowrd */}
				<div className="mt-5">
					<label htmlFor="password" className="mb-2 block">
						<P className="text-[#222222] text-sm">New Password</P>
					</label>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter password here"
							{...register("password", {
								required: "Please enter password",
							})}
							className={`w-full input ${errors?.password ? "invalid" : ""}`}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3.5 flex items-center h-full top-0"
						>
							{!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
						</button>
					</div>
					{errors?.password && (
						<ErrorMessage message={errors.password.message?.toString()} />
					)}
				</div>

				<div className="mt-5">
					<Button
						className="w-full"
						title="Submit"
						type="submit"
						loading={isPerformingAuthAction}
					/>
				</div>

				<p className="mt-4 md:text-center text-xs">
					Remember your password?{" "}
					<Link to="/login" className="">
						<span className="text-[#EB1536]">Log in</span>
					</Link>
				</p>
			</form>
		</main>
	);
};

export default NewPassword;
