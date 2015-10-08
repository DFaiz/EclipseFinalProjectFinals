    //////////////////////////////////////////////////////////////////////////////////////////////  start of fixed header
  $(document).ready(function(){     
                      //for menu to be fixed on scrolling
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ($(window).scrollTop() > navHeight) {
			 	
				 $('nav.menu').addClass('fixed');
			 }
			 else {
				 $('nav.menu').removeClass('fixed');
			 }
		});
	});
	

	$(document).ready(function(){                         //for search icon to be fixed on scrolling
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ($(window).scrollTop() > navHeight) {
				 $('div.icon').addClass('fixed2');
			 }
			 else {
				 $('div.icon').removeClass('fixed2');
			 }
		});
	});
	
    $(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ($(window).scrollTop() > navHeight) {
				 $('div.move1').addClass('fixed13');
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ( ($(window).scrollTop() > navHeight - 800 ) ) {
				 $('div.move1').fadeIn();
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ($(window).scrollTop() > navHeight ) {
				 $('div.move4').addClass('fixed8');
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ( ($(window).scrollTop() > navHeight) ) {
				 $('div.move4').fadeIn();
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ($(window).scrollTop() > navHeight) {
				 
				 $('div.move2').addClass('fixed9');
				 
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ( ($(window).scrollTop() > navHeight - 800 ) ) {
				 $('div.move2').fadeIn();
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ($(window).scrollTop() > navHeight) {
				 
				 $('div.move3').addClass('fixed10');
				 
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ( ($(window).scrollTop() > navHeight - 1800 ) ) {
				 $('div.move3').fadeIn();
			 }
			 
		});
	});
	
	///////////////////////////////////////////////////////////roni///////////////////////////////////////
	/*$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ( ($(window).scrollTop() > navHeight - 1000 ) ) {
				 $('div.story').fadeIn(1000);
			 }
			 
		});
	});
	*/
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ( ($(window).scrollTop() > navHeight - 1000) ) {
				 $('div.information').fadeIn(1000);
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( window ).height() ;
			 if ( ($(window).scrollTop() > navHeight - 50) ) {
				 $('div.allImg_headline').fadeIn(2050);
			 }
			 
		});
	});
	
	$(document).ready(function(){
	$("div.move1").on('mouseleave',function(){
              $("a.hidden_a").fadeOut("fast");
});
});

$(document).ready(function(){
	$("div.move1").on('mouseover',function(){
         $("a.hidden_a").fadeIn("slow");
});
});

$(document).ready(function(){
	$("div.move2").on('mouseleave',function(){
              $("a.hidden_a2").fadeOut("fast");
});
});

$(document).ready(function(){
	$("div.move2").on('mouseover',function(){
         $("a.hidden_a2").fadeIn("slow");
});
});

$(document).ready(function(){
	$("div.move3").on('mouseleave',function(){
              $("a.hidden_a3").fadeOut("fast");
});
});

$(document).ready(function(){
	$("div.move3").on('mouseover',function(){
         $("a.hidden_a3").fadeIn("slow");
});
});

$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 300;
			 if ($(window).scrollTop() > navHeight) {
				 $('h2.avatarHeadline1').addClass('ltr1');
			 }
			 
		});
	});
	/*
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 300 ;
			 if ($(window).scrollTop() > navHeight) {
				 $('h2.avatarHeadline2').addClass('rtl1');
			 }
			 
		});
	});
	
*/
$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 300 ;
			 if ( ($(window).scrollTop() > navHeight - 80 ) ) {
				 $('h2.avatarHeadline1').fadeIn();
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 300 ;
			 if ( ($(window).scrollTop() > navHeight - 80 ) ) {
				 $('h2.avatarHeadline2').fadeIn();
			 }
			 
		});
	});

	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 300  ;
			 if ( ($(window).scrollTop() > navHeight - 80 ) ) {
				 $('div.avatarModel').fadeIn(4000);
			 }
			 
		});
	});   
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 650 ;
			 if ( ($(window).scrollTop() > navHeight - 50 ) ) {
				 $('div.category1').fadeIn();
				 $('div.category2').fadeIn();
				 $('div.category3').fadeIn();
			 }
			
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 700 ;
			 if ( ($(window).scrollTop() > navHeight - 50 ) ) {
				 $('div.category4').fadeIn();
				 $('div.category5').fadeIn();
				 $('div.category6').fadeIn();
			 }
			 
		});
	});
	
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.mini_wrapper' ).height() + 750 ;
			 if ( ($(window).scrollTop() > navHeight - 50 ) ) {
				 $('div.category7').fadeIn();
				 $('div.category8').fadeIn();
				 $('div.category9').fadeIn();
			 }
			 
		});
	});
		
	*/
	///////////////////////  Leading Board  //////////////////////////////////////////////////////////////
	$(document).ready(function(){
	   $(window).bind('scroll', function() {
	   var navHeight = $( 'div.background5' ).height() + $( 'div.header' ).height() + $('div.headlineHeader').height() + $('div.girl').height() + $( 'div.mini_wrapper' ).height() + $( 'div.background4' ).height() ;
			 if ( ($(window).scrollTop() > navHeight  ) ) {
				 $('section.ratingsFrame').fadeIn(500);
				  $('section.ratingsFrame').addClass('animateRatings');
				  $('section.topTenHeadline').fadeIn(10000);
				  $('section.topTenList').fadeIn(10000);
			 }
			
		});
	});
		/////////////////////////////////////////////////////////////////////////////////////////
	
	/* MENU - */
/* $(document).ready - אומר שברגע העלת האתר הפקודות האלה מתבצעות */

	$(document).ready(function(){
	   $('div.move1').on('click', function() {
				 $('div.backScreen').fadeIn("fast");
				 $('div.putImage').css({"background-image":"url(./images/metor2.png)"});
				 $('div.putImage').fadeIn("fast");
				 $('div.exit').fadeIn("fast");
		});
	});
	
	$(document).ready(function(){
	   $('div.move2').on('click', function() {
				 $('div.backScreen').fadeIn("fast");
				 $('div.putImage').css({"background-image":"url(./images/imgSpaceShipBig.png)"});
				 $('div.putImage').fadeIn("fast");
				  $('div.exit').fadeIn("fast");
		});
	});
	
	$(document).ready(function(){
	   $('div.move3').on('click', function() {
				 $('div.backScreen').fadeIn("fast");
				 $('div.putImage').css({"background-image":"url(./images/oculusBig.png)"});
				 $('div.putImage').fadeIn("fast");
				  $('div.exit').fadeIn("fast");
		});
	});
	
	$(document).ready(function(){
	   $('div.exit').on('click', function() {
				 $('aside.fixed_aside_globe').css("color","black");
				 $('div.backScreen').fadeOut("fast");
				 $('div.putImage').fadeOut("fast");
		});
	});
	