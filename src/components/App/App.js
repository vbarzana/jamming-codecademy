import React, {Component} from 'react';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import TrackList from "../TrackList/TrackList";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../services/Spotify";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playListTracks: []
		};
		this.onSearchChange = this.onSearchChange.bind(this);
		this.addToPlaylist = this.addToPlaylist.bind(this);
		this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
		this.onSaveToSpotify = this.onSaveToSpotify.bind(this);
	}

	async onSearchChange(searchString) {
		if (!searchString) return null;
		try {
			let results = await Spotify.search(searchString);
			this.setState({
				searchResults: results
			});
		} catch (error) {
			console.log(error);
		}
	}

	addToPlaylist(trackId) {
		let tracksinPlaylist = this.state.playListTracks;
		const inPlaylist = tracksinPlaylist.filter(track => track.id === trackId)[0];

		if (!inPlaylist) {
			const trackInSearchResult = this.state.searchResults.filter(track => track.id === trackId)[0];
			if (trackInSearchResult) {
				tracksinPlaylist.push(Object.assign({
					inPlaylist: true
				}, trackInSearchResult));
				this.setState({
					playListTracks: tracksinPlaylist
				})
			}
		}
	}

	removeFromPlaylist(trackId) {
		let tracksinPlaylist = this.state.playListTracks;
		let trackinPlaylistPosition = -1;
		const inPlaylist = tracksinPlaylist.filter((track, position) => {
			const matches = track.id === trackId;
			if (matches) {
				trackinPlaylistPosition = position;
			}
			return track.id === trackId;
		})[0];

		if (inPlaylist && trackinPlaylistPosition > -1) {
			tracksinPlaylist.splice(trackinPlaylistPosition, 1);
			this.setState({
				playListTracks: tracksinPlaylist
			})
		}
	}

	async onSaveToSpotify(playlistName) {
		try {
			await Spotify.createPlaylist(playlistName, this.state.playListTracks);
			// if no error, then clear the playlist
			this.setState({
				playListTracks: []
			});
			Playlist.clearPlaylist();
			alert(`Playlist ${playlistName} successfully created!`);
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	}

	render() {
		return (
			<div className="App">
				<SearchBar
					onSearchChange={this.onSearchChange}
				/>
				<div className="App-playlist">
					<div className="SearchResults">
						<h2>Results</h2>
						<TrackList
							tracks={this.state.searchResults}
							onToggleTrackToPlaylist={this.addToPlaylist}
						/>
					</div>
					<Playlist
						tracks={this.state.playListTracks}
						onToggleTrackToPlaylist={this.removeFromPlaylist}
						onSaveToSpotify={this.onSaveToSpotify}
					/>
				</div>
			</div>
		);
	}
}

export default App;
