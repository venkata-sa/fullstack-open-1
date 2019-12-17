import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Course = ({course}) => {
	return (
		<h1>{course}</h1>
	)
}

const Part = ({name, exercises}) => {
	return (
		<p>{name} {exercises}</p>
	)
}

const Content = ({parts}) => {
	return (
		<>
			<Part name = {parts[0].name} exercises = {parts[0].exercises} />
			<Part name = {parts[1].name} exercises = {parts[1].exercises} />
			<Part name = {parts[2].name} exercises = {parts[2].exercises} />
		</>
	)
}

const Total = ({total}) => {
	return (
		<p>{total}</p>
	)
}

const App = () => {
	const course = {
		name :'Half Stack application development',
		parts : [
			{
				name: 'Fundamentels of React',
				exercises: 10
			},
			{
				name: 'Using props to pass data',
				exercises: 7
			},
			{
				name: 'State of a component',
				exercises: 14
			}
		]
	};

	return (
		<div>
			<Course course = {course.name}/>
			<Content parts = {course.parts} />
			<Total total = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));