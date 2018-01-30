/*
	main.js file
*/
require(['lib/DependencyLoader',
		'BackgroundRenderer',
		'CharacterRenderer',
		'CollisionMap',
		'Agent',
		'Mob',
		'Tileset',
		'Joystix'],
function(DependencyLoader,
		BackgroundRenderer,
		CharacterRenderer,
		CollisionMap,
		Agent,
		Mob,
		Tileset,
		Joystix){
	'use strict';
	var GameOver = false
	var Victory = false
	var x
	var Music
	var map = [
			[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
			[1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1],
			[1,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
			[1,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
			[1,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
			[1,0,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,0,0,1],
			[1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,0,1,1,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,0,1],
			[1,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,1],
			[1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
		],
		tileSize = 36,
		$body = $('body'),
		$window = $(window),
		$canvas,
		canvases = [],
		bgRenderer,
		characterRenderer,
		joystick = new Joystix({
			//assumeTouch: true,
			$window: $(window),
			keyboardSpeed: 10
		}),
		spritesToLoad = 2,

		bgTileset = new Tileset({
			spritePath: 'img/Tiles.png',
			specPath: 'spec/sf2-map.json',
			onReady: loadCb
		}),

		player = new Agent({
			position: {x:1,y:1},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/Trabajador.png',
				specPath: 'spec/sf2-characters.json',
				onReady: loadCb
			})
		}),
		monster = new Mob({
			position: {x:15,y:10},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/Dogu.png',
				specPath: 'spec/sf2-goblin.json',
				onReady: loadCb
			}),
			targetAgent: player
		}),
		monster2 = new Mob({
			position: {x:24,y:10},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/Vieja.png',
				specPath: 'spec/sf2-goblin.json',
				onReady: loadCb
			}),
			targetAgent: player
		}),
		monster3 = new Mob({
			position: {x:20,y:4},
			collision: new CollisionMap({
				map: map
			}),
			tileset: new Tileset({
				spritePath: 'img/Viejo.png',
				specPath: 'spec/sf2-goblin.json',
				onReady: loadCb
			}),
			targetAgent: player
		});

	function loadCb(){
		spritesToLoad--;
		if(!spritesToLoad){ run(); }
	}
	var music = new Audio();
	function playMusic(){
	 	music = new Audio("IGM/Music.wav");
        //var music = new Audio("music.mp3");
    	music.play();
    }
    var go = new Audio();
    	function playGO(){
	 	go = new Audio("IGM/FAIL.mp3");
        //var music = new Audio("music.mp3");
    	go.play();
    }
    var vic = new Audio();
    function playVic(){
	 	vic = new Audio("IGM/VICTORY.mp3");
        //var music = new Audio("music.mp3");
    	vic.play();
    }
    function stopMusic(){
    	music.pause()
    	clearInterval(Music);
    }
	function playBackground(){
    playMusic();
     Music=setInterval(playMusic, 16000);
    
    }

	function run(){

		// build layers
		_(4).times(function(i){
			$canvas = $('<canvas width="'+(map[0].length * tileSize)+'" height="'+(map.length * tileSize)+'" data-index="'+i+'" class="gamecanvas canvas'+i+'"/>');
			$body.append($canvas);
			canvases.push($canvas);
		});

		playBackground()
		// start renderers
		bgRenderer = new BackgroundRenderer({
			$el: canvases[1],
			map: map,
			tileSet: bgTileset,
			tileSize: tileSize
		});
		characterRenderer = new CharacterRenderer({
			$el: canvases[2],
			tileSize: tileSize,
			agents: [
				player,
				monster,
				monster2,
				monster3
			]
		});
		// input
		joystick.onMove(function(movement){
			player.doMove(movement.x1 * 0.01, movement.y1 * 0.01);
		});

		// run game
		function gameLoop(){
			if(!GameOver && !Victory){
				if((Math.abs(player.position.x - 29)+Math.abs(player.position.y))<1.5){
					Victory = true;
					bgRenderer.Victory()
					stopMusic()
					playVic()

				}
				if(( Math.abs(player.position.x - monster.position.x)+Math.abs(player.position.y - monster.position.y)) <=1 || ( Math.abs(player.position.x - monster2.position.x)+Math.abs(player.position.y - monster2.position.y)) <=1 || ( Math.abs(player.position.x - monster3.position.x)+Math.abs(player.position.y - monster3.position.y)) <=1){
					GameOver = true
					bgRenderer.GameOver()	
					stopMusic()
					playGO()
					
				}
				if(!GameOver && !Victory){
				characterRenderer.draw();
				monster.chooseAction();
				monster2.chooseAction();
				monster3.chooseAction();
				}//drawImage
				
				
				window.requestAnimationFrame(gameLoop);
		}
		}
		gameLoop();

		centerCanvases();
	}

	// resize
	function centerCanvases(){
		_(canvases).each(function($canvas){
			$canvas.css({
				top: ($window.height() - $canvas.height())/2
			});
		});
	}
	$window.resize(_.throttle(centerCanvases,250));

});