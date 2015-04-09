/*
========================================================
======				comment: my plygins		========
========================================================
*/
(function( $ ){
	function offset(el){
		return el.getBoundingClientRect();
	}


	$.fn.makeSlider = function(max_step,active_area){
		max_step = max_step || 10; //чим крок більший тим швидкість слайдера більша  !!!
		active_area = active_area || 300; //ширина площі на якій слайдер активний

		$(this).on("mousemove", function(event){define_mouse_pos(event)} );
		$(this).on("mouseout", function(event){slider_stop(true, event)} );
		
		var	$this = $(this).children(),
			parent_offset=offset($this.parent()[0]),
			offset_width = ($this.width()-parent_offset.right),
			cur_left,
			slider_move,
			max_step,
			active_area;
		function slider_stop(mouseout, e){
			e = e || window.event;

			if(!mouseout || (mouseout && (e.clientX < parent_offset.left || e.clientY < parent_offset.top || e.clientX > parent_offset.right || e.clientY > parent_offset.bottom))){

				clearInterval(slider_move);
			}
		}


		function define_mouse_pos(e){
			clearInterval(slider_move);
			e = e || window.event;

			var speed,destination,rel_clientX;

			rel_clientX = e.clientX - parent_offset.left;
			cur_left = parseInt( $this.css('left') ) ;
			if(rel_clientX < active_area){
				step = ((active_area-rel_clientX)/active_area)*max_step;
				destination = '+';

				left_hand = -offset_width;
				right_hand = -step;
			}
			else if(rel_clientX > parent_offset.right-active_area){
				step = ((active_area-(parent_offset.right-rel_clientX) )/active_area)*max_step;
				destination = '-';

				left_hand = -offset_width+step;
				right_hand = 0;
			}
			else{
				slider_stop(false, event);
				return;
			}
			slider_move = setInterval(function(){
				if(left_hand <= cur_left && cur_left <=right_hand){
					cur_left = eval(cur_left +destination+ step);
					$this.css('left',cur_left+"px")
				}
				else{
					clearInterval(slider_move);
				}
			},1)
		}
	}
})(jQuery)



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

function setSize(){
	height = $('body').css('width');
	navHeight = parseInt(height)/20;
	var sliderHeight = $('#slider img').css('height');
	$('#slider').css('height',sliderHeight);

	// document css
	$('#wrap').css('height',height);
	$('#nav-panel').css('height',navHeight);

	// Cube css styles
	$('.under').css('transform','translate3d(0,0,-'+height+') rotateY(180deg)')
	$('.bottom').css('transform','translate3d(0,0,-'+height+') rotateX(-90deg)')
	$('.top').css('transform','translate3d(0,0,-'+height+') rotateX(90deg)')

};
setSize();


/*
========================================================
======				NAVIGATION	  				========
========================================================
*/
var clickBar = function(origin1,origin2,distance,direct,degNum){
	// nav button style
	$('nav > div').removeClass('navBlockActive');
	$($this).addClass('navBlockActive');

	// cube rotating
	if( $(document).scrollTop() != 0 ){
		var delay = 500;
		scrollTop();
	}else{
		delay = 0;
	}
	setTimeout(function(){
		// setVariables
		var parentIndex =  $($this).index();

		var setNewCubePos = function(){
			$('#cont').css('transform-origin','' + origin1 + origin2 + '').css('transform','translate3d(0,'+navHeight+'px,'+distance+')rotate' +direct+ '(' + degNum + ')');
		}

		// generalFunctionCode
		if( $('#cont').hasClass('contHidden')){

			$($this).addClass('buttonActive');

			$('.home').addClass('homeHidden').delay(300).fadeOut();
			$('#wrap').css('background','rgb(15,89,182)')
			$('#cont').css('display','block');
			setTimeout(function(){
				$('#cont').removeClass('contHidden');
			},100);
			setTimeout(function(){
				setNewCubePos();
			},1100);//must be 10000
		}
		else if( $($this).hasClass('buttonActive') ){
			return false;
		}
		else{
			$('.mainNav > div').removeClass('buttonActive');
			$($this).addClass('buttonActive');

			$('#cont').css('transform-origin','' + origin1 + origin2 + '').css('transform','translate3d(0,-300vh,-600vh) rotate' +direct+ '(' + degNum + ')');
			$('#cont > li').css('box-shadow','inset 0 0 3vh 1vh rgba(40,45,51,1)');

			setTimeout(function(){
				setNewCubePos();
			},1000)
		}
	},delay)
}

// setFunctionForNavButton
$('.mainNav >div:nth-child(1)').click(function(){$this = this; clickBar('50%','50%', 0, '','0deg')});
$('.mainNav >div:nth-child(2)').click(function(){$this = this; clickBar('100%','0%', '-'+height+'', 'Y','90deg')});
$('.mainNav >div:nth-child(3)').click(function(){$this = this; clickBar('0%','0%', '-'+height+'', 'Y','-90deg')});
$('.mainNav >div:nth-child(4)').click(function(){$this = this; clickBar('0%','0%', '-'+height+'', 'X','90deg')});
$('.mainNav >div:nth-child(5)').click(function(){$this = this; clickBar('0%','100%', '-'+height+'', 'X','-90deg')});
$('.mainNav >div:nth-child(6)').click(function(){$this = this; clickBar('50%','0%', '-'+height+'', 'Y','-180deg')});
// $('nav > div:nth-child(2)').click();

$('#cont > li').mouseover(function(){
	$(this).css('box-shadow','inset 0 0 1vh 0 rgba(40,45,51,1)');
})

$('.mainNav .ctg > div').click(function(){
	var elemIndex = $(this).index();
	var parentIndex = $(this).parent().parent().index();

	$('#cont li > div').removeClass('sideActive');
	$('#cont li:eq('+parentIndex+') > div:eq('+elemIndex+')').addClass('sideActive');
})
$('#cont li > div:nth-child(1)').addClass('sideActive');

function scrollTop(){
	$('body,html').animate({scrollTop:0}, 800);
}
$('#logo').click(function(){
	if( $(document).scrollTop() != 0 ){
		var delay = 700;
		scrollTop();
	}else{
		delay = 0;
	}
	setTimeout(function(){
		$('.home').css('display','block')
		$('#cont').addClass('contHidden');
		$('#cont > li').removeClass('contLiActive')
		$('nav > div').removeClass('navBlockActive');
		$('#wrap').css('background','none')
		setTimeout(function(){
			$('#cont').css('display','none').css('transform','translate3d(0,-600vh,-2000vh)');
			$('.home').removeClass('homeHidden');
		},700)
	},delay)
})
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

$('#teach .third-level').wrapInner('<div id="third-level-body"></div>').makeSlider();

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
======				google maps 				========
========================================================
*/
// var map;
// function initialize() {
// 	var myLatlng = new google.maps.LatLng(48.9215, 24.715671);
// 	var mapOptions = {
// 		zoom: 18,
//   		center: myLatlng,
//   		scrollwheel: false
//   	};
//  	var map = new google.maps.Map(document.getElementById('google-map'),mapOptions);
//  	var marker = new google.maps.Marker({
//  		position: myLatlng,
//  		map: map,
//  	});
// }
// google.maps.event.addDomListener(window, 'load', initialize);
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