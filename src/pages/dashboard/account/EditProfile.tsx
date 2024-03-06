import DashboardLayout from "../../../components/layout/DashboardLayout";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { selectIsFetchingWalletInfo } from "../../../state/slices/wallet";
import { selectAuth } from "../../../state/slices/auth";
import TabNav from "../../../components/layout/TabNav";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs/Input";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import CustomPhoneInput from "../../../components/inputs/CustomPhoneInput";
import Button from "../../../components/Buttons";

const EditProfile = () => {
	const { user } = useAppSelector(selectAuth);
	const isFetchingWalletInfo = useAppSelector(selectIsFetchingWalletInfo);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
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

	return (
		<DashboardLayout title="Account Setting - Profile">
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
						{/* First Name */}
						<div className="">
							<label htmlFor="firstName" className="mb-2 block">
								<p className="text-[#222222] text-sm">First Name</p>
							</label>
							<Input
								id="firstName"
								type="text"
								placeholder="Enter first name"
								{...register("firstName", {
									required: "First name is required",
								})}
								defaultValue={user?.firstName}
								className={`w-full input ${errors?.firstName ? "invalid" : ""}`}
							/>
							{errors?.firstName && (
								<ErrorMessage message={errors.firstName.message?.toString()} />
							)}
						</div>

						{/* Last Name */}
						<div className="mt-5">
							<label htmlFor="lastName" className="mb-2 block">
								<p className="text-[#222222] text-sm">Last Name</p>
							</label>
							<Input
								id="lastName"
								type="text"
								placeholder="Enter first name"
								{...register("lastName", {
									required: "Last name is required",
								})}
								defaultValue={user?.lastName}
								className={`w-full input ${errors?.lastName ? "invalid" : ""}`}
							/>
							{errors?.lastName && (
								<ErrorMessage message={errors.lastName.message?.toString()} />
							)}
						</div>

						{/* Email */}
						<div className="mt-5">
							<label htmlFor="email" className="mb-2 block">
								<p className="text-[#222222] text-sm">Email</p>
							</label>
							<Input
								id="email"
								type="text"
								placeholder="Enter first name"
								disabled
								defaultValue={user?.email}
								className={`w-full input ${errors?.email ? "invalid" : ""}`}
							/>
							{errors?.email && (
								<ErrorMessage message={errors.email.message?.toString()} />
							)}
						</div>

						{/* Phone Number */}
						<div className="mt-5">
							<label htmlFor="mobileNumber" className="mb-2 block">
								<p className="text-[#222222] text-sm">Phone number</p>
							</label>
							<Controller
								control={control}
								name="mobileNumber"
								rules={{
									required: "Please enter your phone number",
								}}
								defaultValue={user?.mobileNumber}
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
										errors?.mobileNumber &&
										errors?.mobileNumber.message?.toString()
									}
								/>
							)}
						</div>

						{/* Username */}
						<div className="mt-5">
							<label htmlFor="username" className="mb-2 block">
								<p className="text-[#222222] text-sm">Username</p>
							</label>
							<Input
								id="username"
								type="text"
								placeholder="Enter first name"
								{...register("username")}
								defaultValue={user?.username}
								className={`w-full input ${errors?.username ? "invalid" : ""}`}
							/>
							{errors?.username && (
								<ErrorMessage message={errors.username.message?.toString()} />
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

export default EditProfile;
