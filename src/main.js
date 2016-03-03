
function createGameLogic(config) {
	var width = config.width;
	var height = config.height;

	var cellMatrix = [];
	for (var idx1 = 0; idx1 < height; idx1 += 1) {
		var row = [];
		for (var idx2 = 0; idx2 < width; idx2 += 1) {
			row.push(0);
		}
		cellMatrix.push(row);
	}


	function next(done) {
		for (var idx1 = 0; idx1 < height; idx1 += 1) {
			for (var idx2 = 0; idx2 < width; idx2 += 1) {
				cellMatrix[idx1][idx2] = Math.round(Math.random());
			}
		}


		done();
	}

	return {
		cellMatrix: cellMatrix,
		next: next
	};
}

function createCellView(config) {
	var parentElement = config.parentElement;

	var cellDiv = document.createElement("div");
	cellDiv.className = "cell";

	parentElement.appendChild(cellDiv);

	var obj = {};

	var alive = false;

	function set(val) {
		alive = val;

		if (alive) {
			cellDiv.className = "cell alive";
		} else {
			cellDiv.className = "cell";
		}
	}

	function get() {
		return alive;
	}

	Object.defineProperty(obj, "alive", {
		set: set,
		get: get
	});

	return obj;
}

function createGameController(config) {
	var parentElement = config.parentElement;
	var gameLogic = config.gameLogic;

	var width = config.width;
	var height = config.height;

	var board = document.createElement("div");
	board.className = "gol_board";

	parentElement.appendChild(board);

	var cellMatrix = [];

	for (var idx1 = 0; idx1 < height; idx1 += 1) {
		var row = [];
		var rowDiv = document.createElement("div");
		rowDiv.className = "row";
		for (var idx2 = 0; idx2 < width; idx2 += 1) {
			var cell = createCellView({
				parentElement: rowDiv
			});
			row.push(cell);
		}
		cellMatrix.push(row);
		board.appendChild(rowDiv);
	}


	window.cellMatrixDebug = cellMatrix;

	function next() {
		gameLogic.next(function() {
			for (var idx1 = 0; idx1 < height; idx1 += 1) {
				for (var idx2 = 0; idx2 < width; idx2 += 1) {
					cellMatrix[idx1][idx2].alive = gameLogic.cellMatrix[idx1][idx2];
				}
			}
		});
	}

	return {
		next: next
	};
}

var gol = createGameController({
	width: 30,
	height: 30,

	parentElement: document.getElementById("board"),
	gameLogic: createGameLogic({
		width: 30,
		height: 30
	})
});