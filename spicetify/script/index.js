const album_scrolling_wrapper = document.getElementById("album-scrolling-wrapper");
const playlist_scrolling_wrapper = document.getElementById("playlist-scrolling-wrapper");
const user_playlist_scrolling_wrapper = document.getElementById("user-playlist-scrolling-wrapper");


async function loadNewReleases(){

	fetch("https://api.spotify.com/v1/browse/new-releases?country=SE", { 
		headers: auth,
		method: "GET"
		
		}).then((response) => {
			return response.json();

		}).then((data)=> {
			data.albums.items.map((obj) => {

				album_scrolling_wrapper.innerHTML += 
					"<div class='card' onclick=\"localStorage.setItem('albumID', '" + obj.id + "');window.location.href = 'album.html'\">" + 
						"<img src='" + obj.images[1].url + "'>" + 
						"<p>" + obj.name + "</p>" + 
						"<p>" + obj.artists[0].name + "</p>" +
					"</div>"
				// console.log(document.getElementsByClassName("card")[oi].getAttribute("value"))
			})

		}).catch((err) => {
			console.log("FEL: " + err);
		});
}

async function loadFeatPlaylist(){

	fetch("https://api.spotify.com/v1/browse/featured-playlists?country=SE&limit=20", { 
		headers: auth,
		method: "GET"
		
		}).then((response) => {
			return response.json();

		}).then((data)=> {
			data.playlists.items.map((obj) => {

				playlist_scrolling_wrapper.innerHTML += 
					"<div class='card' onclick=\"localStorage.setItem('playlistID', '" + obj.id + "');window.location.href = 'playlist.html'\">" + 
						"<img src='" + obj.images[0].url + "'>" + 
						"<p>" + obj.name + "</p>" + 
						"<p>" + ((obj.description).length > 0 ? obj.description : "No description") + "</p>" +
					"</div>"
				// console.log(document.getElementsByClassName("card")[oi].getAttribute("value"))
			})

		}).catch((err) => {
			console.log("FEL: " + err);
		});
}

async function loadUserPlaylist(){

	fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists", { 
		headers: auth,
		method: "GET"
		
		}).then((response) => {
			return response.json();

		}).then((data)=> {
			data.items.map((obj) => {

				user_playlist_scrolling_wrapper.innerHTML += 
					"<div class='card' onclick=\"localStorage.setItem('playlistID', '" + obj.id + "');window.location.href = 'playlist.html'\">" + 
						"<img src='" + obj.images[0].url + "'>" + 
						"<p>" + obj.name + "</p>" + 
						"<p>" + ((obj.description).length > 0 ? obj.description : "No description") + "</p>" +
					"</div>"
			})

		}).catch((err) => {
			window.location.href = 'error.html'
		});
}

loadNewReleases();
loadFeatPlaylist();
loadUserPlaylist();