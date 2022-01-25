import React, {useState} from 'react'

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

//////////////////////////////////////////////////

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        The App is used by pressing the buttons!
      </div>
    )
  } 
  return (
    <div>
      Button Press History: {props.allClicks.join(' ')}
    </div>
  )
}

const Button1 = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App2 = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0, all:[]
  })
  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right,
      all: clicks.all.concat('L')
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = { 
      left: clicks.left,
      right: clicks.right + 1,
      all: clicks.all.concat('R')
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <Button1 handleClick={handleLeftClick} text='left'/>
      <Button1 handleClick={handleRightClick} text='right'/>
      {clicks.right}
      <History allClicks={clicks.all}/>
    </div>
  )
}

////////////////////////////////////////
const Display3 = props => <div>{props.value}</div>

const Button3 = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App3 = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  return (
    <div>
      <Display3 value={value} />
      <Button3 handleClick={() => setToValue(1000)} text="thousand" />
      <Button3 handleClick={() => setToValue(0)} text="reset" />
      <Button3 handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

////////////////////////////////////////

const Button4 = (props) => (
  <button onClick={props.handlerClick}>
    {props.text}
  </button>
) 

const StatisticLine = (props) =>{
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const reviewSum = props.review.bad + props.review.good + props.review.neutral

  const average = (positive, neutral, bad) => {
    const numbers = []
    for (var i = 0; i < positive; i++) {
      numbers.push(1);
    }
    for (var i = 0; i < neutral; i++) {
      numbers.push(0);
    }
    for (var i = 0; i < bad; i++) {
      numbers.push(-1);
    }
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = (sum / numbers.length) || 0;
    return avg
  }

  if (reviewSum === 0){
    return (
      <div>No Feedback Given</div>
      )
  }
  return(
    <div>
      <StatisticLine text="good" value ={props.review.good} />
      <StatisticLine text="neutral" value ={props.review.neutral} />
      <StatisticLine text="bad" value ={props.review.bad} />
      <StatisticLine text="all" value ={props.review.bad + props.review.good + props.review.neutral} />
      <StatisticLine text="average" value ={average(props.review.good, props.review.neutral, props.review.bad).toFixed(2)} />
      <StatisticLine text="positive" value ={(props.review.good/reviewSum * 100).toFixed(2) + " %"} />
    </div>
  )
}

const App4 = () => {
  // save clicks of each button to its own state

  const [review, setReview] = useState({
     good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () =>
  {
    const newReview = {
      good: review.good + 1,
      neutral: review.neutral,
      bad: review.bad
    }
    setReview(newReview)
  }

  const handleBadClick = () =>
  {
    const newReview = {
      good: review.good,
      neutral: review.neutral,
      bad: review.bad + 1
    }
    setReview(newReview)
  }

  const handleNeutralClick = () =>
  {
    const newReview = {
      good: review.good,
      neutral: review.neutral + 1,
      bad: review.bad
    }
    setReview(newReview)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button4 handlerClick={handleGoodClick} text='good'/>
      <Button4 handlerClick={handleNeutralClick} text='neutral'/>
      <Button4 handlerClick={handleBadClick} text='bad'/>
      <h1>Statistics</h1>
      <Statistics review={review}/>
    </div>
  )
}


const Button5 = (props) => (
  <button onClick={props.handlerClick}>
    {props.text}
  </button>
) 

const App5 = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  // const [ratings, setRatings] = useState(new Object);
  const [ratings, setRatings] = useState({
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
  });

  const regenerateAnecdotes = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const voteAncedotes = () => {
    if (ratings[selected]) {
      ratings[selected] += 1;
    } else{
      ratings[selected] = 1;
    }
  }
  const maxRating = Object.keys(ratings).reduce((a, b) => ratings[a] > ratings[b] ? a : b)

  return (
    <div>
      <h1>Ancedote of the day</h1>
      {anecdotes[selected]}
      <br/>
        Has {ratings[selected] ? ratings[selected] : 0} votes
      <br/>
      <Button5 handlerClick={voteAncedotes} text="vote"/>
      <Button5 handlerClick={regenerateAnecdotes} text='next ancedote'/>
      <h1>Ancedote with the most votes</h1>
        {anecdotes[maxRating]}
        <br/>
          Has {ratings[maxRating] ? ratings[maxRating] : 0} votes
    </div>
  )
}
export default App5
