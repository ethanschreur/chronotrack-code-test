import resultsReducer, {
  updateResults,
  INITIAL_STATE,
} from "./resultsSlice"
import { RankedResult } from './types'

describe('results slice', () => {

  fit('should have the correct initial state', () => {
    expect(
      resultsReducer(undefined, { type: 'some/bogus/action' })
    ).toEqual(INITIAL_STATE)
  })

  it('should update state with new rankings', async () => {
    const result: RankedResult = {
      rank: 1,
      bib: `B${Math.round(Math.random() * 100)}`,
      name: `Thing ${Math.round(Math.random() * 10)}`,
      time: Math.round(Math.random() * 1000)
    }
    const actual = resultsReducer(
      undefined,
      updateResults(
        [result]
      )
    )
    expect(actual.data).toEqual(
      result
    )
  })
})
