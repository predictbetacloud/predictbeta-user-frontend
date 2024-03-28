import DashboardLayout from "../../../components/layout/DashboardLayout";

import { useAppSelector } from "../../../state/hooks";
import { selectAuth } from "../../../state/slices/auth";
import TabNav from "../../../components/layout/TabNav";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs/Input";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import Button from "../../../components/Buttons";

const EditPassword = () => {
	const { user } = useAppSelector(selectAuth);
	// const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const submit = async (data: FieldValues) => {
		const email = user?.email;
		console.log({ ...data, email });
		// try {
		// 	dispatch(createTeamAPI({ name, shortName, clubLogo: logo?.[0] }));
		// } catch (error) {
		// 	toastError("An error occured! Please try again");
		// }
	};

	const newPassword = watch("newPassword");

	return (
		<DashboardLayout title="Account Setting - Password">
			<section className="predictbeta-header px-8 py-4 flex items-center">
				<TabNav
					tabs={[
						{ path: "/dashboard/account", title: "Edit/Update Profile" },
						{ path: "/dashboard/account/password", title: "Change Password" },
					]}
				/>
			</section>
			<main className="p-8 grid md:grid-cols-11 gap-4">
				<form
					onSubmit={handleSubmit(submit)}
					className="col-span-12 lg:col-span-5"
				>
					<section className="bg-white rounded p-8 shadow-md">
						{/* Current Password */}
						<div className="">
							<label htmlFor="currentPassword" className="mb-2 block">
								<p className="text-[#222222] text-sm">Current Password</p>
							</label>
							<Input
								id="currentPassword"
								type="text"
								placeholder="Enter first name"
								{...register("currentPassword", {
									required: "Please enter your current password",
								})}
								className={`w-full input ${
									errors?.currentPassword ? "invalid" : ""
								}`}
							/>
							{errors?.currentPassword && (
								<ErrorMessage
									message={errors.currentPassword.message?.toString()}
								/>
							)}
						</div>

						{/* New Password */}
						<div className="mt-4">
							<label htmlFor="newPassword" className="mb-2 block">
								<p className="text-[#222222] text-sm">New Password</p>
							</label>
							<Input
								id="newPassword"
								type="text"
								placeholder="Enter first name"
								{...register("newPassword", {
									required: "Enter new password",
									minLength: {
										value: 8,
										message: "Password should be at least 8 characters long",
									},
								})}
								className={`w-full input ${
									errors?.newPassword ? "invalid" : ""
								}`}
							/>
							{errors?.newPassword && (
								<ErrorMessage
									message={errors.newPassword.message?.toString()}
								/>
							)}
						</div>

						{/* Confirm Password */}
						<div className="mt-4">
							<label htmlFor="confirmPassword" className="mb-2 block">
								<p className="text-[#222222] text-sm">Confirm Password</p>
							</label>
							<Input
								id="confirmPassword"
								type="text"
								placeholder="Enter first name"
								{...register("confirmPassword", {
									required: "Please confirm your password",
									validate: (value) =>
										value === newPassword || "Your password doesn't match",
								})}
								className={`w-full input ${
									errors?.confirmPassword ? "invalid" : ""
								}`}
							/>
							{errors?.confirmPassword && (
								<ErrorMessage
									message={errors.confirmPassword.message?.toString()}
								/>
							)}
						</div>
					</section>

					<div className="flex items-center justify-end space-x-4 mt-8">
						<Button type="submit" title="Save" />
					</div>
				</form>
			</main>
		</DashboardLayout>
	);
};

export default EditPassword;
