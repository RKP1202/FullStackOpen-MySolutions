const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

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


const Course = ({course}) => {
  console.log(course);
  
  return(
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App


// const Header = (props) => {
//   return (
//     <div>
//       <h1>{props.course}</h1>
//     </div>
//   )
// }

// const Part = (props) => {
//   return (
//     <p>{props.part.name} : {props.part.exercises}</p>
//   )
// }

// const Content = (props) => {
//   return (
//     <div>
//       {props.parts.map((part, index) => (
//         <Part key={index} part={part} />
//       ))}
//     </div>
//   )
// }

// const Total = (props) => {
//   const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
//   return (
//     <div>
//       <p>Number of exercises {total}</p>
//     </div>
//   )
// }

// const App = () => {
//   // const course = 'Half Stack application development'
//   // const parts = [
//   //   { name: 'Fundamentals of React', exercises: 10 },
//   //   { name: 'Using props to pass data', exercises: 7 },
//   //   { name: 'State of a component', exercises: 14 }
//   // ]

//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }


//   return (
//     <>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </>
//   )
// }

// export default App
