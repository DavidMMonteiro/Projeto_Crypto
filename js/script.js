'use strict';

/*------Variaveis Gerais------*/
// Guarda o tipo de moeda a ser utilizada no momento
var coin_type = '€';
// Guarda a pagina a ser disponibilizada no momento no index
var current_page = 1;
// Guarda o tipo de informação a ser procurada das moedas
var current_country = 'EUR'
// Guarda o idioma selecionado
var idioma = 'PT'

var fav_list = new Array();
//fav_list = JSON.parse(localStorage.getItem('fav_list'));

/*------Variaveis API------*/

// URL principal da API
var API_url = 'https://api.coingecko.com/api/v3/';
// URL Página CoinGecko 
var path_coingecko = "https://www.coingecko.com/en/coins/";


/*------Variaveis HTML------*/

// Guarda o nome da página que este atualmente
var page_name = window.location.pathname.split('/').slice(-1);
// Guarda a estrutura principal onde vão ser inseridos os dados
var cloneMedia = $('.media').clone();
// Guarda a estrutura principal onde vão ser inseridos os dados das moedas favoritas
var linha_fav = $('.fav_line').clone();
// Guarda a estrutura principal onde vão ser os links nos detalhes
var original_link_section = $('.link_section').clone();

/*------Função on load do página------*/
$(window).on('load', function () {
	reload_fav_list();
	set_idioma();
	set_continente()
	if (page_name == 'index.html') {
		// Carrega os dados no index
		load_index();
		//Remove o objeto original da página
		$('.media').first().remove();
	} else if (page_name == 'favoritos.html') {

	} else if (page_name == 'search.html') {
		// Carrega os dados de pesquisa
		load_search();
	} else if (page_name == 'detalhes.html') {
		// Carrega os dados dos detalhes
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

$('.idioma').on('click', function () {
	var text = $('a', this).text();
	$('.idioma-button').text(text);
	localStorage.setItem('idioma', text);
	location.reload();
})

$('.moeda').on('click', function () {
	var text = $('a', this).text();
	var moeda = text[3];
	var continente = text.replace(moeda, '');
	$('.moeda-button').text(continente + moeda);
	localStorage.setItem('continente', continente);
	localStorage.setItem('moeda', moeda);
	location.reload();
})

/*------Sistema de troca de página de criptomoedas------*/

//Carrega a primeira página de moedas
$('.first_page').on('click', function () {
	$('.first_page').text('');
	$('.current_page').text('Pág.1');
	$('.back_page').text('');
	current_page = 1;
	removeAllChildNodes(document.querySelector('.media-list'));
	load_index();
})

//Carrega a página de moedas anterior
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

//Carrega a proxima página de moedas
$('.next_page').on('click', function () {
	if (current_page < 2) {
		$('.first_page').text('«');
		$('.back_page').text('<');
	}
	$('.current_page').text('Pág.' + ++current_page);
	removeAllChildNodes(document.querySelector('.media-list'));
	load_index();
})

/*------Test Area------*/
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
				if (value > 0) {
					switch (idioma) {
						case 'PT':
							output = 'subida ';
							break;
						case 'EN':
							output = 'incrise ';
							break;
						case 'ES':
							output = 'subida ';
							break;
						default:
							output = 'incrise ';
							break;
					}
				} else {
					switch (idioma) {
						case 'PT':
							output = 'descida ';
							break;
						case 'EN':
							output = 'descent ';
							break;
						case 'ES':
							output = 'bajada ';
							break;
						default:
							output = 'descent ';
							break;
					}
				}
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
		url: API_url + 'coins/markets?vs_currency=' + current_country.toLowerCase() +
			'&order=market_cap_desc&per_page=100&page=' + current_page +
			'&sparkline=false'
	}).done(function (res) {
		console.log(res);
		$.each(res, function (index, result) {
			// Criar novo clone da lista
			var liMedia = cloneMedia.clone();
			var string_insert = '';
			// Alterar campos do item
			liMedia.id = result.id;
			$('.rank', liMedia).text('#' + result.market_cap_rank);
			$('.rank', liMedia).prop('title', 'Rank #' + result.market_cap_rank);
			$('.detalhes', liMedia).prop('id', result.id);
			// Guarda localmente a id da moeda selecionada para carregar os detalhes mais tarde 
			// e redireciona para á página de detalhes
			$('.detalhes').on('click', function () {
				var id_coin = this.id;
				localStorage.setItem('coin_detail', id_coin);
				window.location.href = 'detalhes.html'
			})
			// Carrega a imagem da moeda
			$('#image', liMedia).attr('src', result.image);
			$('#image', liMedia).prop('title', 'Logo ' + result.name);
			// Carrega os dados do nome da moeda
			$('.nome', liMedia).text(result.name);
			switch (idioma) {
				case 'PT':
					string_insert = 'Nome da moeda: ';
					break;
				case 'EN':
					string_insert = 'Coin name: ';
					break;
				case 'ES':
					string_insert = 'Nombre de la moneda: ';
					break;
				default:
					string_insert = 'Coin name: ';
					break;
			}
			$('.nome', liMedia).prop('title', string_insert + result.name);
			// Carrega os dados do valor da moeda
			$('.valor', liMedia).text(coin_type + result.current_price);
			switch (idioma) {
				case 'PT':
					string_insert = 'Valor atual: ';
					break;
				case 'EN':
					string_insert = 'Current value: ';
					break;
				case 'ES':
					string_insert = 'Valor actual: ';
					break;
				default:
					string_insert = 'Current value: ';
					break;
			}
			$('.valor', liMedia).prop('title', string_insert + coin_type + result.current_price);
			var price_change_24h = result.price_change_24h;
			$('.change24h', liMedia).text(value_state(0,price_change_24h) + coin_type);
			$('.change24h', liMedia).addClass(value_state(1,price_change_24h));
			switch (idioma) {
				case 'PT':
					string_insert = 'Valor de ' + value_state(2,price_change_24h) + 'da moeda em 24h';
					break;
				case 'EN':
					string_insert = 'Current ' + value_state(2,price_change_24h) + 'value of coin last 24h';
					break;
				case 'ES':
					string_insert = 'Valor de ' + value_state(2, price_change_24h) + ' de la moneda em las ultimas 24h';
					break;
				default:
					string_insert = 'Current ' + value_state(2,price_change_24h) + 'value of coin last 24h';
					break;
			}
			$('.change24h', liMedia).prop('title', string_insert);
			// Procesa se a moeda esta como favorita ou não
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
			switch (idioma) {
				case 'PT':
					string_insert = 'Inserir a moeda ' + result.name + ' a favoritos';
					break;
				case 'EN':
					string_insert = 'Add coin ' + result.name + ' to favorites';
					break;
				case 'ES':
					string_insert = 'Adicionar moneda ' + result.name + ' a lista de favoritos';
					break;
				default:
					string_insert = 'Add coin ' + result.name + ' to favorites';
					break;
			}
			$('#fav_label', liMedia).prop('title', string_insert);
			// Adicionar o clone à tabela original
			$('.media-list').append(liMedia);
		})
	})
}

//Função de processo de dados da página de detalhes
function load_details() {
	if (!localStorage.getItem('coin_detail')) {
		location.document = 'index.html';
	}
	$.ajax({
		method: 'GET',
		url: API_url + 'coins/' + localStorage.getItem('coin_detail')
	}).done(function (res) {
		//console.log(res);
		var string_insert = '';
		//Datos imagem
		$('#image a').attr('href', path_coingecko + res.id);;
		$('#image img').attr('src', res.image.large);
		$('#image img').attr('alt', 'Logo ' + res.name);
		switch (idioma) {
			case 'PT':
				string_insert = 'Link para a coingeck';
				break;
			case 'EN':
				string_insert = 'Link to coingeck';
				break;
			case 'ES':
				string_insert = 'Link para coingeck';
				break;
			default:
				string_insert = 'Link to coingeck';
				break;
		}
		$('#image img').attr('title', 'Logo ' + res.name + ' & ' + string_insert);
		//Nome moeda
		$('#nome').text(res.name);
		switch (idioma) {
			case 'PT':
				string_insert = 'Nome da moeda';
				break;
			case 'EN':
				string_insert = 'Coin name';
				break;
			case 'ES':
				string_insert = 'Nombre de la moeda';
				break;
			default:
				string_insert = 'Coin name';
				break;
		}
		$('#nome').prop('title', string_insert + ': ' + res.name);
		//Simbolo moeda
		$('#symbol').text(res.symbol);
		switch (idioma) {
			case 'PT':
				string_insert = 'Simbolo da moeda';
				break;
			case 'EN':
				string_insert = 'Coin symbol';
				break;
			case 'ES':
				string_insert = 'Simbolo de la moneda';
				break;
			default:
				string_insert = 'Coin symbol';
				break;
		}
		$('#symbol').prop('title', string_insert + ': ' + res.name);
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
		switch (idioma) {
			case 'PT':
				string_insert = 'Adicionar moeda ' + res.name + ' á favoritos';
				break;
			case 'EN':
				string_insert = 'Add coin ' + res.name + ' to favoritos';
				break;
			case 'ES':
				string_insert = 'Adicionar moneda ' + res.name + ' a favoritos';
				break;
			default:
				string_insert = 'Add coin ' + res.name + ' to favoritos';
				break;
		}
		$('#fav_label').prop('title', string_insert);
		//Data Rank da moeda
		$('#rank').text('Rank #' + (res.market_cap_rank != null ? res.market_cap_rank : '---'));
		$('#rank').prop('title', 'Rank #' + res.market_cap_rank);
		//Data valor da moeda
		$.each(res.market_data.current_price, function (index, preco) {
			if (index == current_country.toLowerCase()) {
				$('#price').text(coin_type + preco);
				switch (idioma) {
					case 'PT':
						string_insert = 'Preço atual da moeda: ';
						break;
					case 'EN':
						string_insert = 'Current coin price: ';
						break;
					case 'ES':
						string_insert = 'Precio actual de la moneda: ';
						break;
					default:
						string_insert = 'Current coin price: ';
						break;
				}
				$('#price').prop('title', string_insert + coin_type + preco);
			}
		})
		//Data mudanza preço em 24h
		var valor = res.market_data.price_change_24h;
		$('#change_price_24h').text(value_state(0, valor) + coin_type);
		$('#change_price_24h').addClass(value_state(1, valor));
		switch (idioma) {
			case 'PT':
				string_insert = 'Valor ' + value_state(2, valor) + 'da moeda nas ultimas 24h';
				break;
			case 'EN':
				string_insert = 'Coin value ' + value_state(2, valor) + ' last 24h';
				break;
			case 'ES':
				string_insert = 'Valor ' + value_state(2, valor) + 'de la moneda en las ultimas 24h';
				break;
			default:
				string_insert = 'Coin value ' + value_state(2, valor) + ' last 24h';
				break;
		}
		$('#change_price_24h').prop('title', string_insert);
		//Data mudanza Percentagem em 24h
		valor = res.market_data.price_change_percentage_24h;
		$('#change_por_24h').text(value_state(0, valor) + ' %');
		$('#change_por_24h').addClass(value_state(1, valor));
		switch (idioma) {
			case 'PT':
				string_insert = 'Percentagem ' + value_state(2, valor) + 'da moeda nas ultimas 24h';
				break;
			case 'EN':
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 24h';
				break;
			case 'ES':
				string_insert = 'Valor ' + value_state(2, valor) + 'de la moneda en las ultimas 24h';
				break;
			default:
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 24h';
				break;
		}
		$('#change_por_24h').prop('title', string_insert);
		//Data mudanza Percentagem em 7d
		valor = res.market_data.price_change_percentage_7d;
		$('#change_por_7d').text(value_state(0, valor) + ' %');
		$('#change_por_7d').addClass(value_state(1, valor));
		switch (idioma) {
			case 'PT':
				string_insert = 'Percentagem ' + value_state(2, valor) + 'da moeda nos ultimos 7d';
				break;
			case 'EN':
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 7d';
				break;
			case 'ES':
				string_insert = 'Valor ' + value_state(2, valor) + 'de la moneda en los ultimos 7d';
				break;
			default:
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 7d';
				break;
		}
		$('#change_por_7d').prop('title', string_insert);
		//Data mudanza Percentagem em 14d
		valor = res.market_data.price_change_percentage_14d;
		$('#change_por_14d').text(value_state(0, valor) + ' %');
		$('#change_por_14d').addClass(value_state(1, valor));
		switch (idioma) {
			case 'PT':
				string_insert = 'Percentagem ' + value_state(2, valor) + 'da moeda nos ultimos 14d';
				break;
			case 'EN':
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 14d';
				break;
			case 'ES':
				string_insert = 'Valor ' + value_state(2, valor) + 'de la moneda en los ultimos 14d';
				break;
			default:
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 14d';
				break;
		}
		$('#change_por_14d').prop('title', string_insert);
		//Data mudanza Percentagem em 30d
		valor = res.market_data.price_change_percentage_30d;
		$('#change_por_30d').text(value_state(0, valor) + ' %');
		$('#change_por_30d').addClass(value_state(1, valor));
		switch (idioma) {
			case 'PT':
				string_insert = 'Percentagem ' + value_state(2, valor) + 'da moeda nos ultimos 30d';
				break;
			case 'EN':
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 30d';
				break;
			case 'ES':
				string_insert = 'Valor ' + value_state(2, valor) + 'de la moneda en los ultimos 30d';
				break;
			default:
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 30d';
				break;
		}
		$('#change_por_30d').prop('title', string_insert);
		//Data mudanza Percentagem em 60d
		valor = res.market_data.price_change_percentage_60d;
		$('#change_por_60d').text(value_state(0, valor) + ' %');
		$('#change_por_60d').addClass(value_state(1, valor));
		switch (idioma) {
			case 'PT':
				string_insert = 'Percentagem ' + value_state(2, valor) + 'da moeda nos ultimos 60d';
				break;
			case 'EN':
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 60d';
				break;
			case 'ES':
				string_insert = 'Valor ' + value_state(2, valor) + 'de la moneda en los ultimos 60d';
				break;
			default:
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 60d';
				break;
		}
		$('#change_por_60d').prop('title', string_insert);
		//Data mudanza Percentagem em 200d
		valor = res.market_data.price_change_percentage_200d;
		$('#change_por_200d').text(value_state(0, valor) + ' %');
		$('#change_por_200d').addClass(value_state(1, valor));
		switch (idioma) {
			case 'PT':
				string_insert = 'Percentagem ' + value_state(2, valor) + 'da moeda nos ultimos 200d';
				break;
			case 'EN':
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 200d';
				break;
			case 'ES':
				string_insert = 'Valor ' + value_state(2, valor) + 'de la moneda en los ultimos 200d';
				break;
			default:
				string_insert = 'Percentage ' + value_state(2, valor) + ' last 200d';
				break;
		}
		$('#change_por_200d').prop('title', string_insert);
		//Data quantidade no mercado
		valor = res.market_data.total_supply;
		$('#total_supply').text(valor);
		//Data quantidade maxima do mercado
		valor = res.market_data.max_supply;
		$('#max_supply').text(valor);
		//Data detalhes da moeda
		$.each(res.description, function (index, description) {
			if (index == idioma.toLowerCase())
				$('#details').html(description != '' ? description : 'No data found');
		})
		//Data inserir links da moeda
		$.each(res.links, function (index, link_list) {
			var section = original_link_section.clone();
			// Procesamento de titulos
			index = index.charAt(0).toUpperCase() + index.slice(1);
			index = index.replace('_url', '').replace('_', ' ');
			$('.title_link', section).text(index);
			// Caso for um array de dados ira inserir cada link
			// Caso contrario, ira so inserir uma string
			if (Array.isArray(link_list)) {
				var original_text_area = $('.link_text', section).clone();
				$.each(link_list, function (index, url) {
					if (url != '' && typeof url === 'string') {
						var link_text = index == 0 ? $('.link_text', section) : original_text_area.clone();
						$('a', link_text).attr('href', url);
						$('a', link_text).text(url);
						$('a', link_text).prop('title', 'Link ' + url);
						$('ul', section).append(link_text);
					}
				})
			} else if (typeof link_list === 'string') {
				var link_text = $('.link_text', section);
				if (link_list.includes('http')) {
					$('a', link_text).attr('href', link_list);
					$('a', link_text).prop('title', 'Link ' + link_list);
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
	// Caso não encontrar dados de pesquisa, voltar a página principal
	if (!localStorage.getItem('coin_search')) {
		location.document = 'index.html';
	}
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

//Carrega o idioma selecionado
function set_idioma() {
	var info = localStorage.getItem('idioma')
	idioma = info == null ? 'PT' : info;
	$('.idioma-button').text(idioma);
}

//Carrega o continente e o tipo de moeda
function set_continente() {
	var continente = localStorage.getItem('continente');
	var moeda = localStorage.getItem('moeda');
	current_country = continente == null ? 'EUR' : continente;
	coin_type = moeda == null ? '€' : moeda;
	$('.moeda-button').text(current_country + coin_type);
}