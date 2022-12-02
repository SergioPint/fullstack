import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const keys = Object.keys(votes);
  const mostVoted = keys.sort((a, b) => votes[b] - votes[a]);

  const [selected, setSelected] = useState(0);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleVote = () => {
    const newVote = (votes[selected] += 1);
    const copy = { ...votes };
    copy[selected] = newVote;

    setVotes(copy);
  };

  const handleClick = () => {
    const random = randomIntFromInterval(0, anecdotes.length - 1);
    setSelected(random);
  };

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>

        <button onClick={handleVote}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>

      <div>
        <h2>Anecdote with most votes</h2>
        <p>
          {votes[mostVoted[0]] !== 0 ? anecdotes[mostVoted[0]] : 'no votes yet'}
        </p>
      </div>
    </div>
  );
};

export default App;
