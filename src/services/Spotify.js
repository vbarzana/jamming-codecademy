const clientId = '995a333951874e1ea83aa9cfabecb0db';
const redirectUri = 'http://localhost:3000/callback';
const apiUrl = 'https://api.spotify.com/v1';
const scope = 'playlist-modify-public';
const defaultTypes = 'album,artist,playlist,track';
let accessToken = null;

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
const getHashParams = () => {
	let hashParams = {};
	let e, r = /([^&;=]+)=?([^&;]*)/g;
	let q = window.location.hash.substring(1);

	while (e = r.exec(q)) {
		hashParams[e[1]] = decodeURIComponent(e[2]);
	}
	return hashParams;
};

class Spotify {
	static getTokenFromHash() {
		let params = getHashParams();
		let accessToken = params.access_token;
		const expiresIn = parseInt(params.expires_in, 10) * 1000;

		if (accessToken) {
			setTimeout(() => {
				accessToken = null;
				window.location.hash = '';
			}, expiresIn);
		} else {
			return Spotify.login();
		}

		return accessToken;
	}

	static login() {
		var url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
		window.location = url;
	}

	static async search(query, types) {
		let accessToken = Spotify.getTokenFromHash();
		query = encodeURIComponent(query);
		if (!types) {
			types = defaultTypes;
		}
		types = encodeURIComponent(types);

		return fetch(`${apiUrl}/search?q=${query}&type=${types}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		}).then(response => {
			return response.json();
		}).then(jsonResponse => {
			let tracks = (jsonResponse && jsonResponse && jsonResponse.tracks.items) || [];
			return tracks.map(track => {
				return {
					id: track.id,
					href: track.href,
					album: track.album.name,
					name: track.name,
					artist: track.artists[0] && track.artists[0].name
				};
			})
		});
	}
};

export default Spotify;