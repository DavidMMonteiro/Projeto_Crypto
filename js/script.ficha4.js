'use strict';

// Ex 1
$('span').html('Programação Web - Cliente');


// Ex 2
$('#button_hide_show').click(function(){
	if( $('#profile_pic').css('visibility') == 'hidden') 
		$('#profile_pic').css('visibility','visible');
	 else 
		$('#profile_pic').css('visibility','hidden');
});


$('#button_over_hide').mouseover(function(){
	//$('#profile_pic').css('display', 'none')
	$('#profile_pic').height('0px').width('0px');
});

$('#button_over_show').mouseover(function(){
	//$('#profile_pic').css('display', 'inline-block')
	$('#profile_pic').height('100px').width('100px');
});

// Ex3

var imgArray = new Array(6);

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

$('#nextButton').on('click',nextImg);

$('#backButton').on('click',backImg);

$('#restartButton').on('click',start);

$('#stopButton').on('click',stop);


$('document').ready(stop);

function nextImg(){
    currentImg++;
	if (currentImg >= imgArray.length) currentImg = 0;
	$('#mainImg').attr("src",imgArray[currentImg].src);
}

function backImg() {
	currentImg--;
	if (currentImg < 0) currentImg = imgArray.length - 1;
	$('#mainImg').attr("src",imgArray[currentImg].src);
}

function start(){
	timer = setInterval(nextImg(), 1000);
}

function stop() {
	clearInterval(timer);
}

