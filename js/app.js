$(document).ready(function(){
	initPlayer();
	getSongs();
});
var audio = document.getElementById('player');
var music;

function initPlayer(){
	$('#shuffle').click(function(){
		$('#playlist').empty();
		console.log(shuffle(music.songs));
		genList(music);
		playSong(0);
	});
}

//Función para obtener el JSON de las canciones
function getSongs() {
	$.getJSON("js/app.json", function(mjson){
		music = mjson;
		console.log(music);
		genList(music);
	});
}

function genList(music){
	$.each(music.songs, function(i, song){
		$("#playlist").append('<li class="list-group-item" id="'+i+'">'+song.name+'</li>');
	});
	$("#playlist li").click(function(){
		var selectedsong = $(this).attr('id');
		playSong(selectedsong);
	});
}

function playSong(id){
	var long = music.songs;
	if(id >= long.length){
		console.log("se acabo!");
		audio.pause();
	} else {
		$("#img-album").attr('src', music.songs[id].image);
		$('#player').attr('src', music.songs[id].song);
		audio.play();
		console.log("Hay mas canciones!");
		scheduleSong(id);
	}
	
};

function scheduleSong(id){
	audio.onended = function(){
		console.log("termino la cancion");
		playSong(parseInt(id)+1);
	}
}

function shuffle(array){
	for(var random, temp, position = array.length; position; random = Math.floor(Math.random()*position),temp = array[--position], array[position]=array[random], array[random]= temp);
	return array;	
}