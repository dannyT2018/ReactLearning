const Header = (props) => {
  return (
    <div>
      {props.course_name}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.partNum} {props.exercise}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partNum='Fundamentals of React' exercise={10} />
      <Part partNum='Using props to pass data' exercise={7} />
      <Part partNum='State of a component' exercise={14} />
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  )
}

const App = () => {
  const course = "Half Stack application development"
  const part1 = 'Fundamentals of React'
  const exercise1 = 10
  const part2 = 'Using props to pass data'
  const exercise2 = 7
  const part3 = 'State of a component'
  const exercise3 = 14

  return (
    <div>
      <Header course_name= {course} />
      <Content partNum={part1, part2, part3} exercise={exercise1, exercise2, exercise3}/>
      <Total total={exercise1 + exercise2 + exercise3}/>
    </div>
  )
}

export default App