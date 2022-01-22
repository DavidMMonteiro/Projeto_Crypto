'use strict';

/*------Variaveis Gerais------*/
var coin_type = '€';
var current_page = 1;
var current_country = 'eur'
var original_link_section = $('.link_section').clone();
var path_coingecko = "https://www.coingecko.com/en/coins/";
var fav_list = new Array();
//fav_list = JSON.parse(localStorage.getItem('fav_list'));

/*------Variaveis API------*/
var API_url = 'https://api.coingecko.com/api/v3/';
var serach_coins = 'search?query=';

/*------Variaveis HTML------*/
var page_name = window.location.pathname.split('/').slice(-1);
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
		load_search();
	} else if (page_name == 'detalhes.html') {
		load_details();
	}
});

/*------Funções especificas de objetos------*/

//Guarda a info que quere ser pasada para a página de detalhes de forma local
//e é carregada mais tarde para fazer a pesquisa uma vez que a página carrega. 
$('#btSearch').on('click', function () {
	if ($('#pesquisa').val() != '') {
		var valuePesquisa = $('#pesquisa').val();
		localStorage.setItem('coin_search', valuePesquisa);
		window.location.href = 'search.html';
	}
})

//-Sistema de troca de página de criptomoedas-----//
$('.first_page').on('click', function () {
	$('.first_page').text('');
	$('.current_page').text('Pág.1');
	$('.back_page').text('');
	current_page = 1;
	removeAllChildNodes(document.querySelector('.media-list'));
	load_index();
})

$('.back_page').on('click', function () {
	if (current_page > 1) {
		$('.current_page').text('Pág.' + --current_page);
		if (current_page == 1) {
			$('.first_page').text('');
			$('.back_page').text('');
		}
		removeAllChildNodes(document.querySelector('.media-list'));
		load_index();
	}
})

$('.next_page').on('click', function () {
	if (current_page < 2) {
		$('.first_page').text('«');
		$('.back_page').text('<');
	}
	$('.current_page').text('Pág.' + ++current_page);
	removeAllChildNodes(document.querySelector('.media-list'));
	load_index();
})
//---------------------------------------------------//

$('#btTest').on('click', function () {
	console.log('Im trying to load fav_list');
	removeAllChildNodes(document.querySelector('.fav_list'));
	reload_fav_list();
})


/*------Funções gerais------*/

//	Apaga todos os elementos filhos de um objeto
function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

// Retorna a construçao de strings do valor inserido
function value_state(type, value) {
	var output = "";
	switch (type) {
		case 0: //String setas
			if (value == null) {
				output = '';
			} else {
				output = (value > 0 ? '↑ ' : '↓ ') + value;
			}
			break;
		case 1:// String classes
			if (value == null) {
				output = '';
			} else {
				output = value > 0 ? 'up' : 'down';
			}
			break;
		case 2: //String title
			if (value == null) {
				output = 'estático ';
			} else {
				output = value > 0 ? 'subida ' : 'descida ';
			}
			break;
	}
	return output;
}

/*------Funções Especificas------*/

//Função de processo de dados da página principal
function load_index() {
	$.ajax({
		method: 'GET',
		url: API_url + 'coins/markets?vs_currency=' + current_country +
			'&order=market_cap_desc&per_page=100&page=' + current_page +
			'&sparkline=false'
	}).done(function (res) {
		console.log(res);
		$.each(res, function (index, result) {
			// Criar novo clone da lista
			var liMedia = cloneMedia.clone();
			// Alterar campos do item
			liMedia.id = result.id;
			$('.rank', liMedia).text('#' + result.market_cap_rank);
			$('.rank', liMedia).prop('title', 'Rank da moeda #' + result.market_cap_rank);
			$('.detalhes', liMedia).prop('id', result.id);
			//Guarda localmente a id da moeda selecionada para carregar os detalhes mais tarde
			$('.detalhes').on('click', function () {
				console.log('Im trying to get into Coin ' + this.id + 'details');
				var id_coin = this.id;
				localStorage.setItem('coin_detail', id_coin);
				window.location.href = 'detalhes.html'
			})
			$('#image', liMedia).attr('src', result.image);
			$('#image', liMedia).prop('title', 'Logo ' + result.name);
			$('.nome', liMedia).text(result.name);
			$('.nome', liMedia).prop('title', 'Nome da moeda: ' + result.name);
			$('.valor', liMedia).text(coin_type + result.current_price);
			$('.valor', liMedia).prop('title', 'Valor atual: ' + coin_type + result.current_price);
			var price_change_24h = result.price_change_24h;
			$('.change24h', liMedia).text((price_change_24h > 0 ? '↑ ' : '↓ ') + price_change_24h + coin_type);
			$('.change24h', liMedia).addClass(price_change_24h > 0 ? 'up' : 'down');
			$('.change24h', liMedia).prop('title', 'Valor de ' + (price_change_24h > 0 ? 'subida ' : 'descida ') + 'da moeda');
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
			$('#fav_label', liMedia).prop('title', 'Inserir a moeda ' + result.name + ' a favoritos');
			// Adicionar o clone à tabela original
			$('.media-list').append(liMedia);
		})
	})
}

//Função de processo de dados da página de detalhes
function load_details() {
	$.ajax({
		method: 'GET',
		url: API_url + 'coins/' + localStorage.getItem('coin_detail')
	}).done(function (res) {
		console.log(res);
		//Datos imagem
		$('#image a').attr('href', path_coingecko + res.id);;
		$('#image img').attr('src', res.image.large);
		$('#image img').attr('alt', 'Logo ' + res.name);
		$('#image img').attr('title', 'Logo ' + res.name + " & Link para a coingecko");
		//Nome moeda
		$('#nome').text(res.name);
		$('#nome').prop('title', "Nome da moeda: " + res.name);
		//Simbolo moeda
		$('#symbol').text(res.symbol);
		$('#symbol').prop('title', 'Simbolo da moeda: ' + res.name);
		//TODO Criar função para ver se esta em lista de favoritos
		$('#fav_button').checked = fav_list.includes(res);
		$('#fav_button').change(function () {
			if (this.checked) {
				fav_list.push(res);
				console.log(fav_list);
			} else {
				fav_list = fav_list.filter(coin => coin.id !== res.id);
				console.log(fav_list);
			}
			localStorage.setItem('fav_list', JSON.stringify(fav_list));
		});
		$('#fav_label').prop('title', 'Adicionar moeda ' + res.name + ' a favoritos');
		//Data Rank da moeda
		$('#rank').text('Rank #' + (res.market_cap_rank != null ? res.market_cap_rank : '---'));
		$('#rank').prop('title', 'Rank no mercado #' + res.market_cap_rank);
		//Data valor da moeda
		$('#price').text(coin_type + res.market_data.current_price.eur);
		$('#price').prop('title', 'Preço atual da moeda: ' + coin_type + res.market_data.current_price.eur);
		//Data mudanza preço em 24h
		var valor = res.market_data.price_change_24h;
		$('#change_price_24h').text(value_state(0,valor) + coin_type);
		$('#change_price_24h').addClass(value_state(1,valor));
		$('#change_price_24h').prop('title', 'Valor ' + value_state(2,valor) + 'da moeda nas ultimas 24h');
		//Data mudanza porcentagem em 24h
		valor = res.market_data.price_change_percentage_24h;
		$('#change_por_24h').text(value_state(0,valor) + ' %');
		$('#change_por_24h').addClass(value_state(1,valor));
		$('#change_por_24h').prop('title', 'Porcentagem ' + value_state(2,valor) + 'da moeda nas ultimas 24h');
		//Data mudanza porcentagem em 7d
		valor = res.market_data.price_change_percentage_7d;
		$('#change_por_7d').text(value_state(0,valor) + ' %');
		$('#change_por_7d').addClass(value_state(1,valor));
		$('#change_por_7d').prop('title', 'Porcentagem ' + value_state(2,valor) + 'da moeda nod ultimos 7d');
		//Data mudanza porcentagem em 14d
		valor = res.market_data.price_change_percentage_14d;
		$('#change_por_14d').text(value_state(0,valor) + ' %');
		$('#change_por_14d').addClass(value_state(1,valor));
		$('#change_por_14d').prop('title', 'Porcentagem ' + value_state(2,valor) + 'da moeda nod ultimos 14d');
		//Data mudanza porcentagem em 30d
		valor = res.market_data.price_change_percentage_30d;
		$('#change_por_30d').text(value_state(0,valor) + ' %');
		$('#change_por_30d').addClass(value_state(1,valor));
		$('#change_por_30d').prop('title', 'Porcentagem ' + value_state(2,valor) + 'da moeda nod ultimos 30d');
		//Data mudanza porcentagem em 60d
		valor = res.market_data.price_change_percentage_60d;
		$('#change_por_60d').text(value_state(0,valor) + ' %');
		$('#change_por_60d').addClass(value_state(1,valor));
		$('#change_por_60d').prop('title', 'Porcentagem ' + value_state(2,valor) + 'da moeda nod ultimos 60d');
		//Data mudanza porcentagem em 200d
		valor = res.market_data.price_change_percentage_200d;
		$('#change_por_200d').text(value_state(0,valor) + ' %');
		$('#change_por_200d').addClass(value_state(1,valor));
		$('#change_por_200d').prop('title', 'Porcentagem ' + value_state(2,valor) + 'da moeda nod ultimos 200d');
		//Data mudanza porcentagem em 200d
		valor = res.market_data.total_supply;
		$('#total_supply').text(valor);
		//Data mudanza porcentagem em 200d
		valor = res.market_data.max_supply;
		$('#max_supply').text(valor);
		
		//Data detalhes da moeda
		$('#details').html(res.description.en != '' ? res.description.en : 'No data found');
		//Data inserir links da moeda
		$.each(res.links, function (index, link_list) {
			var section = original_link_section.clone();
			index = index.charAt(0).toUpperCase() + index.slice(1);
			index = index.replace('_url', '').replace('_', ' ');
			$('.title_link', section).text(index);
			if (Array.isArray(link_list)) {
				var original_text_area = $('.link_text', section).clone();
				$.each(link_list, function (index, url) {
					if (url != '' && typeof url === 'string') {
						var link_text = index == 0 ? $('.link_text', section) : original_text_area.clone();
						$('a', link_text).attr('href', url);
						$('a', link_text).text(url);
						$('ul', section).append(link_text);
					}
				})
			} else if (typeof link_list === 'string') {
				var link_text = $('.link_text', section);
				if (link_list.includes('http')) {
					$('a', link_text).attr('href', link_list);
				}
				$('a', link_text).text(link_list);

			}
			if ($('li a', section).last().text() != '') {
				$('#list-links').append(section);
			}
		})
		$('.link_section').first().remove();
	})
}

//Função de processo de dados de pesquisa
function load_search() {
	$.ajax({
		method: 'GET',
		url: API_url + 'search?query=' + localStorage.getItem('coin_search')
	}).done(function (res) {
		console.log(res);
		$.each(res.coins, function (index, result) {
			// Criar novo clone da linha
			var liMedia = cloneMedia.clone();
			// Alterar campos do item
			liMedia.id = result.id;
			// Data rank
			var coin_rank = result.market_cap_rank != null ? result.market_cap_rank : "---";
			$('.rank', liMedia).text('#' + coin_rank);
			$('.rank', liMedia).prop('title', 'Rank da moeda #' + coin_rank);
			// Data imagem
			$('#image', liMedia).attr('src', result.large);
			$('#image', liMedia).prop('title', 'Logo ' + result.name);
			$('.detalhes', liMedia).prop('id', result.id);
			//Guarda localmente a id da moeda selecionada para carregar os detalhes mais tarde
			$('.detalhes').on('click', function () {
				var id_coin = this.id;
				localStorage.setItem('coin_detail', id_coin);
				window.location.href = 'detalhes.html'
			})
			// Data nome
			$('.nome', liMedia).text(result.name);
			$('.nome', liMedia).prop('title', 'Nome da moeda: ' + result.name);
			//TODO Criar função para ver se esta em lista de favoritos
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
			$('#fav_label', liMedia).prop('title', 'Inserir a moeda ' + result.name + ' a favoritos');
			// Adicionar o clone à tabela original
			$('.media-list').append(liMedia);
		})
		$('.media').first().remove();
	})
}

//Recarrega a lista de favoritos 
function reload_fav_list() {
	var fav_table = $('.fav_list')
	fav_table.innerHTML = '';
	$.each(fav_list, function (index, coin) {
		var fav_line = $('.fav_line', fav_table).clone();
		$('.rank', fav_line).text('#' + coin.market_cap_rank);
		$('.rank', fav_line).prop('title', 'Rank da moeda #' + coin.market_cap_rank);
		$('#image', fav_line).attr('src', coin.image);
		$('#image', fav_line).prop('title', 'Logo ' + coin.name);
		$('.nome', fav_line).text(coin.name);
		$('.value', fav_line).text(coin_type + coin.current_price);
		$('.value', fav_line).prop('title', 'Valor actual da moeda: ' + coin_type + coin.current_price);
		fav_table.append(fav_line);
	})
}