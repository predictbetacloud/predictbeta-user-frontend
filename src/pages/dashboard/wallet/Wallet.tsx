import { useEffect, useMemo, useState } from "react";
import * as dfn from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import Table from "../../../components/Table";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { statusEnum, WalletHistoryItem } from "../../../types/types";
import {
	selectIsFetchingWalletInfo,
	selectWalletHistory,
	setShowDepositModal,
} from "../../../state/slices/wallet";
import { formatCurrency } from "../../../utils/utils";
import { getWalletHistoryAPI } from "../../../api/walletAPI";
import { selectAuth } from "../../../state/slices/auth";
import PillIndicator from "../../../components/PillIndicators";

const Wallet = () => {
	const walletHistory = useAppSelector(selectWalletHistory);
	const { user } = useAppSelector(selectAuth);
	const isFetchingWalletInfo = useAppSelector(selectIsFetchingWalletInfo);
	const dispatch = useAppDispatch();

	const [page, setPage] = useState(1);

	// useMemo(
	// 	() =>
	// 		dispatch(
	// 			getWalletHistoryAPI({
	// 				userId: user?.id,
	// 			})
	// 		),
	// 	[]
	// );

	useEffect(() => {
		dispatch(
			getWalletHistoryAPI({
				userId: user?.id,
			})
		);
	}, []);

	const columns = useMemo<ColumnDef<WalletHistoryItem>[]>(
		() => [
			{
				header: "TYPE",
				accessorKey: "type",
				cell: (info) => {
					const value = info.getValue<keyof typeof statusEnum>();

					return (
						<PillIndicator
							className="px-5 py-1 capitalize"
							type={value}
							title={value}
						/>
					);
				},
			},
			{
				header: "AMOUNT",
				accessorKey: "amount",
				cell: (info) => formatCurrency(Number(info.getValue())),
			},
			{
				header: "REFERENCE",
				accessorKey: "reference",
				cell: (info) => info.getValue(),
			},
			{
				header: "DATE",
				accessorKey: "createdAt",
				cell: (info) => {
					// Assuming info.getValue() returns a date string or a Date object
					const dateValue = info.getValue<Date | string>();

					// If dateValue is a string, convert it to a Date object
					const date =
						typeof dateValue === "string" ? new Date(dateValue) : dateValue;

					// Check if date is a valid Date object
					if (date instanceof Date && !isNaN(date.getTime())) {
						return dfn.format(date, "MMM d, yyyy hh:mm aa");
					} else {
						return "Invalid Date";
					}
				},
			},
		],
		[]
	);

	return (
		<DashboardLayout title="Wallet">
			<section className="px-4 lg:px-8 py-4 flex items-center justify-end gap-x-4">
				<Button
					title="Deposit"
					onClick={() => dispatch(setShowDepositModal(true))}
				/>
				<Button.Blue title="Withdraw" />
			</section>
			<section className="w-screen lg:w-full p-4 lg:p-8">
				<Table
					data={walletHistory}
					columns={columns}
					rows={10}
					loading={isFetchingWalletInfo}
					totalPages={1}
					current_page={page}
					setCurrentPage={(page: number): void => {
						setPage(page);
						// throw new Error("Function not implemented.");
					}}
				/>
			</section>
		</DashboardLayout>
	);
};

export default Wallet;
