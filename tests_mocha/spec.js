describe('DOM tests', function () {
    describe('Check list elements get added', function () {

        let addEntry = function (elem) {

            document.getElementById('taskFormEntry').value = 'test';

            let evt = new MouseEvent('click');

            elem.dispatchEvent(evt);
        };

        let btn = document.getElementById('submit');

        it("should check a li is added under 'Date Added'", function () {
            addEntry(btn);
            addEntry(btn);

            let expected = 2;
            let actual = document.getElementById("toDo-dateAdded").getElementsByTagName("li").length;

            chai.assert.equal(actual, expected, "List length is incorrect")

        });

        it("should check a li is added under 'to do'", function () {
            addEntry(btn);
            addEntry(btn);

            let expected = 4;
            let actual = document.getElementById("toDo-item").getElementsByTagName("li").length;

            chai.assert.equal(actual, expected, "List length is incorrect")

        });

        it("should check a li is added under 'Completed By'", function () {
            addEntry(btn);
            addEntry(btn);

            let expected = 6;
            let actual = document.getElementById("toDo-completeBy").getElementsByTagName("li").length;

            chai.assert.equal(actual, expected, "List length is incorrect")

        });

        it("should check a li is added under 'Category'", function () {
            addEntry(btn);
            addEntry(btn);

            let expected = 8;
            let actual = document.getElementById("toDo-category").getElementsByTagName("li").length;

            chai.assert.equal(actual, expected, "List length is incorrect")

        });

        it("should check a li is added under 'Complete'", function () {
            addEntry(btn);
            addEntry(btn);

            let expected = 10;
            let actual = document.getElementById("toDo-complete").getElementsByTagName("li").length;

            chai.assert.equal(actual, expected, "List length is incorrect")

        })
    });

    describe('check items have been removed', function () {
        it('should check form entries are deleted')
    })
});

