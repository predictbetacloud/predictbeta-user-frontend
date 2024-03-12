import Modal from "./Modal";
import { FieldValues, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	selectIsFundingWallet,
	selectShowDepositModal,
	setShowDepositModal,
} from "../../state/slices/wallet";
import { P } from "../Texts";
import { Input } from "../inputs/Input";
import ErrorMessage from "../inputs/ErrorMessage";
import Button from "../Buttons";
import { selectAuth } from "../../state/slices/auth";
import { fundWalletAPI, getWalletHistoryAPI } from "../../api/walletAPI";
import { AmountOption } from "../inputs/AmountOption";
import { InfoIcon } from "../../assets/icons";

const DepositFundModal = () => {
	const dispatch = useAppDispatch();

	const { user } = useAppSelector(selectAuth);
	const showDepositModal = useAppSelector(selectShowDepositModal);
	const isFundingWallet = useAppSelector(selectIsFundingWallet);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm();

	const Deposit = ({ amount }: FieldValues) => {
		dispatch(
			fundWalletAPI({
				amount,
				userId: user?.id,
			})
		);
	};

	const amountValue = watch("amount");

	const amountOptions = [500, 1000, 2000, 5000, 10000];

	return (
		<Modal
			closeModal={() => {
				dispatch(getWalletHistoryAPI({ userId: user?.id }));
				dispatch(setShowDepositModal(false));
				reset();
			}}
			content={
				<form onSubmit={handleSubmit(Deposit)}>
					<div className="flex bg-[#DDEFFF] text-[#212934] rounded mb-4 p-4 px-3 gap-2">
						<InfoIcon color="#0D7FE9" size={24} className="flex-shrink-0" />
						<p className="text-sm">
							Deposits will normally take a few minutes to arrive. You can
							always track the status of your deposits from the history.
						</p>
					</div>
					{/* Amount */}
					<div className="">
						<label htmlFor="amount" className="mb-2 block">
							<P className="text-[#222222] text-sm">Deposit Amount</P>
						</label>
						<Input
							id="amount"
							type="text"
							placeholder="Minimum NGN 500"
							{...register("amount", {
								required: "Please enter an amount",
							})}
							className={`w-full input ${errors?.amount ? "invalid" : ""}`}
						/>
						<div className="flex items-center max-w-full overflow-x-auto space-x-2 mt-3 pb-4">
							{amountOptions.map((option) => (
								<AmountOption
									currency="NGN"
									key={option}
									value={option}
									isSelected={option === amountValue}
									onClick={() => setValue("amount", option)}
								/>
							))}
						</div>
						{errors?.amount && (
							<ErrorMessage
								message={errors?.amount && errors?.amount.message?.toString()}
							/>
						)}
					</div>
					<Button
						className="w-full mt-6"
						type="submit"
						title="Continue"
						loading={isFundingWallet}
					/>
				</form>
			}
			isOpen={showDepositModal}
			title="Deposit funds"
		/>
	);
};

export default DepositFundModal;
