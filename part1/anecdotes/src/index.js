import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function getRandomInt(max) {
	return Math.floor( Math.random() * Math.floor(max) );
}

const Button = ({onClick, text}) => {
	return (
		<button onClick = {onClick}>
			{text}
		</button>
	)
}

const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [points, updatePoints] = useState(Array(anecdotes.length).fill(0));
	const [best, setBest] = useState(0);

	const incrementPoints = (position) => {
		const newPoints = {
			...points,
		};
		newPoints[position] = points[position] + 1;

		const result = () => {
			updatePoints(newPoints);
		}

		if( points[position] > points[best] ) {
			setBest(position);
		}

		return result;
	}

	const getNext = () => {
		return setSelected(getRandomInt(anecdotes.length));
	}
  
	return (
		<>
			<h1>Anecdote of the day</h1>
			<div>{props.anecdotes[selected]}</div>
			<div>has {points[selected]} votes</div>
			<Button onClick = {incrementPoints(selected)} text = {'vote'} />
			<Button onClick = {getNext} text = {'next anecdote'} />

			<h1>Anecdotes with the most votes</h1>
			<div>{ props.anecdotes[ best ] }</div>
			<div>has {points[best]} votes</div>
		</>
	)
  }
  
  const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(
	<App anecdotes = {anecdotes}/>, 
	document.getElementById('root')
);