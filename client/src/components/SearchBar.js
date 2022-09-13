import React from 'react'

export default function SearchBar(props) {

	const handleInputChange = event => {
		props.searchProp(event.target.value)
	}

	return (
		<input type="text" onChange={handleInputChange} />

	)
}