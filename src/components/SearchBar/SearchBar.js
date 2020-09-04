import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.onSearchKeyPress = this.onSearchKeyPress.bind(this);
	}

	onSearchClick(event) {
		event.preventDefault();
		this.doSearch();
	}

	doSearch(){
		const search = document.querySelector(".SearchBar input").value;
		if (this.props.onSearchChange) {
			this.props.onSearchChange(search);
		}
	}

	onSearchKeyPress(event) {
		console.log(event);
		if(event.charCode === 13){
			return this.doSearch();
		}
	}

	render() {
		return (
			<div className="SearchBar">
				<input placeholder="Search in Spotify" onKeyPress={this.onSearchKeyPress}/>
				<button onClick={this.onSearchClick}>SEARCH</button>
			</div>
		);
	}
}

export default SearchBar;