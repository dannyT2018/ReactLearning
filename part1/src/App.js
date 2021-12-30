const Header = (props) => {
  console.log(props)
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
      <Part partNum={props.parts[0].name} exercise={props.parts[0].exercise} />
      <Part partNum={props.parts[1].name} exercise={props.parts[1].exercise} />
      <Part partNum={props.parts[2].name} exercise={props.parts[2].exercise} />
    </div>
  )
}
const Total = (props) => {
  let sum = 0;
  
  props.parts.forEach(element => {
    sum += element.exercise;
  });
  
  return (
    <div>
      <p>
        Number of exercises {sum}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name:"Half Stack application development",
    parts: [
      {
        name: 'Fundamentals of React',
        exercise: 10
      },
      {
        name: 'Using props to pass data',
        exercise: 7
      },
      {
      name: 'State of a component',
      exercise: 14
      }
    ]
  }

  return (
    <div>
      <Header course_name= {course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App