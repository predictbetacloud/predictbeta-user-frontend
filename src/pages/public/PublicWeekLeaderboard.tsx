import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { VscFilter } from "react-icons/vsc";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import Table from "../../components/Table";

import { getAllSeasonsAPI, getAllWeeksAPI } from "../../api/fixturesAPI";
import { getPublicWeekLeaderboardAPI } from "../../api/leaderboardAPI";
import CustomListBox from "../../components/inputs/CustomListBox";
import { InputPlaceholder } from "../../components/inputs/Input";
import PublicFooter from "../../components/layout/PublicFooter";
import PublicHeader from "../../components/layout/PublicHeader";
import TabNav from "../../components/layout/TabNav";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
  selectAllSeasons,
  selectAllWeeks,
  selectIsFetchingAllSeasons,
  selectIsFetchingAllWeeks,
} from "../../state/slices/fixtures";
import {
  selectIsFetchingWeekLeaderboard,
  selectLeaderboard,
} from "../../state/slices/leaderboard";
import { UserPosition } from "../../types/types";

const PublicWeekLeaderboard = () => {
  const dispatch = useAppDispatch();

  const [, setSearchParams] = useSearchParams();
  const l = useLocation();

  const queries = queryString.parse(l.search);
  const query_week = queries?.week;
  const query_season = queries?.season;
  const page = queries?.page;

  const leaderboard = useAppSelector(selectLeaderboard);
  const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons);
  const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks);
  const isFetchingWeekLeaderboard = useAppSelector(
    selectIsFetchingWeekLeaderboard
  );

  const allWeeks = useAppSelector(selectAllWeeks);
  const seasons = useAppSelector(selectAllSeasons);

  const [selectedWeek, setSelectedWeek] = useState<{
    id: string;
    number: string;
  } | null>(null);

  // Get all Season
  useEffect(() => {
    dispatch(getAllSeasonsAPI({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Make latest week the active week
  useEffect(() => {
    if (allWeeks?.[0]?.id) {
      // if week is in query use that week
      if (query_week) {
        const activeWeek = allWeeks.find(
          (_week) => _week.number === Number(query_week)
        );

        if (activeWeek) {
          setSelectedWeek({
            id: String(activeWeek?.id),
            number: String(activeWeek?.number),
          });
        }
      } else {
        setSearchParams({
          season: query_season
            ? String(query_season)
            : String(seasons?.[0]?.name),
          week: String(allWeeks?.[0]?.number),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWeeks, query_week]);

  useEffect(() => {
    if (query_season) {
      const activeSeason = seasons.find(
        (_season) => _season.name === query_season
      );
      if (activeSeason?.id && selectedWeek?.id) {
        dispatch(
          getPublicWeekLeaderboardAPI({
            weekId: selectedWeek?.id,
            params: {
              limit: 10,
              page,
            },
          })
        );
      }
    } else if (seasons?.[0]?.id && selectedWeek?.id) {
      dispatch(
        getPublicWeekLeaderboardAPI({
          weekId: selectedWeek?.id,
          params: {
            limit: 10,
            page,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeek, page]);

  // Make latest season the active season
  useEffect(() => {
    if (query_season) {
      const activeSeason = seasons.find(
        (_season) => _season.name === query_season
      );

      if (activeSeason?.id) {
        dispatch(getAllWeeksAPI({ seasonId: activeSeason?.id }));
      }
    } else {
      if (seasons?.[0]?.id) {
        dispatch(getAllWeeksAPI({ seasonId: seasons?.[0]?.id }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasons, query_season]);

  // useEffect(() => {
  // 	if (!page) {
  // 		setSearchParams({
  // 			page: String(1),
  // 		});
  // 	}
  // });

  const columns = useMemo<ColumnDef<UserPosition>[]>(
    () => [
      {
        header: "POSITION",
        accessorKey: "position",
        cell: (info) => {
          return (
            <Link
              className="block"
              to={`/dashboard/user-prediction-history/${info.row.original.username}?season=${query_season}&week=${query_week}`}
            >
              {String(info.getValue())}
            </Link>
          );
        },
        sortingFn: "alphanumeric",
        enableSorting: true,
      },
      {
        header: "PLAYER NAME",
        accessorKey: "username",
        cell: (info) => {
          const username = String(info.getValue());
          return (
            <Link
              className="block"
              to={`/dashboard/user-prediction-history/${info.row.original.username}?season=${query_season}&week=${query_week}`}
            >
              <p className="capitalize">{username}</p>
            </Link>
          );
        },
      },
      {
        header: "POINTS",
        accessorKey: "points",
        cell: (info) => {
          return (
            <Link
              className="block"
              to={`/dashboard/user-prediction-history/${info.row.original.username}?season=${query_season}&week=${query_week}`}
            >
              {Number(info.getValue()).toLocaleString()}
            </Link>
          );
        },
      },
    ],
    [query_season, query_week]
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
          {isFetchingSeasons || !seasons ? (
            <InputPlaceholder>
              <AiOutlineLoading
                className="animate-spin"
                color="#5D65F6"
                size={16}
              />
            </InputPlaceholder>
          ) : (
            <CustomListBox
              options={seasons?.map((season) => ({
                name: season.name,
                value: String(season.name),
              }))}
              onChange={(value: string): void => {
                setSearchParams({
                  season: String(value),
                  week: "",
                  page: String(1),
                });
              }}
              defaultOption={String(query_season)}
              title={"Season"}
              icon={<VscFilter />}
            />
          )}

          {/* week select */}
          {isFetchingWeeks || !allWeeks ? (
            <InputPlaceholder>
              <AiOutlineLoading
                className="animate-spin"
                color="#5D65F6"
                size={16}
              />
            </InputPlaceholder>
          ) : (
            <CustomListBox
              options={allWeeks?.map((week) => ({
                name: `Week ${week.number}`,
                value: String(week.number),
              }))}
              onChange={(value: string): void => {
                setSearchParams({
                  season: String(query_season),
                  week: String(value),
                  page: String(1),
                });
              }}
              defaultOption={selectedWeek?.number}
              title={"Week"}
              icon={<VscFilter />}
            />
          )}
        </div>
      </section>

      <main className="px-4 md:px-40 mb-20">
        <section className="w-full p-4 md:p-8">
          <Table
            data={leaderboard?.result?.data ?? []}
            columns={columns}
            rows={10}
            loading={
              isFetchingSeasons || isFetchingWeeks || isFetchingWeekLeaderboard
            }
            totalPages={leaderboard?.result?.totalPages ?? 1}
            isLeaderboardTable
            current_page={Number(page ?? 1)}
            setCurrentPage={(page: number): void => {
              setSearchParams({
                season: String(query_season),
                week: String(query_week),
                page: String(page),
              });
            }}
            empty_message="No leaderboard"
            empty_sub_message="There is no leaderboard for this week"
          />
        </section>
      </main>

      <PublicFooter />
    </>
  );
};

export default PublicWeekLeaderboard;
