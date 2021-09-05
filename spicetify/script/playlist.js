const Main = document.getElementById("main");

async function loadPlaylist(){

	fetch("https:/api.spotify.com/v1/playlists/" + localStorage["playlistID"], { 
		method: "GET",
		headers: auth

		}).then((response) => {
			return response.json();

		}).then((data) => {
			console.log("https:/api.spotify.com/v1/playlists/" + localStorage["playlistID"])

			document.title = data.name + " - Spicetify"

			Main.innerHTML += 
				"<div class='hero'>" + 
					"<img class='cover skeleton' style='background-image: url(" + data.images[0].url + ");'></img>" +
					"<div class='hero_info'>" +
						"<h1 class='album_name'>" + data.name + "</h1>" +
						"<h1 class='album_desc'>" + data.description + "</h1>" +
						"<h1 class='artist_name'> By " +  data.owner.display_name + "</h1>"+
					"</div>" + 
				"</div>"
			
			data.tracks.items.map((obj, oi) => {

				object_index = oi + 1;
				seconds = Math.round(obj.track.duration_ms/1000);

				Main.innerHTML += 
					"<div class='trackBox playlist'>" + 
						"<p class='track_oi'>" + object_index + "</p>" +
						"<img class='icon skeleton' src='" + obj.track.album.images[2].url +"'>" + 
						
						"<div class'track_info'>" +	
							"<p class='track_name'>" + obj.track.name + "</p>" + 
							"<p class='album_creator'>" + obj.track.album.artists[0].name + "</p>" + 
						"</div>" +

						// "<p class='track_album'>" + obj.track"</p>"
						"<p class='track_ms'>" + Math.floor(seconds/60) + ":" + ((seconds % 60) <= 9 ? "0" + (seconds % 60) : (seconds % 60 ? seconds % 60 : "00")) + "</p>"

					"</div>"

			})
		}).catch((err) => {
			window.location.href = 'error.html'
		});
}

loadPlaylist()