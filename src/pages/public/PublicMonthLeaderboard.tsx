import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import { VscFilter } from "react-icons/vsc";
import { useLocation, useSearchParams } from "react-router-dom";

import Table from "../../components/Table";

import { getMonthLeaderboardAPI } from "../../api/leaderboardAPI";
import CustomListBox from "../../components/inputs/CustomListBox";
import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";
import TabNav from "../../components/layout/TabNav";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  selectIsFetchingMonthLeaderboard,
  selectLeaderboard,
} from "../../state/slices/leaderboard";
import { UserPosition } from "../../types/types";
import { createYearRange, monthEnum } from "../../utils/utils";

const PublicMonthLeaderboard = () => {
  const dispatch = useAppDispatch();

  const [, setSearchParams] = useSearchParams();
  const l = useLocation();

  const queries = queryString.parse(l.search);
  const query_month = queries?.month;
  const query_year = queries?.year;
  const page = queries?.page;

  const leaderboard = useAppSelector(selectLeaderboard);
  const isFetchingMonthLeaderboard = useAppSelector(
    selectIsFetchingMonthLeaderboard
  );

  useEffect(() => {
    if (!query_month || !query_year) {
      setSearchParams({
        year: String(query_year ?? new Date().getFullYear()),
        month: String(query_month ?? new Date().getMonth() + 1),
      });
    }
  }, []);

  useEffect(() => {
    if (query_month && query_year) {
      dispatch(
        getMonthLeaderboardAPI({
          params: {
            month: query_month,
            year: query_year,
            limit: 10,
            page,
          },
        })
      );
    } else {
      dispatch(
        getMonthLeaderboardAPI({
          params: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            limit: 10,
            page,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query_month, page]);

  const columns = useMemo<ColumnDef<UserPosition>[]>(
    () => [
      {
        header: "POSITION",
        accessorKey: "position",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        enableSorting: true,
      },
      {
        header: "PLAYER NAME",
        accessorKey: "username",
        cell: (info) => {
          const username = String(info.getValue());
          return <p className="capitalize">{username}</p>;
        },
      },
      {
        header: "POINTS",
        accessorKey: "points",
        cell: (info) => Number(info.getValue()).toLocaleString(),
      },
    ],
    []
  );

  return (
    <>
      <PublicHeader />

      <section className="py-20 px-4 bg-[#051B30] text-center mb-0">
        <h1 className="text-white font-semibold text-4xl mb-4">Leaderboard</h1>
        {/* <p className="text-[#E1E7EC] max-w-[600px] mx-auto">
					Got a question? we got an answer for you.
				</p> */}
      </section>

      <section className="predictbeta-header bg-white w-full px-4 md:px-40 flex lg:items-end lg:justify-between flex-col-reverse lg:flex-row gap-4 lg:gap-0">
        <TabNav
          tabs={[
            { path: "/leaderboard", title: "Week" },
            { path: "/leaderboard/month", title: "Month" },
            { path: "/leaderboard/season", title: "Season" },
          ]}
        />
        {/* season select */}
        <div className="flex items-center gap-4 py-3">
          <CustomListBox
            options={createYearRange(new Date().getFullYear())?.map((year) => ({
              name: year.name,
              value: String(year.value),
            }))}
            onChange={(value: string): void => {
              setSearchParams({
                year: String(value),
                month: String(query_month ?? new Date().getMonth() + 1),
              });
            }}
            defaultOption={String(query_year ?? new Date().getFullYear())}
            title={"Year"}
            icon={<VscFilter />}
          />

          {/* month select */}
          <CustomListBox
            options={monthEnum?.map((month) => ({
              name: month.name,
              value: String(month.value),
            }))}
            onChange={(value: string): void => {
              setSearchParams({
                year: String(query_year ?? new Date().getFullYear()),
                month: String(value),
              });
            }}
            defaultOption={String(query_month || new Date().getMonth() + 1)}
            title={"Month"}
            icon={<VscFilter />}
          />
        </div>
      </section>
      <main className="px-4 md:px-40 mb-20">
        <section className="w-full p-4 md:p-8">
          <Table
            data={leaderboard?.result?.data ?? []}
            columns={columns}
            rows={10}
            loading={isFetchingMonthLeaderboard}
            totalPages={leaderboard?.result?.totalPages ?? 1}
            isLeaderboardTable
            current_page={Number(page ?? 1)}
            setCurrentPage={(page: number): void => {
              setSearchParams({
                year: String(query_year ?? new Date().getFullYear()),
                month: String(query_month ?? new Date().getMonth() + 1),
                page: String(page),
              });
            }}
            empty_message="No leaderboard"
            empty_sub_message="There is no leaderboard for this month"
          />
        </section>
      </main>

      <PublicFooter />
    </>
  );
};

export default PublicMonthLeaderboard;
