'use strict';

var API_url = "https://api.coingecko.com/api/v3/";
var get_ping = "ping";
var get_coins = "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";
var page_name = window.location.pathname.split("/").slice(-1);

$(window).on('load',function() {
	if(page_name == 'test.html' || page_name == 'index.html'){
		
		var cloneMedia = $('.media').clone();
		$.ajax({
			method: "GET",
			url: API_url + get_coins
		}).done(function(res){
			console.log(res);
			$.each(res, function(index, result){
				// Criar novo clone da lista
				//TODO Crear estructura HTML da linha
				var liMedia = cloneMedia.clone();
				// Alterar campos do item
				liMedia.id = result.id;
				//TODO Check rank 
				$('.rank', liMedia).text(result.market_cap_rank);
				$('#image', liMedia).attr('src', result.image);
				$('.nome', liMedia).text(result.name);
				$('.valor', liMedia).text(result.current_price);
				$('.change24h', liMedia).text(result.price_change_24h);
				// Adicionar o clone à tabela original
				$('.media-list').append(liMedia);
			})
		})
	}else if(page_name == 'favoritos.html'){

	}
});