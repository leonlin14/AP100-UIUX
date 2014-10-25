/**
* Created with first HTML5.
* User: leonlin14
* Date: 2014-10-05
* Time: 06:00 AM
* To change this template use Tools | Templates.
*/
window.addEventListener("load", function () {

    Modernizr.load([
        {
                load : [
                    "vendor/jquery/jquery.min.js",
                    "vendor/sizzle/dist/sizzle.js",
                    "vendor/distrib-jquery-mobile/js/jquery.mobile.js",
                    "js/game.js?v=1.1"
                ],
                complete : function() {
                    setInterval(function () { gameModule.gameStart() }, 1000);  
                }
        }
    ]);
	
}, false);