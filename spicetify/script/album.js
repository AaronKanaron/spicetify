const Main = document.getElementById("main");

async function loadAlbum(){

	//FETCH ALBUM
	fetch("https://api.spotify.com/v1/albums/" + localStorage["albumID"], { 
		method: "GET",
		headers: auth

		}).then(response => {
		return response.json();

		}).then(data=> {

			document.title = data.name + " - Spicetify"
			// document.body.style.backgroundImage = "url('" + data.images[0].url + "')"
			// var rgb = getAverageRGB(data.images[2])

			Main.innerHTML += 
			"<div class='hero'>" + 
				"<img class='cover skeleton' style='background-image: url(" + data.images[1].url + ");'></img>" +
				"<div class='hero_info'>" +
					"<h1 class='album_name'>" + data.name + "</h1>" +
					"<h1 class='artist_name'>" +  data.artists[0].name + "</h1>"+
				"</div>" + 
			"</div>"

			data.tracks.items.map((obj, oi) => {
				object_index = oi + 1;
				seconds = Math.round(obj.duration_ms/1000);

				Main.innerHTML += 
					"<div class='trackBox album'>" + 
						"<p class='track_oi'>" + object_index + "</p>" +
						// "<img class='icon' src='" + data.images[2].url +"'>" + 

						"<div class'track_info'>" +	
							"<p class='track_name'>" + obj.name + "</p>" + 
							"<p class='album_creator'>" + obj.artists[0].name + "</p>" + 
						"</div>" +

						"<p class='track_ms'>" + Math.floor(seconds/60) + ":" + ((seconds % 60) <= 9 ? "0" + (seconds % 60) : (seconds % 60 ? seconds % 60 : "00")) + "</p>"

					"</div>"		
		});
	})
}



loadAlbum();