'use strict';

var apikey = "";//TODO Get API Key
//var cloneMedia = $('.media').clone();

class moeda{
    constructor(rank, nome, valor, fav) {
        this.rank = rank;
        this.nome = nome;
        this.valor = valor;
        this.fav = fav;
    }
};

$('#btTry').mouseover(console.log("Over Button"));

$('#btTry').on('click', function (){
    console.log("Button Click");
    //var corpo_tabela = $('#corpo-tabela');
    let moedas = [new moeda(1,"Moeda 1", 20.00), new moeda(2, "Moeda 2", 15.00)];
    moedas.each(function(coin_test){
        console.log("Info Coin: \nRank:"+coin_test.rank+"\n");
        //var line = "<tr><td>"+ coin_test.rank+"</td><td>"+coin_test.nome+"</td><td>"+coin_test.valor+"</td><td>"+coin_test.fav?"T":"F"+"</td></tr>";
        //corpo_tabela.append(line);
    })
});

//Procura informação da crypto inserida
$('#btSearch').on('click', function() {

	var valuePesquisa = $('#search_info').val();
	$('.media-list').empty();
	$('.panel-title').text('Resultados da pesquisa ' 
		+ valuePesquisa);

	$.ajax({
		method: "GET",
		url: "http://www.omdbapi.com/" 
			+ "?apikey=" + apikey + "&s=" + valuePesquisa
	}).done(function(res){
		console.log(res);

		$.each(res.Search, function(index, result){
			// Criar novo clone
			var liMedia = cloneMedia.clone();
			// Alterar no clone
			$('#image', liMedia).attr('src', result.Poster);
			$('.title', liMedia).text(result.Title)
			$('.ano', liMedia).text(result.Year)
			$('a', liMedia).attr('href', 
				"https://www.imdb.com/title/" + result.imdbID)
			// Adicionar o clone à tabela original
			$('.media-list').append(liMedia);
		})
	})
})