'use strict';

var idioma = localStorage.getItem('idioma');
// Guarda o nome da página que este atualmente
var page_name = window.location.pathname.split('/').slice(-1)[0];


$(window).on('load', function () {
    console.log("Actual language: " + idioma);
    // Vai escolher o tipo de tradução a ser efetuada
    switch (idioma) {
        case 'PT':
            console.log('Traducindo ao portugues');
            // Tradução do heather
            translate_pt_heather();
            // A página a traducir
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
            // Tradução footer
            translate_pt_footer();
            break;
        case 'EN':
            console.log('English traduction');
            // A página a traducir
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
            break;
        case 'ES':            
            console.log('Traducción al español');
            // A página a traducir
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
            break;
        // Caso existir um idioma fora dos parametros ira aparecer em ingles por default
        default:
            // A página a traducir
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
                    console.log("Page not found")
                    break;
            }
            break;
    }
})

/*------Translate to Portugues------*/

function translate_pt_heather(){
    $('#pesquisa').attr('placeholder','Procurar...');
    $('#pesquisa').prop('title','Campo para inserir o nome de uma crypto moeda que quere ver');
    $('#btSearch').prop('title','Procurar informação inserida');
    $('#btHome').prop('title','Página principal');
    $('#btFav').prop('title','Página de favoritos');
    $('#dropdownMenuButton1').prop('title','Selecione idioma');
    $('#dropdownMenuButton2').prop('title','Selecione Moeda');
}

function translate_pt_index() {
    console.log('Traducindo index');
}

function translate_pt_detalhes() {

}

function translate_pt_fav() {

}

function translate_pt_search() {

}

function translate_pt_footer(){
   $('.footer #info').text('CryptoCheck é um site que tem a resposabilidade de expor as moedas do mercado do mundo crypto. A nossa principal missão é fazer é dar capacitando os utilizadores de ver a variação das moedas em tempo real, para tirar as suas próprias conclusões informativa e pesquisar informação das mesmas.'); 
   $('.footer #index_link').prop('title','Link a página principal');
   $('.footer #fav_link').prop('title','Link a página de favoritos');
   $('.footer #contact_names').text('Autores:');
   $('.footer #contact_mails').text('Contactos:');

}


/*------Translate to English------*/

function translate_en_index() {

}

function translate_en_detalhes() {

}

function translate_en_fav() {

}

function translate_en_search() {

}

/*------Translate to Spanish------*/

function translate_es_index() {

}

function translate_es_detalhes() {

}

function translate_es_fav() {

}

function translate_es_search() {

}