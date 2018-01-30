define(['Renderer'],function(Renderer){

	return Renderer.extend({
		constructor: function(options){
			this.map = options.map;
			this.tileSet = options.tileSet;
			this.tileSpec = this.tileSet.getTileSpec();

			Renderer.prototype.constructor.call(this,options);
		},
		draw: function(){
			var self = this;

			this.context.clearRect(0, 0, this.w, this.h);

			_(this.map).each(function(row, i){
				_(row).each(function(tileId, j){
					if(tileId){
						self.drawTile(self.tileSet.sprite, tileId, j, i);
					}
				});
			});
		},
		GameOver: function(){
			var self = this
			
			this.context.font = "150px Verdana"
			this.context.fillStyle="red";
			this.context.fillText("GAME OVER",75,175);
		},
		Victory: function(){
			var self = this
			this.context.font = "115px Verdana"
			var gradient=this.context.createLinearGradient(0,0,this.w,0);
			gradient.addColorStop("0","blue");
			gradient.addColorStop("0.25", "magenta")
			gradient.addColorStop("0.5","red");
			gradient.addColorStop("0.75","orange")
			gradient.addColorStop("1","yellow");
			this.context.fillStyle=gradient;
			this.context.fillText("CONGRATULATION", 20,150);
		}
	});

});