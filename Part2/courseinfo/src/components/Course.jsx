const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  )
}


const Course = ({ course }) => {
  // console.log(course);

  const sum = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0)
  // console.log(sum);


  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />

    </>
  )
}

export default Course;