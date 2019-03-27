import $ from 'jquery';
import './sass/main.scss';
import { Enemy } from './objects';
import { Projectile } from './objects';

$(document).ready(function(){

  //Storing jQuery objects//
  var blueBox = $('.box1');
  var pinkBox = $('.box2');
  var handBox = $('.handBox');

  //Storing the jQuery objects in newly constructed objects//
  var pink = new Enemy('Pink',pinkBox);
  var blue = new Enemy('Blue',blueBox);
  var fireball = new Projectile('Fireball',handBox);

  //Object Arrays
  var enemyObjArr = [pink,blue];
  var colliderArr = [pink,blue,fireball];



  //This function takes in an object and gives it positional information//
  function getPosition(object){
    var $objPos = object.selector;
    var objPos = $objPos[0];
    var objRect = objPos.getBoundingClientRect();
    object.x = objRect.x;
    object.y = objRect.y;
    object.width = objRect.width;
    object.height = objRect.height;
  }



  //This function will use the positional information stored in two objects and determine if they overlap//
  function collision(enemy,projectile) {
    if (enemy.x < projectile.x + projectile.width &&
     enemy.x + enemy.width > projectile.x &&
     enemy.y < projectile.y + projectile.height &&
     enemy.y + enemy.height > projectile.y) {
      console.log('HIIIITTTTTT');
    }
  }

  //These loops will run their functions at specific intervals. Note: an anonymous function must be used with setInterval() in order to pass in a function with argurments.//

  enemyObjArr.forEach(function(enemy) {
    setInterval( function() { collision(enemy,fireball); }, 100 );
  });

  colliderArr.forEach(function(obj) {
    setInterval( function() { getPosition(obj); }, 500 );
  });

  //This will animate the projectile when the spacebar is pressed//
  document.body.onkeyup = function(e){
      if(e.keyCode == 32){
          $('.handBox').addClass('shoot');
          $('.handBox img').addClass('rotate');
      }
  };

  document.body.onkeydown = function(e){
      if(e.keyCode == 32){
          $('.handBox').removeClass('shoot');
          $('.handBox img').removeClass('rotate');
      }
  };

  //This set of functions controls the movement of handBox inside the boundingBox using the arrowkeys. *Credit to Sime Vidas & infidel*//

  $(function () {
    var pane = $('.boundingBox'),
      box = $('.handBox'),
      wh = pane.width() - box.width(),
      wv = pane.height() - box.height(),
      d = {},
      x = 5;

    function newh(v,a,b) {
      var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
      return n < 0 ? 0 : n > wh ? wh : n;
    }

    function newv(v,a,b) {
      var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0);
      return n < 0 ? 0 : n > wv ? wv : n;
    }

    $(window).keydown(function(e) { d[e.which] = true; });
    $(window).keyup(function(e) { d[e.which] = false; });

    setInterval(function() {
      box.css({
        left: function(i,v) { return newh(v, 37, 39); },
        top: function(i,v) { return newv(v, 38, 40); }
      });
      wh = pane.width() - box.width();
      wv = pane.height() - box.height();
    }, 20);
  });


});
