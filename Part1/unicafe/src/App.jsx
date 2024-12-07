import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick = {props.onclick}> {props.text} </button>
  )
}

const Display = (props) => {
  return(
    <div> {props.text} : {props.value}</div>
    )
    }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const newGoodCount = good + 1;
    setGood(newGoodCount);

  }

  const handleBadClick = () => {

    setBad(bad+1);
    // console.log(bad);
    
  }

  const handleNeutralClick = () => {
    const newNeutralCount = neutral + 1;
    setNeutral(newNeutralCount);
  }

  return (
    <>
      <h1>Please give feedback</h1>

      <Button onclick={handleGoodClick} text = "Good"/>
      <Button onclick={handleBadClick} text = "Bad"/>
      <Button onclick={handleNeutralClick} text = "Neutral"/>

      <h2>Statistics</h2>

      <Display text = 'good' value = {good} />
      <Display text = 'neutral' value = {neutral} />
      <Display text = 'bad' value={bad}/>

    </>
  )
}

export default App