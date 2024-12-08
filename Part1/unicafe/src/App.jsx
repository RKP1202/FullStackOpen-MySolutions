import { useState } from 'react';
import './App.css';
// Button Component
const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};

// StatisticLine Component
const StatisticLine = ({ text, value }) => {
  return (
    // <div>
    //   {text}: {value}
    // </div>
    <>
      <tr>
        <td>
          {text}
        </td>
        <td>
          {value}
        </td>
      </tr>
    </>
  );
};

// Statistics Component
const Statistics = ({ good, neutral, bad, total, positivePercentage, average }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Positive Feedback" value={`${positivePercentage} %`} />
        <StatisticLine text="Average Score" value={average} />
      </table>
    </>
  );
};

// Main App Component
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const positivePercentage = total ? ((good / total) * 100).toFixed(2) : 0;
  const average = total ? ((good - bad) / total).toFixed(2) : 0;

  return (
    <>
      <h1>Please give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        positivePercentage={positivePercentage}
        average={average}
      />
    </>
  );
};

export default App;
