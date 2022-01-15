'use strict';

var API_url = "https://api.coingecko.com/api/v3/";
var get_ping = "ping";
var get_coins = "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";
var serach_coins = "search?query=";
var page_name = window.location.pathname.split("/").slice(-1);
var cloneMedia = $('.media').clone();
var fav_list = localStorage.getItem(fav_list);

$(window).on('load',function() {
	if(page_name == 'test.html' || page_name == 'index.html'){
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
				$('.rank', liMedia).text("#" + result.market_cap_rank);
				$('.detalhes', liMedia).prop('id',result.id);
				$('#image', liMedia).attr('src', result.image);
				$('.nome', liMedia).text(result.name);
				$('.valor', liMedia).text(result.current_price);
				$('.change24h', liMedia).text(result.price_change_24h);
				// Adicionar o clone à tabela original
				$('.media-list').append(liMedia);
			})
		})
	}else if(page_name == 'favoritos.html'){

	}else if(page_name == 'search.html'){	
		$.ajax({
			method: "GET",
			url: API_url + "search?query=" + localStorage.getItem("coin_search")
		}).done(function(res){
			console.log(res);
			$.each(res.coins, function(index, result){
				// Criar novo clone da lista
					//TODO Crear estructura HTML da linha
					var liMedia = cloneMedia.clone();
					// Alterar campos do item
					liMedia.id = result.id;
					//TODO Check rank 
					$('.rank', liMedia).text("#" + result.market_cap_rank);
					$('#image', liMedia).attr('src', result.large);
					$('.nome', liMedia).text(result.name);
					// Adicionar o clone à tabela original
					$('.media-list').append(liMedia);
			})
		})
	}else if(page_name == 'detalhes.html'){
		$.ajax({
			method: "GET",
			url: API_url + "coins/" + localStorage.getItem("coin_detail")
		}).done(function(res){
			console.log(res);
			$.each(res.coins, function(index, result){
				// Criar novo clone da lista
					$('.logo').text(result.market_cap_rank);
					$('.nome').attr('src', result.large);
					$('.symbol').text(result.name);
			})
		})
	}
});

$('#btSearch').on('click', function() {
	var valuePesquisa = $('#pesquisa').val();
	localStorage.setItem("coin_search",valuePesquisa);
	window.location.href = "search.html";
})

$('.detalhes').on('click', function(){
	var id_coin = this.id;
	localStorage.setItem('coin_detail', id_coin);
	window.location.href = "detalhes.html"
})