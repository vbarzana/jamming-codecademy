import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddTrackClick = this.handleAddTrackClick.bind(this);
		this.handlePlayTrack = this.handlePlayTrack.bind(this);
	}

	handleAddTrackClick(event) {
		this.props.onToggleTrackToPlaylist(this.props.trackId);
		return event.preventDefault();
	}

	handlePlayTrack(event) {
		this.props.onToggleTrackPlay(this.props.trackId);
		return event.preventDefault();
	}

	render() {
		let plusMinus = this.props.inPlaylist ? 'remove_circle_outline' : 'add';
		const className = 'Track ' + (this.props.playingNow ? 'playing-now' : '');
		return (
			<div className={className}>
				<div className="Track-information">
					<h3>{this.props.title}</h3>
					<p>{this.props.artist} | {this.props.album}</p>
				</div>
				<a className="Track-action" onClick={this.handleAddTrackClick}><i className="material-icons">{plusMinus}</i></a>
				<a className="Track-play-button" onClick={this.handlePlayTrack}><i className="material-icons">play_circle_outline</i></a>
			</div>
		);
	}
}

export default Track;