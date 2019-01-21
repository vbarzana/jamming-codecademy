import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddTrackClick = this.handleAddTrackClick.bind(this);
	}

	handleAddTrackClick(event) {
		this.props.onToggleTrackToPlaylist(this.props.trackId);
		return event.preventDefault();
	}

	render() {
		let plusMinus = this.props.inPlaylist ? '-' : '+';
		return (
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.title}</h3>
					<p>{this.props.artist} | {this.props.album}</p>
				</div>
				<a className="Track-action" onClick={this.handleAddTrackClick}>{plusMinus}</a>
			</div>
		);
	}
}

export default Track;