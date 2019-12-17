import React, {useState} from 'react';
import List from './List';
import axios from 'axios';

import './App.css';

const App = () => {
	const [ input, setInput] = useState('');  
	const [ countries, setCountries ] = useState([]);
	
	const handleChange = (event) => {
		// console.log(event.target.value);
		setInput(event.target.value);
		getList(event.target.value);
	}

	const handleShowBtn = (input) => {
		setInput(input);
		getList(input);
	}

	const getList = (input) => {
		if(input!=="") {
			axios
			.get('https://restcountries.eu/rest/v2/name/' + input)
			.then( (response) => {
				console.log(response);
				if( response.status === 404 ) {
					setCountries([]);
				}
				else {
					setCountries(response.data);
				}
			})
			.catch(err => setCountries([]))
		}
		else {
			setCountries([]);
		}
	};

	return (
		<div>
			Find Countries: <input  
				onChange = {handleChange}
				value = {input}
				/>
			<h1>Matches</h1>
			<List countries = {countries} input = {input} handleShowBtn = {handleShowBtn} />
		</div>
  	);
}

export default App;
