import { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.onclick}> {props.text} </button>
  );
};

const Display = (props) => {
  return (
    <div>
      {props.text}: {props.value}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const total = good + neutral + bad;
  const positivePercentage = total ? ((good / total) * 100).toFixed(2) : 0;
  const average = total ? ((good - bad) / total).toFixed(2) : 0;

  return (
    <>
      <h1>Please give feedback</h1>
      <Button onclick={handleGoodClick} text="Good" />
      <Button onclick={handleNeutralClick} text="Neutral" />
      <Button onclick={handleBadClick} text="Bad" />

      <h2>Statistics</h2>
      <Display text="Good" value={good} />
      <Display text="Neutral" value={neutral} />
      <Display text="Bad" value={bad} />
      <Display text="Total" value={total} />
      <Display text="Positive Feedback" value={`${positivePercentage} %`} />
      <Display text="Average Score" value={average} />
    </>
  );
};

export default App;
