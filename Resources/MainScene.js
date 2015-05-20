(function() {
	var platino = require('co.lanica.platino');

	var MainScene = function(window, game) {
		var scene = platino.createScene();
		
		var left = null,
			player = null,
			right = null;
			
		var transform = platino.createTransform();
		
		transform.duration = 2000;
		transform.x = 0;
		
		// Report touch events here
		var onSpriteTouch = function(e) {
			Ti.API.info(e.source.name + ' fiplayer a touch event with type: ' + e.type);
		};
		
		var onLeftTouch = function(e) {
			if(e.type == 'touchstart') {
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
				transform.x = 0;
			}
		};
		
		var onSceneActivated = function(e) {
			// ---- create sprites, add listeners, etc. ----

			Ti.API.info("MainScene has been activated.");
			
			left = platino.createSprite({
				width: 50,
				height: 50,
				x: 10,
				y: game.TARGET_SCREEN.height - 128
			});
			left.color(0, 0, 1.0);
			left.name = 'Left';
			
			player = platino.createSprite({
				width: 50,
				height: 50,
				x: 100,
				y: game.TARGET_SCREEN.height - 64
			});
			player.color(1.0, 0, 0);
			player.name = 'player';

			right = platino.createSprite({
				width: 50,
				height: 50,
				x: 320,
				y: game.TARGET_SCREEN.height - 128
			});
			right.color(0, 1.0, 0);
			right.name = 'right';
			
			scene.add(left);
			scene.add(player);
			scene.add(right);
			
			// add touch events to sprites
			left.addEventListener('touchstart', onLeftTouch);
			left.addEventListener('touchend', onLeftTouch);
			right.addEventListener('touchstart', onRightTouch);
			right.addEventListener('touchend', onRightTouch);
			player.addEventListener('touchstart', onSpriteTouch);
			player.addEventListener('touchend', onSpriteTouch);
		};

		var onSceneDeactivated = function(e) {

			// ---- remove sprites, listeners, etc. ----

			Ti.API.info("MainScene has been deactivated.");
			
			if (left) {
				scene.remove(left);
				left.removeEventListener('touchstart', onSpriteTouch);
				left.removeEventListener('touchend', onSpriteTouch);
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
				right.removeEventListener('touchstart', onSpriteTouch);
				right.removeEventListener('touchend', onSpriteTouch);
				right = null;
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
