import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);

export default function Course({ course }) {
  const total = course.parts.reduce((sum, curr) => sum + curr.exercises, 0);

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
    </div>
  );
}
