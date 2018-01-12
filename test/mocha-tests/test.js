var testService = require('../../server/services/test')();
var expect = require('chai').expect;

describe("#Testing Automated Tests", () => {
    before(function (done) {
        this.timeout(500);
        done();
    });

    it("Should return true", (done) => {
        var test = testService.test();
        expect(test).to.equal(true);
        done();
    });
});
