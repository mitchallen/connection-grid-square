/**
    Module: @mitchallen/connection-grid-square
      Test: square-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../../dist/connection-grid-square";

describe('Square method', function() {

    var _module = null;

    before(function(done) {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _module = require(modulePath);
        done();
    });

    after(function(done) {
        // Call after all tests
        done();
    });

    beforeEach(function(done) {
        // Call before each test
        done();
    });

    afterEach(function(done) {
        // Call after eeach test
        done();
    });

    it('should return obj when missing spec parameter', function(done) {
        var obj = _module.create();
        should.exist(obj);
        done();
    });

    it('should return object when called no spec x parameter', function(done) {
        var obj = _module.create({ y: 5 });
        should.exist(obj);
        obj.xSize.should.eql(0);
        done();
    });

    it('should return object when called no spec y parameter', function(done) {
        var obj = _module.create({ x: 5 });
        should.exist(obj);
        obj.ySize.should.eql(0);
        done();
    });

    it('should return object when called with valid x and y parameters', function(done) {
        var obj = _module.create({ x: 5, y: 5 });
        should.exist(obj);
        done();
    });

    it('should return null when called with x and y spec parameters set to zero (0) ', function(done) {
        var obj = _module.create({ x: 0, y: 0 });
        should.exist(obj);
        obj.xSize.should.eql(0);
        obj.ySize.should.eql(0);
        done();
    });

    it('should return null when called with a spec x parameter set to zero (0)', function(done) {
        var obj = _module.create({ x: 0, y: 1 });
        should.exist(obj);
        obj.xSize.should.eql(0);
        done();
    });

    it('should return object when called with a spec y parameter set to zero (0)', function(done) {
        var obj = _module.create({ x: 1, y: 0 });
        should.exist(obj);
        obj.ySize.should.eql(0);
        done();
    });

    it('should return an object when called with x and y set to one (1)', function(done) {
        var obj = _module.create({ x: 1, y: 1 });
        should.exist(obj);
        done();
    });

    it('should return object when called with x and y set to negative value', function(done) {
        var obj = _module.create({ x: -1, y: -1 });
        should.exist(obj);
        obj.xSize.should.eql(0);
        obj.ySize.should.eql(0);
        done();
    });

    it('should return object when called with x set to negative value', function(done) {
        var obj = _module.create({ x: -1, y: 1 });
        should.exist(obj);
        obj.xSize.should.eql(0);
        done();
    });

    it('should return object when called with y set to negative value', function(done) {
        var obj = _module.create({ x: 1, y: -1 });
        should.exist(obj);
        obj.ySize.should.eql(0);
        done();
    });
});
