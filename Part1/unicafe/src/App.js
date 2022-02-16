import React, {useState} from 'react'


const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const StatisticLine = ({text, value}) => {
  if (text === "Positive"){
    return(
      <tr>
        <td>{text}</td>
        <td>{value}%</td> 
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}



const Statistics = ({values, ratings}) => {

  const all = values[0] + values[1] + values[2]
  const avg = ((values[0]) + (values[2] * -1)) / all
  const pos = (values[0] / all) * 100

  if ((values[0] === 0) && (values[1] === 0) && (values[2] === 0)) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={ratings[0]} value={values[0]}/>
          <StatisticLine text={ratings[1]} value={values[1]}/>
          <StatisticLine text={ratings[2]} value={values[2]}/>
          <StatisticLine text="All" value={all}/>
          <StatisticLine text="Average" value={avg}/>
          <StatisticLine text="Positive" value={pos}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  
  const ratings = ['Good', 'Neutral', 'Bad']
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={ratings[0]} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={ratings[1]} />
      <Button handleClick={() => setBad(bad + 1)} text={ratings[2]} />
      <Statistics ratings={ratings} values={[good, neutral, bad]}/>
    </div>
  );
}

export default App;
