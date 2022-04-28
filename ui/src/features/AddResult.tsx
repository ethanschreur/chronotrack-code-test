import React from "react"
import { useAppDispatch } from "../app/hooks"
import { toMillis } from "../time"
import { updateResults } from "./resultsSlice"
import resultsApi from "./resultsApi";

const AddResult = () => {
  const dispatch = useAppDispatch()

  const [bib, setBib] = React.useState('')
  const [name, setName] = React.useState('')
  const [time, setTime] = React.useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (bib && name && time) {
      const millis = toMillis(time)
      if (!isNaN(millis)) {
        const newResults = await resultsApi.addResult({ bib, name, time: millis });
        dispatch(
          updateResults(newResults)
        )
      }
    }
  }

  return (
    <form action='#'
      onSubmit={handleSubmit}
    >
      <input type='text'
        data-testid='bib'
        onChange={e => setBib(e.target.value)}
        placeholder='Bib'
      />
      <input type='text'
        data-testid='name'
        onChange={e => setName(e.target.value)}
        placeholder='John Doe'
      />
      <input type='text'
        data-testid='time'
        onChange={e => setTime(e.target.value)}
        placeholder='hh:mm:ss'
      />
      <input type='submit'
        data-testid='addResult'
        value='Add Result'
      />
    </form>
  )
}


export default AddResult;