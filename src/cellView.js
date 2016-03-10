function createCellView(config) {
	config = config || {};

	if (!config.parentElement) {
		throw new Error("parentElement is mandatory!");
	}

	var parentElement = config.parentElement;
	var addClass = config.addClass || "";

	var cellDiv = document.createElement("div");
	cellDiv.className = "cell" + addClass;

	cellDiv.onclick = function() {
		obj.alive = !obj.alive;
	};

	parentElement.appendChild(cellDiv);

	var obj = {};

	var alive = false;

	function set(val) {
		alive = val;

		if (alive) {
			cellDiv.className = "cell alive" + addClass;
		} else {
			cellDiv.className = "cell" + addClass;
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
