import React from 'react';
import './Player.css';

class Player extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (!this.props.currentTrackId) {
			return null;
		}
		const trackUrl = `https://open.spotify.com/embed/track/${this.props.currentTrackId}`;
		return (
			<div className="Player">
				<h2>Listen</h2>
				<br/>
				<iframe
					src={trackUrl}
					width="500" height="80"
					allowtransparency="true"
					frameBorder="0"
					allow="encrypted-media"></iframe>
			</div>
		);
	}
}

export default Player;
