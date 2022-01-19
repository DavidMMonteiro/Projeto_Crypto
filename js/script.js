'use strict';

/*------Variaveis Gerais------*/
var coin_type = "€";
var current_page = 1;
var current_country = "eur"
var original_link_section = $('.link_section').clone();
var fav_list = new Array();
//fav_list = JSON.parse(localStorage.getItem('fav_list'));

/*------Variaveis API------*/
var API_url = "https://api.coingecko.com/api/v3/";
var serach_coins = "search?query=";

/*------Variaveis HTML------*/
var page_name = window.location.pathname.split("/").slice(-1);
var cloneMedia = $('.media').clone();
var linha_fav = $('.fav_line').clone();

/*------Função on load do página------*/
$(window).on('load', function () {
	reload_fav_list();
	if (page_name == 'index.html') {
		load_index();		
		$('.media').first().remove();
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
			url: API_url + "coins/" + "bitcoin"//"ethereum"//localStorage.getItem("coin_detail")
		}).done(function (res) {
			// Criar novo clone da lista
			$('#image').attr('src', res.image.large);
			$('#image').attr('alt', "Logo " + res.name);
			$('#image').attr('title', 'Logo ' + res.name);
			$('#nome').text(res.name);
			$('#symbol').text(res.symbol);
			//TODO Criar função para ver se esta em lista de favoritos
			//
			$('#rank').text("Rank #" + res.market_cap_rank);
			$('#price').text(coin_type + res.market_data.current_price.eur);
			$('#details').html(res.description.en);
			//Insert external links
			$.each(res.links, function (index, link_list) {
				var section = original_link_section.clone();
				index = index.charAt(0).toUpperCase() + index.slice(1);
				index = index.replace("_url", "").replace("_", " ");
				$(".title_link", section).text(index);
				if (Array.isArray(link_list)) {
					$.each(link_list, function (index, url) {
						if (url != "" && typeof url === 'string') {
							var link_text = index == 0 ? $(".link_text", section) : $(".link_text", section).clone();
							$('a', link_text).attr("href", url);
							$('a', link_text).text(url);
							$("ul", section).append(link_text);
						}
					})
				} else if (typeof link_list === 'string') {
					var link_text = $(".link_text", section);
					if (link_list.includes("http")) {
						$('a', link_text).attr('href', link_list);
					}
					$('a', link_text).text(link_list);

				}
				if ($("li a", section).last().text() != "") {
					$("#list-links").append(section);
				}
			})
			$('.link_section').first().remove();
		})
	}
});

/*------Funções especificas de objetos------*/

//Guarda a info que quere ser pasada para a página de detalhes de forma local
//e é carregada mais tarde para fazer a pesquisa uma vez que a página carrega. 
$('#btSearch').on('click', function () {
	var valuePesquisa = $('#pesquisa').val();
	localStorage.setItem("coin_search", valuePesquisa);
	window.location.href = "search.html";
})

$('.detalhes').on('click', function () {
	console.log("Im trying to get into Coin " + this.id + "details");
	var id_coin = this.id;
	localStorage.setItem('coin_detail', id_coin);
	window.location.href = "detalhes.html"
})

//-Sistema de troca de página de criptomoedas-----//
$('.first_page').on("click", function () {
	$('.first_page').text('');
	$('.current_page').text("Pág.1");
	$('.back_page').text('');
	current_page = 1;
	removeAllChildNodes(document.querySelector('.media-list'));
	load_index();
})

$('.back_page').on("click", function () {
	if (current_page > 1) {
		$('.current_page').text("Pág." + --current_page);
		if (current_page == 1) {
			$('.first_page').text('');
			$('.back_page').text('');
		}
		removeAllChildNodes(document.querySelector('.media-list'));
		load_index();
	}
})

$('.next_page').on("click", function () {
	if (current_page < 2) {
		$('.first_page').text('«');
		$('.back_page').text('<');
	}
	$('.current_page').text("Pág." + ++current_page);
	removeAllChildNodes(document.querySelector('.media-list'));
	load_index();
})
//---------------------------------------------------//

$('#btTest').on('click', function () {
	console.log("Im trying to load fav_list");
	removeAllChildNodes(document.querySelector('.fav_list'));
	reload_fav_list();
})


/*------Funções gerais------*/
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/*------Funções Especificas------*/

function reload_fav_list() {
	var fav_table = $('.fav_list')
	fav_table.innerHTML = '';
	$.each(fav_list, function (index, coin) {
		var fav_line = $(".fav_line", fav_table).clone();
		$(".rank", fav_line).text("#" + coin.market_cap_rank);
		$("#image", fav_line).attr('src', coin.image);
		$(".nome", fav_line).text(coin.name);
		$(".value", fav_line).text(coin_type + coin.current_price);
		fav_table.append(fav_line);
	})
}

function load_index() {
	$.ajax({
		method: "GET",
		url: API_url + "coins/markets?vs_currency=" + current_country +
			"&order=market_cap_desc&per_page=100&page=" + current_page +
			"&sparkline=false"
	}).done(function (res) {
		console.log(res);
		$.each(res, function (index, result) {
			// Criar novo clone da lista
			var liMedia = cloneMedia.clone();
			// Alterar campos do item
			liMedia.id = result.id;
			$('.rank', liMedia).text("#" + result.market_cap_rank);
			$('.detalhes', liMedia).prop('id', result.id);
			$('#image', liMedia).attr('src', result.image);
			$('.nome', liMedia).text(result.name);
			$('.valor', liMedia).text(coin_type + result.current_price);
			$('.change24h', liMedia).text(result.price_change_24h);
			(result.price_change_24h > 0 ? 
				$('.change24h', liMedia).addClass("up") : $('.change24h', liMedia).addClass("down"));
			$('#fav_button', liMedia).checked = fav_list.includes(result);
			$('#fav_button', liMedia).change(function () {
				if (this.checked) {
					fav_list.push(result);
					console.log(fav_list);
				} else {
					fav_list = fav_list.filter(coin => coin.id !== result.id);
					console.log(fav_list);
				}
				localStorage.setItem('fav_list', JSON.stringify(fav_list));
			});
			// Adicionar o clone à tabela original
			$('.media-list').append(liMedia);
		})
	})
}