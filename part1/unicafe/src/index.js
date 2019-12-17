import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, neutral, bad}) => {
	let average = 0, percentage = 0;
	let total = good + bad + neutral;
	
	if(good === 0 && neutral === 0 && bad === 0 ) {
		return (
			<>
				<p>No feedback given</p>
			</>
		)	
	}

	average = ((good - bad) / total);
	percentage = ((100 * good) / total);

	return (
		<div>
			<table>
				<tbody>
					<Statistic text = 'good' value = {good}/>
					<Statistic text = 'neutral' value = {neutral}/>
					<Statistic text = 'bad' value = {bad}/>
					<Statistic text = 'average' value = {average}/>
					<Statistic text = 'percentage' value = {percentage} optional = '%'/>
				</tbody>
			</table>
		</div>
	)
}

const Statistic = ({text, value, optional}) => {
	if(!optional) {
		return (
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		)
	}
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
			<td>{optional}</td>
		</tr>
	)
}

const Button = ({onClick, text}) => {
	return (
		<button onClick = {onClick}>
			{text}
		</button>
	)
}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	let props = {good, neutral, bad};

	const handleGood = () => setGood(good + 1)
	const handleBad = () => setBad(bad + 1)
	const handleNeutral = () => setNeutral(neutral + 1)

	return (
		<>
			<h1>give feedback</h1>
	  		<div>
		  		<Button onClick = {handleGood} text = 'good'/>
				<Button onClick = {handleNeutral} text = 'neutral'/>
				<Button onClick = {handleBad} text = 'bad'/>
	  		</div>

			<h1>statistics</h1>
			<Statistics {...props} />
		</>
	)
  }

ReactDOM.render(<App />, document.getElementById('root'));