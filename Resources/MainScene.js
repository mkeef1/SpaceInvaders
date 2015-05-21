(function() {
	var platino = require('co.lanica.platino');

	var MainScene = function(window, game) {
		var scene = platino.createScene();
		
		var left = null,
			player = null,
			right = null,
			fire = null,			
			bulletIndex = 0,
			MAX_BULLETS = 10;
			
		var transform = platino.createTransform();
		
		var bullets = new Array(MAX_BULLETS);
		var bulletMover = new Array(MAX_BULLETS);
		
		transform.duration = 2000;
		
		
		function makeBullets() {
			for (var i = 0; i < MAX_BULLETS; i++) {
				bullets[i] = platino.createSprite({width: 10, height: 10});
				bullets[i].hide();
				bullets[i].ready = true;
					
				bulletMover[i] = platino.createTransform();
				bulletMover[i].index = i;
					
				bulletMover[i].addEventListener('complete', bulletsCompleted);
				scene.add(bullets[i]);
			}
		}
		
		var bulletsCompleted = function(e) {
			bullets[e.source.index].hide();
			bullets[e.source.index].ready = true;
		};
			
		function getInitialBulletYPosition() {
    		return player.y - (bullets[0].height);
		}

		function getInitialBulletXPosition(){
    		return player.x + (player.width * 0.5) - (bullets[0].width * 0.5);
		}
		
		var lastTimeBulletFired = 0;
		
		// Report touch events here
		var onSpriteTouch = function(e) {
			Ti.API.info(e.source.name + ' fiplayer a touch event with type: ' + e.type);
		};
		
		var onLeftTouch = function(e) {
			if(e.type == 'touchstart') {
				transform.x = 0;
				player.transform(transform);
			} else {
				player.clearTransforms();
			}
		};
		
		var onRightTouch = function(e) {
			if(e.type == 'touchstart') {
				transform.x = 320;
				player.transform(transform);
			} else {
				player.clearTransforms();
			}
		};
		
		var onFireTouch = function() {
			if(+new Date() - lastTimeBulletFired > 200 && bullets[bulletIndex].ready) {
				bullets[bulletIndex].clearTransform(bulletMover[bulletIndex]);
				bullets[bulletIndex].x = getInitialBulletXPosition();
				bullets[bulletIndex].y = getInitialBulletYPosition();
				bullets[bulletIndex].ready = false;
				bullets[bulletIndex].show();
				bulletMover[bulletIndex].x = getInitialBulletXPosition();
				bulletMover[bulletIndex].y = -bullets[bulletIndex].height;
				bulletMover[bulletIndex].duration = (bullets[bulletIndex].y + bullets[bulletIndex].height) / 150 * 1000;
				bullets[bulletIndex].transform(bulletMover[bulletIndex]);
				
				bulletIndex++;
				if(bulletIndex >= MAX_BULLETS) {
					bulletIndex = 0;
				}
				
				lastTimeBulletFired = +new Date();
			}
		};
		
		var onSceneActivated = function(e) {
			// ---- create sprites, add listeners, etc. ----

			Ti.API.info("MainScene has been activated.");
			
			
			
			fire = platino.createSprite({
				width: game.TARGET_SCREEN.width - 100, height: 50, x: game.TARGET_SCREEN.width / 4, y: game.TARGET_SCREEN.height - 128
			});
			
			left = platino.createSprite({
				width: 50, height: 50, x: 10, y: game.TARGET_SCREEN.height - 128
			});
			left.color(0, 0, 1.0);
			left.name = 'Left';
			
			player = platino.createSprite({
				width: 50, height: 50, x: game.TARGET_SCREEN.width / 2, y: game.TARGET_SCREEN.height - 64
			});
			player.color(1.0, 0, 0);
			player.name = 'player';

			right = platino.createSprite({
				width: 50, height: 50, x: game.TARGET_SCREEN.width, y: game.TARGET_SCREEN.height - 128
			});
			right.color(0, 0, 1.0);
			right.name = 'right';	
			
			
			
			

			
			
			scene.add(left);
			scene.add(player);
			scene.add(right);
			scene.add(fire);
			lastTimeBulletFired = +new Date();
			makeBullets();
			
			// add touch events to sprites
			left.addEventListener('touchstart', onLeftTouch);
			left.addEventListener('touchend', onLeftTouch);
			right.addEventListener('touchstart', onRightTouch);
			right.addEventListener('touchend', onRightTouch);
			fire.addEventListener('touchstart', onFireTouch);
			// fire.addEventListener('touchend', onFireTouch);
		};

		var onSceneDeactivated = function(e) {

			// ---- remove sprites, listeners, etc. ----

			Ti.API.info("MainScene has been deactivated.");
			
			if (left) {
				scene.remove(left);
				left.removeEventListener('touchstart', onLeftTouch);
				left.removeEventListener('touchend', onLeftTouch);
				left = null;
			}

			if (player) {
				scene.remove(player);
				player.removeEventListener('touchstart', onSpriteTouch);
				player.removeEventListener('touchend', onSpriteTouch);
				player = null;
			}

			if (right) {
				scene.remove(right);
				right.removeEventListener('touchstart', onRightTouch);
				right.removeEventListener('touchend', onRightTouch);
				right = null;
			}

			if (fire) {
				scene.remove(fire);
				fire.removeEventListener('touchstart', onSpriteTouch);
				fire.removeEventListener('touchend', onSpriteTouch);
				fire = null;
			}

			touchable = null;

			scene.dispose();
		};

		scene.addEventListener('activated', onSceneActivated);
		scene.addEventListener('deactivated', onSceneDeactivated);
		return scene;
	};

	module.exports = MainScene;
}).call(this);
