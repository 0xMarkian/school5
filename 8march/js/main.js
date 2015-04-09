(function( $ ) {
					// appeceAnim - appearance animation
	$.fn.appeceAnim = function(property,type,transition) {
		var el = this;
		var axis = (property == 'up' || property == 'down') ? 'top' : 'left'; //main axis for animation;
		var elStyle = {
			coord: parseInt( el.css(axis) ),
			height: parseInt( el.css('height') ),
			opacity: Math.round( el.css('opacity') ),
			display: el.css('display'),
		};
		transition = transition || 600; // determinate the speed of animation
		type = (type=='show') ? 1 : (type=='hide') ? 0 : !elStyle.opacity;
		var direct =(property == 'up' && type =='show' || property =='left' && type == 'show') ? '+' : '-';

		//change the direction of animation
		elStyle.coord = elStyle.coord ? elStyle.coord : 0;
		var fade = (elStyle.display == 'block') ? true : false;

		//offset of animated block
		var offsetNum = (elStyle.height < 150) ? elStyle.height/2.5 : elStyle.height/4;// Coord of offset
		var offsetCoord = (elStyle.coord) ? eval(elStyle.coord +direct+ offsetNum) : eval('0' +direct+ offsetNum);

		// determinate global animation variables
		var delay1,delay2,
			valueOpacity,
			fadeIn,fadeOut;
		if(type){
			//show element
			delay1 = 0;
			delay2 = 10;
			valueOpacity = 1;
			pos1 = offsetCoord;
			pos2 = elStyle.coord;
			fadeIn = true;
		}
		else{
			//hide element
			delay1 = 600;
			delay2 = 0;
			valueOpacity = 0;
			pos1 = elStyle.coord;
			pos2 = offsetCoord;
			fadeOut = true;
		}
		var animObj1 = {opacity:valueOpacity};
		animObj1[axis] = pos2;

		var animObj2 = {opacity:0};
		animObj2[axis] = pos1;

		setTimeout(function showElem(){
			fadeIn ? el.fadeIn(0) : 0;
			el.animate(animObj2,0);
		},delay1)

		setTimeout(function hideElem(){
			el.animate(animObj1,transition);
			fadeOut ? el.fadeOut(0) : 0;
		},delay2);
	};
})(jQuery);

function setSize(){
	height = parseInt( $('body').css('width') );
	$('.wrap-music').css('height',height/2+'px')
};
(function(){
	setSize();
	// global variables
	var changeSide = false,
		$this = $('.wrap-cont > div'),
		index;

	// global function
	function offset(el){
		return el.getBoundingClientRect();
	}

	$('#to-musicPage').click(function(){
		$('body > *').fadeOut();
		$('#musicPage').delay(500).fadeIn(2000);
		setTimeout(function(){
			$('.wrap-text h1').appeceAnim('up');
			setTimeout(function(){
				$('.wrap-text p').appeceAnim('up');
			},1000);
			setTimeout(function(){
				$('#main').appeceAnim('down')
				$('.wrap-text').appeceAnim('left','hide'); 
			},2000)	
		},3000)
	})
	// $('#to-musicPage').click();


	$('nav > div').click(function(){
		$('nav').appeceAnim('up');
		changeSide = true;

		index = $(this).index();
		$this.css('display','none').css('top','0').css('opacity','0');
		$this.eq(index).css('display','block');

		setTimeout(function(){
			$('.wrap-cont > div:eq('+index+')').appeceAnim('left');
		},500)
		var play = $this.eq(index).find('audio')[0];
		if(play){
			$this.eq(index).find('audio')[0].play();
		}
	});

	$('#nav-button,.descrip').on('click',function navToogle(){
		$('#nav-button').off('click');
		setTimeout(function(){
			$('#nav-button').on('click',navToogle);
		},601);

		if(changeSide){
			$('nav').appeceAnim('up','show');
			$('wrap-cont > div').css('top','0').css('opacity','0');
			$('.wrap-cont > div:eq('+index+')').appeceAnim('down');

			var load = $this.eq(index).find('audio')[0];
			if(load){
				$this.eq(index).find('audio')[0].load();
			}
			changeSide = false;
			index = false;

			// stop Video player
			for(var i=1;i<=playersMass.length;i++){
				if( playersMass[i] ) playersMass[i].stopVideo();
			}
		}
		else{
			return;
		}
	})
	// $('body').click(function(){
	// 	function launchFullScreen(element) {
	// 		if(element.requestFullScreen) {
	// 			element.requestFullScreen();
	// 		} else if(element.mozRequestFullScreen) {
	// 		element.mozRequestFullScreen();
	// 		} else if(element.webkitRequestFullScreen) {
	// 		element.webkitRequestFullScreen();
	// 		}
	// 	}
	// 	launchFullScreen(this)
	// })
})();





