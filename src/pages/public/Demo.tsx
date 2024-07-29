import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../state/hooks'
import {
  selectAllSeasons,
  selectAllWeeks,
  selectIsFetchingAllSeasons,
  selectIsFetchingAllWeeks,
  selectIsFetchingMatches,
  selectMatches
} from '../../state/slices/fixtures'
import { colors } from '../../utils/colors'
import {
  getAllMatchesAPI,
  getAllSeasonsAPI,
  getAllWeeksAPI
} from '../../api/fixturesAPI'
import PageLoading from '../../components/loaders/PageLoading'
import PublicFooter from '../../components/layout/PublicFooter'
import { MatchCardMin } from '../../components/fixtures/MatchCardMin'

const DemoPage = () => {
  const dispatch = useAppDispatch()

  const isFetchingSeasons = useAppSelector(selectIsFetchingAllSeasons)
  const isFetchingWeeks = useAppSelector(selectIsFetchingAllWeeks)
  const isFetchingMatches = useAppSelector(selectIsFetchingMatches)

  const allWeeks = useAppSelector(selectAllWeeks)
  const allMatches = useAppSelector(selectMatches)
  const seasons = useAppSelector(selectAllSeasons)

  // Get all Season
  useEffect(() => {
    dispatch(getAllSeasonsAPI({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Make latest week the active week
  useEffect(() => {
    if (allWeeks?.[0]?.id) {
      // if week is in query use that week
      if (seasons?.[0]?.id && allWeeks?.[0]?.id) {
        dispatch(
          getAllMatchesAPI({
            seasonId: seasons?.[0]?.id,
            weekId: allWeeks?.[0]?.id
          })
        )
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWeeks])

  // Make latest season the active season
  useEffect(() => {
    if (seasons?.[0]?.id) {
      dispatch(getAllWeeksAPI({ seasonId: seasons?.[0]?.id }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasons])

  return (
    <main className='bg-white'>
      {/* Weekly Predictions Teaser */}
      <section
        className='px-4 md:px-10 lg:px-40 pt-16 lg:py-32 mb-10 lg:mb-0'
        style={{
          background: colors.peach
        }}
      >
        <h2
          className='text-center mb-10 lg:w-2/5 lg:mx-auto text-4xl font-semibold'
          color={colors.grey700}
        >
          Are you up to the task this week?
        </h2>
        <div className='p-4 lg:p-8 bg-white rounded-xl'>
          <p
            color={colors.grey700}
            className='pb-2 inline-block mb-6 text-[#2A2E33]'
            style={{
              borderBottom: `3px solid ${colors.accent}`
            }}
          >
            This Week’s Fixtures
          </p>
          {isFetchingMatches || isFetchingWeeks || isFetchingSeasons ? (
            <PageLoading />
          ) : (
            <>
              {allMatches?.length > 0 ? (
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {allMatches?.map((match, idx) => (
                    <div key={idx}>
                      <MatchCardMin
                        key={match.id}
                        home={match.homeTeam}
                        away={match.awayTeam}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex items-center justify-center py-20 lg:py-32 flex-col'>
                  <h3 className='font-bold text-3xl mb-2'>
                    There no matches for this week
                  </h3>
                  <p className=''>
                    Matches will show here once they are published.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <PublicFooter />

      {/* {showAdPopUp ? <AdPopUp /> : null} */}
    </main>
  )
}

export default DemoPage
