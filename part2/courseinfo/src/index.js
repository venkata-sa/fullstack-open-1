import React from 'react';
import ReactDOM from 'react-dom';

import Course from './components/Course';
import './index.css';

const App = () => {

	const course = [
		{
			name :'Half Stack application development',
			id: 1,
			parts : [
				{
					name: 'Fundamentels of React',
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
				},
				{
					name: 'Redux',
					exercises: 11,
					id: 4
				}
			]
		},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2
				}
			]
		}
	]

	const currentCourse = () => course.map( 
		(c) => {
			return (<>
				<Course key = {c.id} course = {c}/>
			</>)
		}
	 )

	return (
		<div>
			<h1>Web Development Curriculum</h1>
			{currentCourse()}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));