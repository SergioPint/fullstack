const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, id) => (
        <p key={id}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  const calc = () => {
    let calcTotal = 0;
    for (let i = 0; i < parts.length; i++) {
      calcTotal += parts[i].exercises;
    }
    return calcTotal;
  };
  return <p>Number of exercises {calc()}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
