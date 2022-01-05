'use strict';
// Ficha 3 Extra 1
function calcMult(){
	var value1 = document.getElementById("value1");
	console.log(value1.value)
	var value2 = document.getElementById("value2");
	var outputBox = document.getElementById("outputBox");
	outputBox.innerHTML  = (value1.value != "" && value2.value != "") ? value1.value * value2.value : "Insira valores";
}

function calcDiv() {
	var value1 = document.getElementById("value1");
	var value2 = document.getElementById("value2");
	var outputBox = document.getElementById("outputBox");
	outputBox.innerHTML  = (value1.value != "" && value2.value != "") ? (value1.value / value2.value) : "Insira valores";
}

// Ficha 3 Extra 2
function getTodayDate() {
	var today = new Date();
	var weekday = ["Segunda","Terça","Quarta","Quinta","Sexta","Sabado","Domingo"];
	var hora = (today.getHours() <= 12 ? 
		today.getHours() + "AM:" + today.getMinutes() + ":" + today.getSeconds(): 
		today.getHours()-12 + "PM:" + today.getMinutes() + ":" + today.getSeconds());
	
	console.log("Hoje é " + weekday[today.getDay() -1 ] + ". Hora atual: " + hora );
}
// Ficha 3 Extra 3
function rotativeTextRight(){
	var stringText = document.getElementById("loopTextRight");
	setInterval(
		function(){
			// Right
			var lastLetter = stringText.textContent.charAt(stringText.textContent.length - 1);
			var newText = stringText.textContent.substring(0, stringText.textContent.length - 1);
			stringText.textContent = lastLetter + newText;
			}
	, 100);
	
}
function rotativeTextLeft(){
	var stringText = document.getElementById("loopTextLeft");
	setInterval(
		function(){
			// Left 
			var firstLetter = stringText.textContent.charAt(0);
			var newText = stringText.textContent.substring(1);
			stringText.textContent = newText + firstLetter;
			}
	, 100);
	
}
window.load = rotativeTextLeft();
window.load = rotativeTextRight();

// Ficha 3 Extra 4
function createTable() {
	console.log("Criando tabela");
	var colValue = document.getElementById("colValue").value;
	var lineValue = document.getElementById("lineValue").value;
	console.log("Tamanho da tabela " + lineValue + " linhas e " + colValue + " colunas");
	var parentDiv = document.getElementById("outputTabela");
	parentDiv.innerHTML = '';
	// creação da tabela e corpo da tabela
	var tbl = document.createElement("table");

	for (var i = 0; i < lineValue; i++) {
		// creação de linha
		var row = document.createElement("tr");
		row.setAttribute("border", "1px solid black");
		
		for (var j = 0; j < colValue; j++) {
		  // creação de celula 
		  var cell = document.createElement("td");
		  cell.setAttribute("border", "1px solid black");
		  // crea texto com o lugar correspondente da celula
		  var cellText = document.createTextNode("["+i+","+j+"]");
		  // mete o texto na celula pai
		  cell.appendChild(cellText);
		  // mete a celula la linha pai
		  row.appendChild(cell);
		}
		// Mete a linha na tabela pai
		tbl.appendChild(row);
	}
	// mete a tabela no div pai correspondente
	parentDiv.appendChild(tbl);
	// tamanho dos bordes da tabela
	tbl.setAttribute("border", "1px solid black");
	tbl.setAttribute("width","100%");;
	tbl.setAttribute("textAlign","center");
}