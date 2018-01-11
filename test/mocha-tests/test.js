var test = require('../../server/services/test');
var expect = require('chai').expect;
console.log(test);

describe("#Testing Automated Tests", () => {
    it("Should return true", () => {
        var test = test.test();
        expect(test).to.equal(true);
    });
});
