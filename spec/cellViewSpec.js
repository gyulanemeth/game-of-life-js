describe("cellView", function() {
	it("should throw an error when parentElement is not given", function() {
		expect(function() {
			createCellView();
		}).toThrowError("parentElement is mandatory!");
	});

	var parentElement;
	var cellView;
	beforeEach(function() {
		parentElement = document.createElement("div");
		cellView = createCellView({
			parentElement: parentElement
		});
	});

	it("has to have an alive property", function() {
		expect(cellView.alive).toBeDefined();
		expect(cellView.alive).toBeFalsy();
	});

	it("should append a child element to its parent.", function() {
		expect(parentElement.childElementCount).toBe(1);
	});

	it("should have a child element with a cell css class.", function() {
		expect(parentElement.children[0].className).toBe("cell");
	});

	it("has to have an 'alive' css class when the cell is alive.", function() {
		cellView.alive = true;

		expect(parentElement.children[0].className).toBe("cell alive");
	});

	it("should change its alive state on click", function() {
		var cellDiv = parentElement.children[0];

		expect(cellDiv.className).toBe("cell");

		cellDiv.click();

		expect(cellDiv.className).toBe("cell alive");
	});
});
