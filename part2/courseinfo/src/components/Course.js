import React from 'react';
import './../index.css';

const Course = ({course}) => {

    const total = (parts) =>  parts.map( part => part.exercises )
								.reduce( (sum, current) => sum + current, 0)

	return (
		<>
            <h3>{course.name}</h3>
            <Content parts = {course.parts} />
            <Total total = {total(course.parts)} />
        </>
	)
}

const Part = ({name, exercises}) => {
	return (
		<p>{name} {exercises}</p>
	)
}

const Content = ({parts}) => {

	const rows = () => parts.map( 
		(part, i) => 
			<Part key = {i} name = {part.name} exercises = {part.exercises} />
		)

	return (
		<>
			{rows()}
		</>
	)
}

const Total = ({total}) => {
	return (
		<strong>total of {total} exercises</strong>
	)
}

export default Course