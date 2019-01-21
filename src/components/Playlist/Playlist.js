import React from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {
	constructor(props){
		super(props);

		this.handleSaveToSpotify = this.handleSaveToSpotify.bind(this);
	}

	handleSaveToSpotify(){

	}

	render() {
		return (
			<div className="Playlist">
				<input defaultValue='New Playlist'/>
				<TrackList tracks={this.props.tracks} onToggleTrackToPlaylist={this.props.onToggleTrackToPlaylist}/>
				<a className="Playlist-save" onClick={this.handleSaveToSpotify}>SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;
