import { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => setGood(good + 1);
  const setToNeutral = () => setNeutral(neutral + 1);
  const setToBad = () => setBad(bad + 1);

  return (
    <div className="container">
      <div className="feedback">
        <h2>give feedback</h2>
        <Button onClick={setToGood} text="good" />
        <Button onClick={setToNeutral} text="neutral" />
        <Button onClick={setToBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100 + ' %';

  return (
    <div className="statistics">
      <h2>Statistics</h2>
      {all === 0 ? (
        <div>no feedbacks given</div>
      ) : (
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </>
      )}
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default App;
