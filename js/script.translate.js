'use strict';

// Guarda o idioma atual da página 
var idioma = localStorage.getItem('idioma');
// Guarda o nome da página que este atualmente
var page_name = window.location.pathname.split('/').slice(-1)[0];

$(window).on('load', function () {
    console.log("Actual language: " + idioma);
    // Vai escolher o tipo de tradução a ser efetuada
    switch (idioma) {
        case 'PT':
            translate_pt();
            break;
        case 'EN':
            translate_en();
            break;
        case 'ES':
            translate_es();
            break;
        default: // Caso existir um idioma fora dos parametros ira aparecer em ingles by default
            translate_pt();
            break;
    }
})

// Tradução da página a portugues
function translate_pt() {
    // Tradução do heather a portugues
    translate_pt_heather();
    // A página a traducir em portugues
    switch (page_name) {
        case 'index.html':
            translate_pt_index();
            break;
        case 'search.html':
            translate_pt_search();
            break;
        case 'favoritos.html':
            translate_pt_fav();
            break;
        case 'detalhes.html':
            translate_pt_detalhes();
            break;
        default:
            console.log("Página não encontrada: " + page_name)
            break;
    }
    // Tradução footer a portugues
    translate_pt_footer();
}

// Tradução da página a ingles
function translate_en() {
    console.log('English traduction');
    // Traducir heather da página a ingles
    translate_en_heather();
    // A página a traducir em ingles
    switch (page_name) {
        case 'index.html':
            translate_en_index();
            break;
        case 'search.html':
            translate_en_search();
            break;
        case 'favoritos.html':
            translate_en_fav();
            break;
        case 'detalhes.html':
            translate_en_detalhes();
            break;
        default:
            console.log("Page not found: " + page_name);
            break;
    }
    // Traducir footer da página a ingles
    translate_en_footer();
}

// Tradução da página a espanhol
function translate_es() {
    console.log('Traducción al español');
    // Traducir heather da página a espanhol
    translate_es_heather();
    // A página a traducir a espanhol
    switch (page_name) {
        case 'index.html':
            translate_es_index();
            break;
        case 'search.html':
            translate_es_search();
            break;
        case 'favoritos.html':
            translate_es_fav();
            break;
        case 'detalhes.html':
            translate_es_detalhes();
            break;
        default:
            console.log("Página no encontrada: " + page_name)
            break;
    }
    // Traducir footer a espanhol
    translate_es_footer();
}

/*------Translate to Portugues------*/

// Tradução do heather a portugues
function translate_pt_heather() {
    $('#pesquisa').attr('placeholder', 'Procurar...');
    $('#pesquisa').prop('title', 'Campo para inserir o nome de uma crypto moeda que quere ver');
    $('#btSearch').prop('title', 'Procurar informação inserida');
    $('#btHome').prop('title', 'Página principal');
    $('#btFav').prop('title', 'Página de favoritos');
    $('#dropdownMenuButton1').prop('title', 'Selecione idioma');
    $('#dropdownMenuButton2').prop('title', 'Selecione Moeda');
}

// Tradução da página index a portugues
function translate_pt_index() {
    console.log('Traducindo index');
    $('.first_page').prop('title','Primeira página de moedas');
    $('.back_page').prop('title','Página de moedas anterior');
    $('.current_page').prop('title','Página de moedas atual');
    $('.next_page').prop('title','Página de moedas seguinte');
    translate_pt_table();
    $('#link_fav_table').prop('title','Ver lista de favoritos em detalhe');
    $('#link_fav_table').text('Lista de Favoritos');
    translate_pt_fav_table();
}

// Tradução da página detalhes a portugues
function translate_pt_detalhes() {
    $('#title_value').text('Mudança de valor da moeda');
    $('#div_price_24h').prop('title','Mudança de Preço nas ultimas 24h');
    $('#text_price_24h').text('Preço nas ultimas ');
    $('#div_por_24h').prop('title','Percentagem de mudança do preço nas ultimas 24 horas');
    $('#text_por_24h').text('Percentagem nas ultimas ');
    $('.text_por_d').text('Percentagem nas ultimas ');
    var string_principal = 'Percentagem de mudança do preço nos ultimos ';
    var string_final = ' días';
    $('#div_por_7d').prop('title',string_principal + '7' + string_final);
    $('#div_por_14d').prop('title',string_principal + '14' + string_final);
    $('#div_por_30d').prop('title',string_principal + '30' + string_final);
    $('#div_por_60d').prop('title',string_principal + '60' + string_final);
    $('#div_por_200d').prop('title',string_principal + '200' + string_final);
    $('#div_quant').prop('title', 'Quantidade da moeda no mercado');
    $('#text_quant').text('Quantidade da moeda no mercado: ');
    $('#div_max_quant').prop('title', 'Quantidade maximo da moeda no mercado');
    $('#text_max_quant').text('Quantidade maximo da moeda: ');
}

// Tradução da página favoritos a portugues
function translate_pt_fav() {
    translate_pt_table();
}

// Tradução da página de pesquisa a portugues
function translate_pt_search() {
    translate_pt_table();
    translate_pt_fav_table();
}

// Tradução da tabela principal
function translate_pt_table(){
    $('#heather_rank').prop('title','Ranks das moedas');
    $('#heather_rank').text('Rank');
    $('#heather_logo').prop('title','Logo das moedas');
    $('#heather_logo').text('Logo');
    $('#heather_name').prop('title','Nome das moedas');
    $('#heather_name').text('Nome');
    $('#heather_value').prop('title','Valor das moedas');
    $('#heather_value').text('Valor Atual');
    $('#heather_price').prop('title','Mudança de preço das moedas');
    $('#heather_price').text('Mudança de Preço - 24h');
    $('#heather_fav').prop('title','Moedas em favoritos');
    $('#heather_fav').text('Favoritos');
}

// Tradução da tabela favoritos
function translate_pt_fav_table(){
    $('#heather_rank_fav').prop('title','Ranks das moedas em favoritos');
    $('#heather_rank_fav').text('Rank');
    $('#heather_logo_fav').prop('title','Logo das moedas em favoritos');
    $('#heather_logo_fav').text('Logo');
    $('#heather_name_fav').prop('title','Nome das moedas em favoritos');
    $('#heather_name_fav').text('Nome');
    $('#heather_value_fav').prop('title','Valor das moedas em favoritos');
    $('#heather_value_fav').text('Valor Atual');
}

// Tradução do footer a portugues
function translate_pt_footer() {
    $('.footer #info').text('CryptoCheck é um site que tem a resposabilidade de expor as moedas do mercado do mundo crypto. A nossa principal missão é fazer é dar capacitando os utilizadores de ver a variação das moedas em tempo real, para tirar as suas próprias conclusões informativa e pesquisar informação das mesmas.');
    $('.footer #index_link').prop('title', 'Link a página principal');
    $('.footer #fav_link').prop('title', 'Link a página de favoritos');
    $('.footer #contact_names').text('Autores:');
    $('.footer #contact_mails').text('Contactos:');

}

/*------Translate to English------*/

// Tradução do heather a ingles
function translate_en_heather() {
    $('#pesquisa').attr('placeholder', 'Search...');
    $('#pesquisa').prop('title', 'Campo para inserir o nome de uma crypto moeda que quere ver');
    $('#btSearch').prop('title', 'Search info');
    $('#btHome').prop('title', 'Home page');
    $('#btFav').prop('title', 'Favorites page');
    $('#dropdownMenuButton1').prop('title', 'Select a language');
    $('#dropdownMenuButton2').prop('title', 'Select coin type');
}

// Tradução da página index a ingles
function translate_en_index() {
    $('.first_page').prop('title','First coins page');
    $('.back_page').prop('title','Last coins page');
    $('.current_page').prop('title','Actual coins page');
    $('.next_page').prop('title','Next coins page');
    translate_en_table();
    $('#link_fav_table').prop('title','Check favorites list');
    $('#link_fav_table').text('Favorites List');
    translate_en_fav_table();
}

// Tradução da página detalhes a ingles
function translate_en_detalhes() {

}

// Tradução da página favoritos a ingles
function translate_en_fav() {
    translate_en_table();
}

// Tradução da página pesquisa a ingles
function translate_en_search() {
    translate_en_table();
    translate_en_fav_table();
}

// Tradução da tabela principal a ingles
function translate_en_table(){
    $('#heather_rank').prop('title','Coins Ranks');
    $('#heather_rank').text('Rank');
    $('#heather_logo').prop('title','Coins Logo');
    $('#heather_logo').text('Logo');
    $('#heather_name').prop('title','Coins Name');
    $('#heather_name').text('Name');
    $('#heather_value').prop('title','Coins Value');
    $('#heather_value').text('Value');
    $('#heather_price').prop('title','Coin price change in last 24h');
    $('#heather_price').text('Change - 24h');
    $('#heather_fav').prop('title','Favorites Coins');
    $('#heather_fav').text('Favorites');
}

// Tradução da tabela favoritos a ingles
function translate_en_fav_table(){
    $('#heather_rank_fav').prop('title','Favorites Coins Rank');
    $('#heather_rank_fav').text('Rank');
    $('#heather_logo_fav').prop('title','Favorites Coins Logo');
    $('#heather_logo_fav').text('Logo');
    $('#heather_name_fav').prop('title','Favorites Coins Name');
    $('#heather_name_fav').text('Name');
    $('#heather_value_fav').prop('title','Favorites Coins Value');
    $('#heather_value_fav').text('Value');
}

// Tradução do footer a ingles
function translate_en_footer() {
    $('.footer #info').text('CryptoCheck its a website with the responsability to show the actual coins in the market. Our principal mision its to having the capacity to users the variation of crypto coins in real time, letting the user taking their own conclusions e search about coins info.');
    $('.footer #index_link').prop('title', 'Link home page');
    $('.footer #fav_link').prop('title', 'Link favorites page');
    $('.footer #contact_names').text('Creators:');
    $('.footer #contact_mails').text('Contacts:');

}

/*------Translate to Spanish------*/

// Tradução do heather a espanhol
function translate_es_heather() {
    $('#pesquisa').attr('placeholder', 'Buscar...');
    $('#pesquisa').prop('title', 'Campo para inserir el nombre de la moeda que quiere ver');
    $('#btSearch').prop('title', 'Buscar moedas');
    $('#btHome').prop('title', 'Página principal');
    $('#btFav').prop('title', 'Página de favoritos');
    $('#dropdownMenuButton1').prop('title', 'Selecciona un idioma');
    $('#dropdownMenuButton2').prop('title', 'Seleccione una moneda');
}

// Tradução da página index a espanhol
function translate_es_index() {
    $('.first_page').prop('title','Primera página de monedas');
    $('.back_page').prop('title','Página anterior de monedas');
    $('.current_page').prop('title','Página de monedas actual');
    $('.next_page').prop('title','Proxima página de monedas');
    translate_es_table();
    $('#link_fav_table').prop('title','Ver Página de favoritos');
    $('#link_fav_table').text('Lista de Favoritos');
    translate_es_fav_table();
}

// Tradução da página detalhes a espanhol
function translate_es_detalhes() {

}

// Tradução da página favoritos a espanhol
function translate_es_fav() {
    translate_es_table();
}

// Tradução da página pesquisa a espanhol
function translate_es_search() {
    translate_es_table();
    translate_es_fav_table();
}

// Tradução da tabela principal a espanhol
function translate_es_table(){
    $('#heather_rank').prop('title','Rank de la moneda');
    $('#heather_rank').text('Rank');
    $('#heather_logo').prop('title','Logo de la moneda');
    $('#heather_logo').text('Logo');
    $('#heather_name').prop('title','Nombre de la moneda');
    $('#heather_name').text('Nombre');
    $('#heather_value').prop('title','Valor de la moneda');
    $('#heather_value').text('Valor');
    $('#heather_price').prop('title','Fluctuación del precio de la moneda en las ultimas 24h');
    $('#heather_price').text('Fluctuación - 24h');
    $('#heather_fav').prop('title','Monedas favoritas');
    $('#heather_fav').text('Favoritos');
}

// Tradução da tabela favoritos a espanhol
function translate_es_fav_table(){
    $('#heather_rank_fav').prop('title','Ranks de las monedas en favoritos');
    $('#heather_rank_fav').text('Rank');
    $('#heather_logo_fav').prop('title','Logo de las monedas en favoritos');
    $('#heather_logo_fav').text('Logo');
    $('#heather_name_fav').prop('title','Nome de las monedas en favoritos');
    $('#heather_name_fav').text('Nombre');
    $('#heather_value_fav').prop('title','Valor de las monedas en favoritos');
    $('#heather_value_fav').text('Valor');
}

// Tradução do footer a espanhol
function translate_es_footer() {
    $('.footer #info').text('CryptoCheck es uma página web con la responsabilidad de exponer las crypto monedas del mercado. Nuestra principal misión es permitir a nuestros usuarios de ver la variación de las monedas em tiempo real, sacar sus propias conclusiones y buscar información de monedas en específico.');
    $('.footer #index_link').prop('title', 'Link página principal');
    $('.footer #fav_link').prop('title', 'Link página de favorites');
    $('.footer #contact_names').text('Creadores:');
    $('.footer #contact_mails').text('Contactos:');

}