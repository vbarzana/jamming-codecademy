import React from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

const defaultValue = 'New Playlist';

class Playlist extends React.Component {
	constructor(props) {
		super(props);

		this.handleSaveToSpotify = this.handleSaveToSpotify.bind(this);
	}

	static clearPlaylist() {
		const playlistNameEl = document.querySelector(".Playlist input");
		if (playlistNameEl) {
			playlistNameEl.value = defaultValue;
		}
	}

	handleSaveToSpotify(event) {
		const playlistName = document.querySelector(".Playlist input").value;
		this.props.onSaveToSpotify(playlistName);
		event.preventDefault();
	}

	render() {
		return (
			<div className="Playlist">
				<input defaultValue={defaultValue}/>
				<TrackList
					tracks={this.props.tracks}
					onToggleTrackToPlaylist={this.props.onToggleTrackToPlaylist}
					onToggleTrackPlay={this.props.onToggleTrackPlay}
				/>
				<button className="Playlist-save" onClick={this.handleSaveToSpotify}>SAVE TO SPOTIFY</button>
			</div>
		);
	}
}

export default Playlist;
