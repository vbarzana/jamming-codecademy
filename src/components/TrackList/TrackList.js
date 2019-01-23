import React from 'react';
import './TrackList.css';
import Track from "../Track/Track";

class TrackList extends React.Component {
	render() {
		return (
			<div className="TrackList">
				{
					this.props.tracks.map(track => (
							<Track
								key={track.id}
								trackId={track.id}
								inPlaylist={track.inPlaylist}
								album={track.album}
								onToggleTrackToPlaylist={this.props.onToggleTrackToPlaylist}
								onToggleTrackPlay={this.props.onToggleTrackPlay}
								artist={track.artist}
								playingNow={track.playingNow}
								title={track.name}
							/>
						)
					)
				}
			</div>
		);
	}
}

export default TrackList;