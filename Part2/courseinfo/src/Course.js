import React from 'react';

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
}

const Total = ({ course }) => {
    const init = 0
    const sumArr = course.parts.map(part => part.exercises)
    const sum = sumArr.reduce((prev, curr) => prev + curr, init)
    return(
      <p><b>Number of exercises {sum}</b></p>
    ) 
}

const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>    
    )
}

const Content = ({ course }) => {
    return (
      <div>
          {course.parts.map(part =>
            <Part key={part.id} part={part}/>
          )}
          <Total course={course}/>
      </div>
    )
}

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
      </div>
    )
}

export default Course;