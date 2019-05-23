var $link = $('.menu-holder').find('li');
    
var $open = $('.open-menu');
var $menu = $('.menu');
var $openHow = $('.how-it-works');
var $openAbout = $('.about-us');
var $openPrice = $('.price');

var $how = $('#how');
var $about = $('#about');
var $price = $('#price');
    
var $top = $('.scroll');

var $step1 = $('.step1');
var $step2 = $('.step2');
var $step3 = $('.step3');


function menu() {    
    $link.click(function(){
       $link.removeClass('active');
       $(this).addClass('active');
    });
    
    $how.click(function(){
        $('.about-us, .price').fadeOut(200, function() {
           $openHow.delay(200).fadeIn(function(){
                $open.slideDown(function() {
                    steps();
                    $('html, body').animate({scrollTop:$menu.position().top});
                });
            }); 
        });
    });
    
    $about.click(function() {
        $('.how-it-works, .price').fadeOut(200, function(){
            $openAbout.delay(200).fadeIn(function() {
                $open.slideDown(function() {
                    $('html, body').animate({scrollTop:$menu.position().top});
                });
            }); 
        });
    });
    
    $price.click(function() {
        $('.how-it-works, .about-us').fadeOut(200, function(){
            $openPrice.delay(200).fadeIn(function() {
                $open.slideDown(function() {
                    $('html, body').animate({scrollTop:$menu.position().top});
                });
            }); 
        }); 
    });
    
    $top.click(function() {
       $open.slideUp(); 
       $link.removeClass('active');
       $('.how-it-works, .about-us, .price').hide();
    });
    
}

function steps() {    
    $step1.fadeIn('slow', function(){
       $step2.fadeIn('slow',function() {
           $step3.fadeIn('slow');
       }) ;
    });
}

$(document).ready(function(){
    menu();
});
