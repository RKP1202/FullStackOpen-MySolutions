import { useState } from 'react';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'Just dont give up',
  ];

  const len = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(len).fill(0));

  const handleNextAnecdote = () => {
    let random = Math.floor(Math.random() * len);
    setSelected(random);
  };

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  let mostVoted = 0;
  let maxVotes = 0;
  for (let i = 0; i < len; i++) {
    if (votes[i] > maxVotes) {
      maxVotes = votes[i];
      mostVoted = i;
      }
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleNextAnecdote} text="Next Anecdote" />
      <h1>Anecdote with most votes!!!</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>Has {votes[mostVoted]} votes</p>
    </>
  );
};

export default App;
