// HINT: import { getMysqlConnection } from '../lib/mysql'

export type UnrankedResult = {
  bib: string
  name: string
  time: number
}

export type RankedResult = UnrankedResult & {
  rank: number
}

export interface IResultService {
  addResult(result: UnrankedResult): Promise<void>
  getRanked(): Promise<RankedResult[]>
}

const UNRANKED_RESULTS = Array.from(
  new Array(
    Math.round(Math.random() * 10) + 1
  )
    .keys()
).map<UnrankedResult>((_, index) => ({
  bib: `B${index + 100}`,
  name: `Person #${index}`,
  time: Math.round(Math.random() * 1000000),
}))

export default class ResultService implements IResultService {

  async addResult(result: UnrankedResult): Promise<void> {
    UNRANKED_RESULTS.push(result)
  }

  async getRanked(): Promise<RankedResult[]> {
    const ranked = [...UNRANKED_RESULTS];

    ranked.sort((a, b) => a.time < b.time
      ? -1
      : a.time > b.time
        ? 1
        : 0
    );

    return ranked.map<RankedResult>((x, i) => ({
      ...x,
      rank: i + 1
    }));
  }

}