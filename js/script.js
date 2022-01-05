'use strict';

var i = 1;
var o = 2;
var name = "Temporal Name";

/* Ex 2
	name = prompt("Nome do utilizador", "Insira o seu nome:")
	alert("Olá " + name + ", seja bem-vindo.")
	document.addEventListener("DOMContent")*/

/* Ex 3
function hideAndShowImg(image) {
	var visibility = document.getElementById(image).style.visibility;
	if (visibility == 'hidden') document.getElementById(image).style.visibility = 'visible';
	else document.getElementById(image).style.visibility = 'hidden';
}

function hideImg(image) {
	document.getElementById(image).style.height = '0px';
	document.getElementById(image).style.width = '0px';
}

function showImg(image) {
	document.getElementById(image).style.height = '400px';
	document.getElementById(image).style.width = '400px';
}*/

/* Ex4
var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = 'imgs/tree_1.jfif';

imgArray[1] = new Image();
imgArray[1].src = 'imgs/tree_2.jfif';

imgArray[2] = new Image();
imgArray[2].src = 'imgs/tree_3.jfif';

imgArray[3] = new Image();
imgArray[3].src = 'imgs/tree_4.jfif';

imgArray[4] = new Image();
imgArray[4].src = 'imgs/tree_5.jfif';

imgArray[5] = new Image();
imgArray[5].src = 'imgs/tree_6.jfif';

var currentImg = 0;
var timer;

function nextImg(element)
{
    currentImg++;
	if (currentImg > imgArray.length) currentImg = 0;
	document.getElementById('mainImg').src = imgArray[currentImg].src;
}
document.getElementById('nextButton').addEventListener('click', nextImg());

function stopImg() {
	clearInterval(timer);
}
document.getElementById('stopButton').addEventListener('click', stopImg());

function restartCicle() {
	timer = setInterval(nextImg(), 2000);
}
document.getElementById('restartButton').addEventListener('click', restartCicle());

function lastImg() {
	currentImg--;
	if (currentImg < 0) currentImg = imgArray.lenght;
	document.getElementById('mainImg').src = imgArray[currentImg].src;
	console.log(imgArray[currentImg].src);
}
document.getElementById('backButton').addEventListener('click', lastImg);*/

/* Ex5
function submitInfo()
{	console.clear();
	var Obj = document.getElementById('name');
	console.log('[' + Obj.name + ']:' + Obj.value);
	Obj = document.getElementById('endereco');
	console.log('[' + Obj.name + ']:' + Obj.value);
	Obj = document.getElementById('location');
	console.log('[' + Obj.name + ']:' + Obj.value);
	Obj = document.getElementById('cod');
	console.log('[' + Obj.name + ']:' + Obj.value);
	Obj = document.getElementById('phoneNumber');
	console.log('[' + Obj.name + ']:' + Obj.value);
	Obj = document.getElementById('email');
	console.log('[' + Obj.name + ']:' + Obj.value);
	// Raddion Buttons
	Obj = document.querySelector('input[name="radioButton"]:checked');
	console.log('[' + Obj.name + ']:' + Obj.value);
	// Text Area
	Obj = document.getElementById('textArea');
	console.log('[' + Obj.name + ']:' + Obj.value);
	
}*/