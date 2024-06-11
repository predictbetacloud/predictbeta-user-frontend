import DashboardLayout from "../../../components/layout/DashboardLayout";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { selectAuth } from "../../../state/slices/auth";
import TabNav from "../../../components/layout/TabNav";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs/Input";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import Button from "../../../components/Buttons";
import { useState } from "react";
import { newPasswordAPI, requestPasswordOTP } from "../../../api/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const EditPassword = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(selectAuth);
	const { isPerformingAuthAction, isRequestingOtp } =
		useAppSelector(selectAuth);

	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const requestOTP = () => {
		dispatch(requestPasswordOTP({ email: user?.email }));
	};

	const submit = ({ oneTimePassword, password }: FieldValues) => {
		dispatch(newPasswordAPI({ oneTimePassword, password }));
	};

	return (
		<DashboardLayout title="Account Setting - Password">
			<section className="predictbeta-header px-4 lg:px-8 pt-6 flex items-center">
				<TabNav
					tabs={[
						{ path: "/dashboard/account", title: "Edit/Update Profile" },
						{ path: "/dashboard/account/password", title: "Change Password" },
					]}
				/>
			</section>
			<main className="p-4 py-8 lg:p-8 grid md:grid-cols-11 gap-4">
				<form
					onSubmit={handleSubmit(submit)}
					className="col-span-12 lg:col-span-5"
				>
					<section className="bg-white rounded p-4 lg:p-8 shadow-md">
						<h3 className="text-xl text-[#222222] font-medium mb-4">
							Reset Password
						</h3>
						<p className="text-[#222222] mb-4 text-sm">
							Request an OTP to use in changing your password
						</p>

						<Button.Outline
							type="button"
							onClick={() => requestOTP()}
							loading={isRequestingOtp}
							title="Request OTP"
							className="mb-4 block"
						/>

						<hr className="mt-4" />

						{/* OTP */}
						<div className="mt-5">
							<label htmlFor="oneTimePassword" className="mb-2 block">
								<p className="text-[#222222] text-sm">OTP</p>
							</label>
							<Input
								id="oneTimePassword"
								type="text"
								placeholder="Enter OTP"
								{...register("oneTimePassword", {
									required: "Enter the OTP sent to you",
								})}
								className={`w-full input ${
									errors?.oneTimePassword ? "invalid" : ""
								}`}
							/>
							{errors?.oneTimePassword && (
								<ErrorMessage
									message={errors.oneTimePassword.message?.toString()}
								/>
							)}
						</div>

						{/* Passowrd */}
						<div className="mt-5">
							<label htmlFor="password" className="mb-2 block">
								<p className="text-[#222222] text-sm">New Password</p>
							</label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									placeholder="Enter password here"
									{...register("password", {
										required: "Please enter password",
									})}
									className={`w-full input ${
										errors?.password ? "invalid" : ""
									}`}
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
						<Button
							type="submit"
							title="Update Password"
							className="mt-4"
							loading={isPerformingAuthAction}
						/>
					</section>
				</form>
			</main>
		</DashboardLayout>
	);
};

export default EditPassword;
