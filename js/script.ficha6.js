'use strict';

var cloneMedia = $('.media').clone(),
$('btSearch').on('click', function(){
	var searchString = $('#pesquisa').val();
	
	$.ajax({
		method: "Get",
		url = "https://omdbapi.com/?apikey=7b0ac64a&s=" + searchString,
	})
	.done(function(res){
		console.log(res);
		
		//Change after this point
		$.each(res.Search, function(index, result){
			var liMedia = cloneMedia.clone();
			
			$('a', liMedia).attr('href','http://www.imdb.com/title/' + result.imdbID);
			
			$('.title', liMedia).text(result.Title);
			$('.ano', liMedia).text(result.Year);
			$('#image', liMedia).attr('src', result.Poster);
			
			$('.media-list').append(liMedia);
		})
	})
})
	