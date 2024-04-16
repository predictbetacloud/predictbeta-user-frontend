import DashboardLayout from "../../../components/layout/DashboardLayout";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import TabNav from "../../../components/layout/TabNav";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "../../../components/inputs/Input";
import ErrorMessage from "../../../components/inputs/ErrorMessage";
import Button from "../../../components/Buttons";
import { selectIsJoiningPrivateLeague } from "../../../state/slices/privateLeague";
import { joinPrivateLeagueAPI } from "../../../api/privateLeagueAPI";

const JoinPrivateLeague = () => {
	const isJoiningPrivateLeague = useAppSelector(selectIsJoiningPrivateLeague);
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const submit = async ({ code }: FieldValues) => {
		dispatch(
			joinPrivateLeagueAPI({
				code,
			})
		);
	};

	return (
		<DashboardLayout title="Private League - Join">
			<section className="predictbeta-header px-4 lg:px-8 pt-6 flex items-center">
				<TabNav
					tabs={[
						{
							path: "/dashboard/private-league/create",
							title: "Create new league",
						},
						{
							path: "/dashboard/private-league/join",
							title: "Join existing league",
						},
					]}
				/>
			</section>
			<main className="px-4 py-8 lg:px-8 grid md:grid-cols-11 gap-4">
				<form
					onSubmit={handleSubmit(submit)}
					className="col-span-12 lg:col-span-5 bg-white rounded-lg p-6 shadow-md"
				>
					{/* League code */}
					<div className="">
						<label htmlFor="code" className="mb-2 block">
							<p className="text-[#222222] text-sm">League code</p>
						</label>
						<Input
							id="code"
							type="text"
							placeholder="Enter league code"
							{...register("code", {
								required: "Please enter a valid league code",
							})}
							className={`w-full input ${errors?.code ? "invalid" : ""}`}
						/>
						{errors?.code && (
							<ErrorMessage message={errors.code.message?.toString()} />
						)}
					</div>

					<Button
						type="submit"
						title="Join league"
						className="mt-5 w-full"
						loading={isJoiningPrivateLeague}
					/>
				</form>
			</main>
		</DashboardLayout>
	);
};

export default JoinPrivateLeague;
