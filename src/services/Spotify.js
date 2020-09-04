const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri =
  process.env.REACT_APP_SPOTIFY_CALLBACK || 'http://localhost:3000/callback';

  console.log(clientId);
  console.log(redirectUri);
const apiUrl = 'https://api.spotify.com/v1';
const scope = 'playlist-modify-public';
const defaultTypes = 'album,artist,playlist,track';
let accessToken = null;
let userId = null;

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
const getHashParams = () => {
  let hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g;
  let q = window.location.hash.substring(1);

  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const clearCredentials = () => {
  accessToken = null;
  window.location.hash = '';
  userId = null;
  Spotify.login();
};

class Spotify {
  static getTokenFromHash() {
    if (accessToken) {
      return accessToken;
    }

    let params = getHashParams();
    accessToken = params.access_token;
    const expiresIn = parseInt(params.expires_in, 10) * 1000;

    if (accessToken) {
      setTimeout(() => clearCredentials, expiresIn);
    } else {
      return Spotify.login();
    }

    return accessToken;
  }

  static async getUserId() {
    if (userId) {
      return userId;
    }
    return fetch(`${apiUrl}/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Spotify.getTokenFromHash()}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Invalid response');
      })
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return userId;
      });
  }

  /**
   * Creates a new playlist in Spotify, once the playlist is created it will add the user tracks, note, if a playlist
   * with the same name already exist in Spotify it will not alert the user, instead a playlist with the same name
   * will be created
   * @param {String} name The name of the playlist
   * @param {Track []} tracks The tracks array
   * @returns {Promise<void>}
   */
  static async createPlaylist(name, tracks) {
    if (!name) return;
    let playlist;
    try {
      playlist = await Spotify.doCreatePlaylist(name);
    } catch (error) {
      console.log(error);
    }

    try {
      await Spotify.addTracksToPlaylist(playlist, tracks);
    } catch (error) {
      console.log(error);
    }
  }

  static async doCreatePlaylist(name) {
    let user_id = await Spotify.getUserId();
    return fetch(`${apiUrl}/users/${user_id}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Spotify.getTokenFromHash()}`
      },
      body: JSON.stringify({
        name: name
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Invalid response');
    });
  }

  static async addTracksToPlaylist(playlist, tracks) {
    return fetch(`${apiUrl}/playlists/${playlist.id}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Spotify.getTokenFromHash()}`
      },
      body: JSON.stringify({
        uris: (tracks || []).map(track => track.uri)
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Invalid response');
    });
  }

  static login() {
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
      clientId
    )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location = url;
  }

  static async search(query, types) {
    let accessToken = Spotify.getTokenFromHash('search', [query, types]);
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
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        clearCredentials();
        throw new Error('Request failed!');
      })
      .then(jsonResponse => {
        let tracks =
          (jsonResponse && jsonResponse && jsonResponse.tracks.items) || [];
        return tracks.map(track => {
          return {
            id: track.id,
            uri: track.uri,
            album: track.album.name,
            name: track.name,
            artist: track.artists[0] && track.artists[0].name
          };
        });
      });
  }
}

export default Spotify;
