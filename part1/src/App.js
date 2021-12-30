import React, {useState} from 'react'

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
      {
        props.parts.map(element => {
          return <Part partNum={element.name} exercise={element.exercise} />
        })
      }
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

///////////////////////////////////////////////////////////
const Display = ({counter}) => <div>{counter}</div>

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const App1 = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>
      <Display counter={counter}/>
      <Button 
        onClick={decreaseByOne}
        text="Minus"
      />
      <Button 
        onClick={setToZero}
        text="Zero"
      />
      <Button 
        onClick={increaseByOne}
        text="Plus"
      />
    </div>
  )
}

export default App1