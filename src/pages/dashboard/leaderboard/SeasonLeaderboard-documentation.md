

 # Documentation for File: SeasonLeaderboard.tsx

# SeasonLeaderboard Component

This React component represents a season leaderboard in the application. It fetches and displays the season leaderboard data to the user, and also allows them to filter the leaderboard by season.

## Import statements

```javascript
import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import queryString from "query-string";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import Table from "../../../components/Table";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { LeaderboardItem } from "../../../types/types";
import { getSeasonLeaderboardAPI, getWeekLeaderboardAPI } from "../../../api/leaderboardAPI";
import { selectAllSeasons, selectAllWeeks, selectIsFetchingAllSeasons, selectIsFetchingAllWeeks } from "../../../state/slices/fixtures";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAllSeasonsAPI, getAllWeeksAPI } from "../../../api/fixturesAPI";
import { selectIsFetchingSeasonLeaderboard, selectLeaderboard } from "../../../state/slices/leaderboard";
import { InputPlaceholder } from "../../../components/inputs/Input";
import { AiOutlineLoading } from "react-icons/ai";
import CustomListBox from "../../../components/inputs/CustomListBox";
import { VscFilter } from "react-icons/vsc";
import TabNav from "../../../components/layout/TabNav";
```


## Component Definition & Usage

```javascript
const SeasonLeaderboard = () => {
    // ... code omitted for brevity
};
export default SeasonLeaderboard;
```

Within the component:

- `dispatch` from `useAppDispatch()` is used for dispatching Redux actions.
- `useSearchParams` and `useLocation` are used to get and set the URL parameters.
- `useAppSelector` is used to access the Redux state.
- `useState` is used to maintain local state variables like `selectedSeason` and current `page`.
- `useMemo` is used to memoize values for efficient rendering.
- `useEffect` is used to create side-effects i.e., fetch data when dependencies specified in the second parameter have changed.

## Key Functions, Constants and Dependencies

### Season selection

User can select the season for which they want to view the leaderboard. The currently selected season is stored in the `selectedSeason` state variable. The available seasons are fetched from API in `getAllSeasonsAPI()`.

### Fetching the leaderboard

The season leaderboard is fetched using `getSeasonLeaderboardAPI()`. The function takes the `seasonId` as its parameter.

### Rendering the leaderboard

The leaderboard data is passed to a Table component to be displayed. Table columns are defined by the `columns` array.

## Styling

Styling is applied using `className`. Here `className` values are strings that refer to CSS classes.

## Props

This component does not take any custom props. All data is fetched inside the component using Redux and API Calls.