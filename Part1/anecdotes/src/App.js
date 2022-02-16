import React, { useState } from 'react'


const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Heading = ({text}) => {
  return(<h1>{text}</h1>)
}

const TopAnecdote = ({anecdotes, votes}) => {
  let mostVotes = 0;
  let mostIndex = 0;
  for (let i = 0; i < anecdotes.length; i++){
    if (votes[i] > mostVotes){
      mostVotes = votes[i]
      mostIndex = i
    }
  }
  return(
    <div>
      <p>{anecdotes[mostIndex]}</p>
      <p>has {votes[mostIndex]} votes</p>
    </div>
  )

}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [index, setIndex] = useState(0)
  const [votes, setVotes] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
  })

  const incrVote = ({index}) => {
    const newVotes = {...votes}
    newVotes[index] += 1
    setVotes(newVotes)
  }


  return (
    <div>
      <Heading text="Anecdote of the day"/>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
      <Button handleClick={() => setIndex(Math.floor(Math.random() * 7))} text="Next anecdote"/>
      <Button handleClick={() => incrVote({index})} text="Vote"/>
      <Heading text="Anecdote with most votes"/>
      <TopAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App;
