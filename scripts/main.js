// 'use strict';
/*
========================================================
======				comment: my plygins		========
========================================================
*/
(function( $ ){
	//function addImg
	$.fn.addImg = function(nameImg,src,onload){
		var imgObj = {};
		imgObj[nameImg] = new Image();
		imgObj[nameImg].src = src;
		$(this).attr('src',src);
		imgObj[nameImg].onload = onload;
	}
})(jQuery)

function id(id){
	return document.getElementById(id);
}
/*
 ========================================================
 ======				const css styles			========
 ========================================================
 */
						 // global variables
						var height,
							$this,
							deferMentTimeout,
							navHeight;
						var LGV = {
						}//LGV - less global vars
function setSize(){
	height = document.documentElement.clientWidth;
	navHeight = height/20;
	height = height+'px'

	// document css
	id('wrap').style.height=height;
	id('nav-panel').style.height= (parseInt(height)/20)+'px';
	// Cube css styles
	$('.under').css('transform','translate3d(0,0,-'+height+') rotateY(180deg)');
	$('.bottom').css('transform','translate3d(0,0,-'+height+') rotateX(-90deg)');
	$('.top').css('transform','translate3d(0,0,-'+height+') rotateX(90deg)');

};
setSize();



/*
========================================================
======				NAVIGATION	  				========
========================================================
*/

var navPanel = document.getElementById('nav-panel');

function scrollTop(speed){
	speed = speed || 800;
	$('body,html').animate({scrollTop:0}, speed);
}

/**
 * [clickBar description]
 * @param  {object} cBut     clicked button
 * @param  {string} origin1  [description]
 * @param  {string} origin2  [description]
 * @param  {string} distance [description]
 * @param  {string} direct   [description]
 * @param  {string} degNum   [description]
 * @return {[type]}          [description]
 */
var clickBar = function(cBut,origin1,origin2,distance,direct,degNum){
	/*declare function's main variables*/
	var cube3d, //conteiner for not home page
		parentIndex,
		parentEl,
		parentButtonActive,
		isCtgLevelButton, //ctg - category
		delayForScroll; //variables that define delay for scrolling to top if that needed

	if( !$(cBut).hasClass('buttonActive') ){


		/*set active category on cube's side*/
		function setCtgSideActive(){//set active category on cube's side
			$(parentEl).addClass('buttonActive');
			parentIndex = $(parentEl).index();
			var elemIndex = $(cBut).index();
		
			cont3d.querySelector('li:nth-child('+(parentIndex+1)+') > div:nth-child('+(elemIndex+1)+')').className='ctgSideActive';
		}
		function setDefaultCtgSideActive(){
			parentIndex =  $(cBut).index();//index of high level button
			//set active side by default
			cont3d.querySelector('li:nth-child('+(parentIndex+1)+') > div:nth-child(1)').className='ctgSideActive';
		}

		/*scrolling and delay*/
		function scrollTopIfNeedAndSetDelay(){
			if( $(document).scrollTop() > 30 ){
				delayForScroll = 500;scrollTop();
			}else delayForScroll = 0;
		}

		/*define function for cube rotation*/
		function setNewCubePos(){
			$(cont3d).css('transform-origin',origin1 + origin2).css('transform','translate3d(0,'+navHeight+'px,'+distance+')rotate' +direct+ '(' + degNum + ')');
		}
		function setSmallCube(){
			$(cont3d).css('transform-origin','' + origin1 + origin2 + '').css('transform','translate3d(0,-300vh,-600vh) rotate' +direct+ '(' + degNum + ')');
		}
		function toNHPMove(){//NHP - Not Home Pages 
			$('.home').addClass('homeHidden').delay(300).fadeOut();
			id('wrap').style.background='rgb(15,89,182)'
			cont3d.style.display='block';
			setTimeout(function(){
				$(cont3d).removeClass('contHidden').css('transform','translate3d(0,-600vh,-2000vh)');//smallCube
			},100);
			setTimeout(function(){
				setNewCubePos();
			},1100);//must be 11000
		}
		
		function toHPMove(){//HP - Home Page
			$(cont3d).addClass('contHidden');
			id('wrap').style.background = ''
			$('.home').css('display','block')
			setTimeout(function(){
				cont3d.style.display='none';
				$('.home').removeClass('homeHidden');
			},700)
		}

		/*== main move ==*/
		cube3d = document.getElementById('cont3d')
		isCtgLevelButton = cBut.parentElement.className === 'ctg';
		if(isCtgLevelButton){
			parentEl = cBut.parentElement.parentElement;
			parentButtonActive = parentEl.className === 'buttonActive' ? true:false;
			//check whether this side of cube has already selected
		}

		$('.mainNav-wrap div').removeClass('buttonActive');
		$('#cont3d li > div').removeClass('ctgSideActive');
		cBut.classList.add('buttonActive')

		//section where active category of cube side define
		if(isCtgLevelButton){
			//тут повинно бути 2 однакових if так як ключову роль грає порядок виклику
			setCtgSideActive();
			if(parentButtonActive) {return};
		}
		else setDefaultCtgSideActive();

		scrollTopIfNeedAndSetDelay();

		setTimeout(function(){
			// generalFunctionCode
			if(cBut.id === 'logo') toHPMove();
			else if( $('#cont3d').hasClass('contHidden') ) toNHPMove();
			else{
				$('#cont3d > li').removeClass('nonShadow');

				setSmallCube();

				setTimeout(function(){
					setNewCubePos();
				},700)
			}
		},delayForScroll)
	}
};
var links = [
	[,'50%','50%', 0, '','0deg'],
	[,'100%','0%', '-'+height+'', 'Y','90deg'],
	[,'0%','0%', '-'+height+'', 'Y','-90deg'],
	[,'0%','0%', '-'+height+'', 'X','90deg'],
	[,'0%','100%', '-'+height+'', 'X','-90deg'],
	[,'50%','0%', '-'+height+'', 'Y','-180deg'],
];

var updatestate = function(needScroll){
	var hash, cBut,regExp;
	regExp = /\w+/i;
	hash =  location.hash.match(regExp);
	if(location.hash === '' || location.hash === '# '){
		//to Home Page Move
		if(!needScroll) return
		cBut = document.getElementById('logo');
		clickBar(cBut);
	}
	else{
		var index;
		// detect which level button was clicked
		if(hash == location.hash.slice(1)) {
			cBut = document.querySelector('#mainNav > div[data-href='+hash+']');
			index = $(cBut).index();
		}
		else{
			var parentCBut = document.querySelector('#mainNav > div[data-href='+hash+']');
			cBut = parentCBut.querySelector('.ctg > div[data-href="'+location.hash.slice(1)+'"]');
			index = $(parentCBut).index();
		}
		links[index][0] = cBut;//add clicked Button to needed array
		clickBar.apply('', links[index]);// launch main function with needed arguments
	}
};
updatestate(false);
window.addEventListener('hashchange',updatestate)


navPanel.addEventListener('click',function(e){
	e = e || window.event;
	var hash, cBut,parentIndex;
	cBut = e.target;
	while(cBut !== document.body && !hash){
		hash = cBut.getAttribute('data-href');		
		cBut = cBut.parentNode;
	}
	location.hash = hash;
})


$('#cont3d > li').mouseover(function(){
	$(this).addClass('nonShadow');
});


/*
========================================================
======				EXPRESS AREA				========
========================================================
*/
var getRandom = function(num){
	return Math.floor(Math.random()*num);
};

// =============select expres======================
var expresSelect = function(){
	var random = getRandom(2);
	$('.expres:eq('+random+')').css('display','block').addClass('expres-active')
}();

// ============expres flip====================
// nextFlipping
$('#next-arrow').click(function(){
	var classExpres = $('.expres-active');

	if($('.expres-active').is(':last-child')){
		var classExpresNext = $('.expres').first();
	}
	else{
		var classExpresNext = classExpres.next()
	}

	classExpresNext.css('display','block').addClass('expres-forward');
	setTimeout(function(){
		classExpresNext.removeClass('expres-forward').addClass('expres-active')
	},200);

	classExpres.addClass('expres-back').removeClass('expres-active');
	setTimeout(function(){
		classExpres.removeClass('expres-back').css('display','none');
	},300)
});
// prevFlipping
$('#prev-arrow').click(function(){
	var classExpres = $('.expres-active');

	if($('.expres-active').is(':first-child')){
		var classExpresPrev = $('.expres').last();
	}
	else{
		var classExpresPrev = classExpres.prev()
	}

	classExpresPrev.css('display','block').addClass('expres-back');
	setTimeout(function(){
		classExpresPrev.removeClass('expres-back').addClass('expres-active')
	},200);

	classExpres.addClass('expres-forward').removeClass('expres-active');
	setTimeout(function(){
		classExpres.removeClass('expres-forward').css('display','none');
	},300)
})
$('footer #arrow').click(function(){scrollTop()})

/*
========================================================
======				teach area hover			========
========================================================
*/
var block3dMouseOver = function(classElem,classHover){
	$('.'+classElem).removeClass(classHover);

	deferMentTimeout = setTimeout(function(){
		$($this).addClass(classHover);

		// special styles for element if first-level
		if( $($this).parent('.first-level').hasClass('first-level') ){
			$('.line').addClass('lineHover');
			$('.block-area .first-level .teach-circle').css('left','0').css('margin','0 auto');
		};

	},300)
}
var block3dMouseOut = function(classElem,classHover,standardWidth){
	clearTimeout(deferMentTimeout);
	var widthHover = $('.'+classHover).css('width');
	var widthNormal = ''+document.documentElement.clientWidth/6.55+'px';
	if(widthHover >= widthNormal){
		$($this).removeClass(classHover);
		$('.line').removeClass('lineHover');
	}else{
		setTimeout(function(){
			$($this).removeClass(classHover)
			$('.line').removeClass('lineHover');
		},300);
	}
}
$('.teach-circle').hover(function(){
	$this = this; block3dMouseOver('teach-circle','teach-circleHover')},
function(){
	$this = this; block3dMouseOut('teach-circle','teach-circleHover')
})

$('#teach .third-level').wrapInner('<div id="third-level-body"></div>')
document.querySelector('#teach .third-level').makeSlider()


/*
========================================================
======				if the page is scrolled		========
========================================================
*/
$(window).scroll( function(){
    function animElement(myElem){
        $(myElem).each(function(){
    		var posObject = $(myElem).offset().top;
    		var bottomOfWindow = $(document).scrollTop() + $(window).height();
        		if( bottomOfWindow >= posObject ){
        			$(this).css('opacity','1').css('transform','none');
       		 	}
        		else{
        			$(this).css('opacity','0').css('transform','scale(.5,.2)');
        		}
      	  	});
    }
    animElement( $('#teach .first-level .teach-circle') );
    animElement( $('#teach .second-level .teach-circle') );
    animElement( $('#teach .third-level .teach-circle') );
    animElement( $('#contact .method-communicate > div') );

});




/*
========================================================
======				PAGE ABOUT				========
========================================================
*/

$('.about-nav > div').bind('click',function aboutNavClick(){
		$('.about-nav > div').unbind('click')
		setTimeout(function(){
			$('.about-nav > div').bind('click', aboutNavClick)
		},1000)
		var elemIndex =  $(this).index();
		$('.about-category > div').fadeOut(1000)
		$('.about-category > div:eq(' + elemIndex + ')').fadeIn(1000)
});

$('.best-pupil').hover(function(){
	$this = this; block3dMouseOver('best-pupil','best-pupilHover');},
function(){
	$this = this; block3dMouseOut('best-pupil','best-pupilHover');
})


// /*
// ========================================================
// ======				google maps 				========
// ========================================================
// */
// var map;
// function initialize() {
// 	var myLatlng = new google.maps.LatLng(48.9215, 24.715671);
// 	var mapOptions = {
// 		zoom: 16,
//   		center: myLatlng,
//   		scrollwheel: false
//   	};
//  	var map = new google.maps.Map(document.getElementById('google-map'),mapOptions);
//  	var marker = new google.maps.Marker({
//  		position: myLatlng,
//  		map: map,
//  		icon: 'img/icon/marker.png'
//  	});
// }
// google.maps.event.addDomListener(window, 'load', initialize);

// /*
// ========================================================
// ======				comment: Google Analytics   ========
// ========================================================
// */
// (function(i,s,o,g,r,a,m){
// 	i['GoogleAnalyticsObject']=r;
// 	i[r]=i[r] || function(){
// 		(i[r].q=i[r].q ||[]).push(arguments)
// 	},i[r].l = 1*new Date();
// 	a=s.createElement(o),
// 	m=s.getElementsByTagName(o)[0];
// 	a.async=1;
// 	a.src=g;
// 	m.parentNode.insertBefore(a,m)
// })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

// ga('create', 'UA-62902606-1', 'auto');
// ga('send', 'pageview');
// 
