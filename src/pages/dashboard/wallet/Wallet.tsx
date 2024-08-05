import { useEffect, useMemo } from "react";
import * as dfn from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";

import Button from "../../../components/Buttons";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import Table from "../../../components/Table";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { statusEnum, WalletHistoryItem } from "../../../types/types";
import {
	selectIsFetchingWalletInfo,
	selectWalletHistory,
} from "../../../state/slices/wallet";
import { formatCurrency } from "../../../utils/utils";
import { getWalletHistoryAPI } from "../../../api/walletAPI";
import { selectAuth } from "../../../state/slices/auth";
import PillIndicator from "../../../components/PillIndicators";
import { useLocation, useSearchParams } from "react-router-dom";

const Wallet = () => {
	const dispatch = useAppDispatch();
	const [, setSearchParams] = useSearchParams();
	const l = useLocation();

	const queries = queryString.parse(l.search);
	const page = queries?.page;

	const walletHistory = useAppSelector(selectWalletHistory);
	const { user } = useAppSelector(selectAuth);
	const isFetchingWalletInfo = useAppSelector(selectIsFetchingWalletInfo);

	useEffect(() => {
		if (!page) {
			setSearchParams({
				page: String(1),
			});
		}
	});

	useEffect(() => {
		dispatch(
			getWalletHistoryAPI({
				userId: user?.id,
				params: {
					limit: 10,
					page,
				},
			})
		);
	}, [page]);

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
				{/* <Button
					title="Deposit"
					onClick={() => dispatch(setShowDepositModal(true))}
				/> */}
				<a href="https://www.hallabet.com" target="_blank"><Button.Blue title="Withdraw" /></a>
			</section>
			<section className="w-screen lg:w-full p-4 lg:p-8">
				<Table
					data={walletHistory?.items ? walletHistory?.items : []}
					columns={columns}
					rows={10}
					loading={isFetchingWalletInfo}
					totalPages={walletHistory?.meta?.totalPages ?? 1}
					current_page={Number(page ?? 1)}
					setCurrentPage={(page: number): void => {
						setSearchParams({
							page: String(page),
						});
					}}
				/>
			</section>
		</DashboardLayout>
	);
};

export default Wallet;
