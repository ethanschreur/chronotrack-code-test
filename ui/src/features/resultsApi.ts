import { RankedResult, UnrankedResult } from "./types";
import axios from 'axios';

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

async function addResult(result: UnrankedResult) {
  await axios({ url: 'http://localhost:5000/results', method: 'POST', data: result })
  return getResults()
}

async function getResults() {
  const ranked: UnrankedResult[] = (await axios({ url: 'http://localhost:5000/results', method: 'GET' })).data;

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

const exportObj = { addResult, getResults }

export default exportObj