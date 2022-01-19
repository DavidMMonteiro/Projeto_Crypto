'use strict';

var API_url = "https://api.coingecko.com/api/v3/";
var get_ping = "ping";
var get_coins = "coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false";
var serach_coins = "search?query=";
var page_name = window.location.pathname.split("/").slice(-1);
var cloneMedia = $('.media').clone();
var fav_list = localStorage.getItem(fav_list);

$(window).on('load', function () {
	if (page_name == 'test.html' || page_name == 'index.html') {
		$.ajax({
			method: "GET",
			url: API_url + get_coins
		}).done(function (res) {
			console.log(res);
			$.each(res, function (index, result) {
				// Criar novo clone da lista
				//TODO Crear estructura HTML da linha
				var liMedia = cloneMedia.clone();
				// Alterar campos do item
				liMedia.id = result.id;
				$('.rank', liMedia).text("#" + result.market_cap_rank);
				$('.detalhes', liMedia).prop('id', result.id);
				$('#image', liMedia).attr('src', result.image);
				$('.nome', liMedia).text(result.name);
				$('.valor', liMedia).text(result.current_price);
				$('.change24h', liMedia).text(result.price_change_24h);
				// Adicionar o clone à tabela original
				$('.media-list').append(liMedia);
			})
			$('.media').first().remove();
		})
	} else if (page_name == 'favoritos.html') {

	} else if (page_name == 'search.html') {
		$.ajax({
			method: "GET",
			url: API_url + "search?query=" + localStorage.getItem("coin_search")
		}).done(function (res) {
			console.log(res);
			$.each(res.coins, function (index, result) {
				// Criar novo clone da linha
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
			$('.media').first().remove();
		})
	} else if (page_name == 'detalhes.html') {
		$.ajax({
			method: "GET",
			url: API_url + "coins/" + "ethereum"//localStorage.getItem("coin_detail")
		}).done(function (res) {
			// Criar novo clone da lista
			$('#image').attr('src', res.image.large);
			$('#nome').text(res.name);
			$('#symbol').text(res.symbol);
			//TODO Criar função para ver se esta em lista de favoritos
			//
			$('#rank').text("Rank #" + res.market_cap_rank);
			$('#price').text("€" + res.market_data.current_price.eur);
			$('#details').html(res.description.en);
			var original_section = $('.link_section').clone;
			//Insert external links
			//TODO Create link section

			$.each(res.links, function (index, link_list) {
				var section = original_section.clone;
				index = index.charAt(0).toUpperCase() + index.slice(1);
				index = index.replace("_url", "").replace("_", " ");
				console.log(index);
				$(".title_link", section).text(index);
				if (Array.isArray(link_list)) {
					$.each(link_list, function (index, url) {
						if (url != "" && typeof url === 'string') {
							console.log(url)
							/*var link_text = $(".link_text", section).clone;
							link_text.attr("href", url);
							link_text.text(url);
							section.append(link_text);*/
						}
					})
				} else if (typeof link_list === 'string' && link_list.includes("http")) {
					var link_text = $(".link_text", section).clone;
					link_text.attr("href", link_list);
					link_text.text(link_list);
					section.append(link_text);
				}
				$("#list-links").append(section);
			})
		})
	}
});

$('#btSearch').on('click', function () {
	var valuePesquisa = $('#pesquisa').val();
	localStorage.setItem("coin_search", valuePesquisa);
	window.location.href = "search.html";
})

$('.detalhes').click(function () {
	var id_coin = this.id;
	console.log("Id I have:" + id_coin);
	localStorage.setItem('coin_detail', id_coin);
	//window.location.href = "detalhes.html"
})