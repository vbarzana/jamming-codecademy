import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	onSearchClick(event) {
		const search = document.querySelector(".SearchBar input").value;
		event.preventDefault();
		if (this.props.onSearchChange) {
			this.props.onSearchChange(search);
		}
	}

	render() {
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song Title"/>
				<a onClick={this.onSearchClick}>SEARCH</a>
			</div>
		);
	}
}

export default SearchBar;