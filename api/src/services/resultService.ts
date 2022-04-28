import { getMysqlConnection } from '../lib/mysql'

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

const db = getMysqlConnection();

// const UNRANKED_RESULTS = Array.from(
//   new Array(
//     Math.round(Math.random() * 10) + 1
//   )
//     .keys()
// ).map<UnrankedResult>((_, index) => ({
//   bib: `B${index + 100}`,
//   name: `Person #${index}`,
//   time: Math.round(Math.random() * 1000000),
// }))

export default class ResultService implements IResultService {

  async addResult(result: UnrankedResult): Promise<void> {
    await (await db).execute('INSERT INTO results (bib, name, time) VALUES (?, ?, ?)', [result.bib, result.name, result.time]);
  }

  async getRanked(): Promise<RankedResult[]> {
    const unranked: RankedResult[] = (await (await db).query('SELECT bib, name, time FROM results'))[0] as RankedResult[]

    unranked.sort((a, b) => a.time < b.time
      ? -1
      : a.time > b.time
        ? 1
        : 0
    );

    return unranked.map<RankedResult>((x, i) => ({
      ...x,
      rank: i + 1
    }));
    return [];
  }
}