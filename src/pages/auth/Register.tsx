import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

import logo from "../../assets/logo/logo-light.svg";

import ErrorMessage from "../../components/inputs/ErrorMessage";
import { P } from "../../components/Texts";
import { Input } from "../../components/inputs/Input";
import Button from "../../components/Buttons";

import { loginAPI, signUpAPI } from "../../api/authAPI";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectAuth } from "../../state/slices/auth";
import CustomPhoneInput from "../../components/inputs/CustomPhoneInput";

const Register = () => {
	const dispatch = useAppDispatch();
	const { isPerformingAuthAction } = useAppSelector(selectAuth);

	const [showPassword, setShowPassword] = useState(false);

	// Form Handler
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	// Form Submission Handler
	const submit = ({
		email,
		password,
		mobileNumber,
		firstName,
		lastName,
		userName,
	}: FieldValues) => {
		console.log(email, password);
		dispatch(
			signUpAPI({
				email,
				password,
				mobileNumber,
				firstName,
				// middleName: ,
				surname: lastName,
			})
		);
	};

	return (
		<main className="w-screen min-h-screen py-20 bg-[#FFFFFF] flex flex-col items-center justify-center">
			<img src={logo} alt="Predictbeta" />
			<form onSubmit={handleSubmit(submit)} className="mt-4 md:w-[400px]">
				<h3 className="text-xl text-[#222222] font-medium mb-2">
					Create an account to make predictions
				</h3>

				<div className="md:grid grid-cols-2 gap-4">
					{/* First name */}
					<div className="mt-5">
						<label htmlFor="firstName" className="mb-2 block">
							<P className="text-[#222222] text-sm">First name</P>
						</label>
						<Input
							id="firstName"
							type="text"
							placeholder="Your first name"
							{...register("firstName", {
								required: "Enter your first name",
							})}
							className={`w-full input ${errors?.firstName ? "invalid" : ""}`}
						/>
						{errors?.firstName && (
							<ErrorMessage message={errors.firstName.message?.toString()} />
						)}
					</div>

					{/* last name */}
					<div className="mt-5">
						<label htmlFor="lastName" className="mb-2 block">
							<P className="text-[#222222] text-sm">Last name</P>
						</label>
						<Input
							id="lastName"
							type="text"
							placeholder="Your last name"
							{...register("lastName", {
								required: "Enter your last name",
							})}
							className={`w-full input ${errors?.lastName ? "invalid" : ""}`}
						/>
						{errors?.lastName && (
							<ErrorMessage message={errors.lastName.message?.toString()} />
						)}
					</div>
				</div>

				{/* user name */}
				<div className="mt-5">
					<label htmlFor="userName" className="mb-2 block">
						<P className="text-[#222222] text-sm">User name</P>
					</label>
					<Input
						id="userName"
						type="text"
						placeholder="Your user name"
						{...register("userName", {
							required: "Enter your user name",
						})}
						className={`w-full input ${errors?.userName ? "invalid" : ""}`}
					/>
					{errors?.userName && (
						<ErrorMessage message={errors.userName.message?.toString()} />
					)}
				</div>

				{/* Email */}
				<div className="mt-5">
					<label htmlFor="email" className="mb-2 block">
						<P className="text-[#222222] text-sm">Email address</P>
					</label>
					<Input
						id="email"
						type="email"
						placeholder="Your email"
						{...register("email", {
							required: "Enter a valid email",
						})}
						className={`w-full input ${errors?.email ? "invalid" : ""}`}
					/>
					{errors?.email && (
						<ErrorMessage message={errors.email.message?.toString()} />
					)}
				</div>

				{/* Phone Number */}
				<div className="mt-5">
					<label htmlFor="mobileNumber" className="mb-2 block">
						<P className="text-[#222222] text-sm">Phone number</P>
					</label>
					<Controller
						control={control}
						name="mobileNumber"
						rules={{
							required: "Please enter your phone number",
						}}
						render={({ field: { onChange, value } }) => (
							<CustomPhoneInput
								onChange={onChange}
								value={value}
								defaultCountry="NG"
								placeholder="Your phone number"
								className={errors.mobileNumber ? "invalid" : ""}
							/>
						)}
					/>
					{errors?.mobileNumber && (
						<ErrorMessage
							message={
								errors?.mobileNumber && errors?.mobileNumber.message?.toString()
							}
						/>
					)}
				</div>

				{/* Passowrd */}
				<div className="mt-5">
					<label htmlFor="password" className="mb-2 block">
						<P className="text-[#222222] text-sm">Password</P>
					</label>
					<div className="relative">
						<Input
							id="password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter strong password"
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

				<p className="text-xs mt-4">
					By creating an account, you agree that you’re above 18 years of age
					and also to our{" "}
					<Link to="/terms" className="">
						<span className="text-[#EB1536]">Terms & Conditions</span>
					</Link>
				</p>

				<div className="mt-5">
					<Button
						className="w-full"
						title="Create account"
						type="submit"
						loading={isPerformingAuthAction}
					/>
				</div>

				<p className="mt-4 md:text-center text-xs">
					Have an account?{" "}
					<Link to="/login" className="">
						<span className="text-[#EB1536]">Log in</span>
					</Link>
				</p>
			</form>
		</main>
	);
};

export default Register;
