
function createGameLogic(config) {
	var width = config.width;
	var height = config.height;

	var cellMatrix = [];
	restart();


	function next(done) {
		var cellMatrix2 = [];
		cellMatrix2.length = height;
		for (var idx1 = 0; idx1 < height; idx1 += 1) {
			cellMatrix2[idx1]=cellMatrix[idx1].slice();
			//slice Object-eket tartalmazo tomboknel a referenciákat másolja!
			//ezert csak az int-eket tarolo tomboket masoljuk vele
		}
		for (var idx1 = 0; idx1 < height; idx1 += 1) {
			//var row2=[];
			for (var idx2 = 0; idx2 < width; idx2 += 1) {
				//cellMatrix[idx1][idx2] = Math.round(Math.random());
				var neighboors = 0;
				for(var i1=-1; i1<2; i1++){
					for(var i2=-1; i2<2; i2++){
						if(exists(idx1+i1,idx2+i2) && (i1!=0 || i2!=0)){
							if(cellMatrix2[idx1+i1][idx2+i2]==1){
								neighboors++;
							}
						}
					}
				}
				if((neighboors==2 || neighboors==3) && cellMatrix2[idx1][idx2]==1){
					//row2.push(1);
					cellMatrix[idx1][idx2]=1;
				} else if(neighboors==3 && cellMatrix2[idx1][idx2]==0){
					//row2.push(1);
					cellMatrix[idx1][idx2]=1;
				} else {
					//row2.push(0);
					cellMatrix[idx1][idx2]=0;
				}
			}
			//cellMatrix2.push(row2);
		}
		cellMatrix2.length=0;
		//cellMatrix.length=height;
		//cellMatrix = cellMatrix2;

		done();
	}
	
	function exists(i,j){
		if(i>-1 && j>-1 && i<height && j<width){
			return true;
		}
		return false;
	}
	
	function restart(){
		cellMatrix.length=0;
		for (var idx1 = 0; idx1 < height; idx1 += 1) {
			var row = [];
			for (var idx2 = 0; idx2 < width; idx2 += 1) {
				row.push(Math.round(Math.random()));
			}
			cellMatrix.push(row);
		}
	}
	
	return {
		cellMatrix: cellMatrix,
		next: next,
		width: width,
		height: height,
		restart: restart
	};
}

function createGameController(config) {
	var parentElement = config.parentElement;
	var gameLogic = config.gameLogic;

	var width = gameLogic.width;
	var height = gameLogic.height;

	var board = document.createElement("div");
	board.className = "gol_board";

	parentElement.appendChild(board);

	var cellMatrix = [];

	for (var idx1 = 0; idx1 < height; idx1 += 1) {
		var row = [];
		var rowDiv = document.createElement("div");
		rowDiv.className = "row";
		for (var idx2 = 0; idx2 < width; idx2 += 1) {
			var addClass = "";
			if(height>20){
				/* cell.div.style.margin="0";
				cell.div.style.height="10px";
				cell.div.style.width="10px";
				cell.div.style.borderRadius="2px"; */ //RONDA MEGOLDAS
				addClass=" small";
			} else if(height>15){
				/* cell.div.style.margin="0"; */ //RONDA MEGOLDAS
				addClass=" medium";
			}
			var cell = createCellView({
				parentElement: rowDiv,
				addClass: addClass
			});
			row.push(cell);
		}
		if(height>20){
			/* rowDiv.style.height="10px"; */ //RONDA MEGOLDAS
			rowDiv.className+=" small"; //szebb megoldas
		} else if(height>15){
			/* rowDiv.style.height="20px"; */ //RONDA MEGOLDAS
			rowDiv.className+=" medium"; //szebb megoldas
		}
	
		cellMatrix.push(row);
		board.appendChild(rowDiv);
	}

	var playing = false;
	var playIntervalId;
	window.cellMatrixDebug = cellMatrix;
	drawTable();
	pause();

	function next() {
		gameLogic.next(function() {
			drawTable();
		});
	}
	
	function drawTable(){
		for (var idx1 = 0; idx1 < height; idx1 += 1) {
			for (var idx2 = 0; idx2 < width; idx2 += 1) {
				cellMatrix[idx1][idx2].alive = gameLogic.cellMatrix[idx1][idx2];
			}
		}
	}
	
	function play(){
		next();
		playIntervalId=setInterval(next,1000);
		playing=true;
		playButton.disabled=true;
		pauseButton.disabled=false;
	}
	
	function pause(){
		if(!playing){ //huncutkodas ellen
			return;
		}
		clearInterval(playIntervalId);
		playing=false;
		playButton.disabled=false;
		pauseButton.disabled=true;
	}
	
	function restart(){
		gameLogic.restart();
		drawTable();
	}

	return {
		next: next,
		play: play,
		pause: pause,
		restart: restart
	};
}

var gol = createGameController({
	parentElement: document.getElementById("board"),
	playButton: document.getElementById("playButton"),
	pauseButton: document.getElementById("pauseButton"),
	gameLogic: createGameLogic({
		width: 15,
		height: 15
	})
});