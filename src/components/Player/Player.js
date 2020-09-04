import React from 'react';
import './Player.css';

const Player = ({currentTrackId})=>{
		if (!currentTrackId) {
			return null;
		}
		const trackUrl = `https://open.spotify.com/embed/track/${currentTrackId}`;
		return (
			<div className="Player">
				<h2>Listen</h2>
				<br/>
				<iframe
					src={trackUrl}
					title={currentTrackId}
					width="500" height="80"
					allowtransparency="true"
					frameBorder="0"
					allow="encrypted-media"></iframe>
			</div>
		);

}

export default Player;
