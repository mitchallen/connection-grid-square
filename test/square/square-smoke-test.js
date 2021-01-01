/**
    Module: @mitchallen/connection-grid-square
      Test: square-smoke-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    // modulePath = "../../dist/connection-grid-square";
    modulePath = "../../src/index";

describe('Square smoke test', function() {

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

    it('module should exist', function(done) {
        should.exist(_module);
        done();
    });

    it('Square method with no spec should return object', function(done) {
        var grid = _module.create();
        should.exist(grid);
        done();
    });

    it('Square method with valid x and y parameters should return object', function(done) {
        var grid = _module.create({ x: 5, y: 5 });
        should.exist(grid);
        done();
    });

    it('Square method with negative x parameters should normalize xSize to zero', function(done) {
        var grid = _module.create({ x: -5, y: 5 });
        grid.xSize.should.eql(0);
        done();
    });

    it('Square method with negative y parameters should normalize ySize to zero', function(done) {
        var grid = _module.create({ x: 5, y: -5 });
        grid.ySize.should.eql(0);
        done();
    });

    it('xSize should return size of x dimension', function(done) {
        let sizeX = 5;
        let sizeY = 6;
        var grid = _module.create({ x: sizeX, y: sizeY });
        grid.xSize.should.eql(sizeX);
        done();
    });

    it('ySize should return size of y dimension', function(done) {
        let sizeX = 5;
        let sizeY = 6;
        var grid = _module.create({ x: sizeX, y: sizeY });
        grid.ySize.should.eql(sizeY);
        done();
    });

    it('isCell method with valid x and y parameters should return true', function(done) {
        let sizeX = 5;
        let sizeY = 5;
        var grid = _module.create({ x: sizeX, y: sizeY });
        should.exist(grid);
        var result = grid.isCell(sizeX-1, sizeY-1);
        result.should.eql(true);
        done();
    });

    it('set method with valid parameter should return true', function(done) {
        var grid = _module.create({ x: 1, y: 1 });
        should.exist(grid);
        var result = grid.set(0,0,5);
        result.should.eql(true);
        done();
    });

    it('get method with valid parameter should return value', function(done) {
        var grid = _module.create({ x: 1, y: 1 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        let tValue = 5;
        var condition = grid.set(tX,tY,tValue);
        condition.should.eql(true);
        var result = grid.get(tX,tY);
        result.should.eql(tValue);
        done();
    });

    it('fill method with valid integer should fill grid with integer', function(done) {
        let xSize = 5;
        let ySize = 10;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        let tValue = 999;
        var result = grid.fill(tValue);
        for(var x = 0; x < xSize; x++ ) {
            for(var y = 0; y < ySize; y++ ) {
                grid.get(x,y).should.eql(tValue);
            }
        }
        done();
    });

   it('cloneArray method should return a clone of the internal array', function(done) {
        var grid = _module.create({ x: 1, y: 1 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        let tValue = 100;
        var result = grid.set(tX,tY,tValue);
        result.should.eql(true);
        var arr = grid.cloneArray();
        arr[tX][tY].should.eql(tValue);
        done();
    });

    it('log method should not throw exception', function(done) {
        let xSize = 4;
        let ySize = 5;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        grid.fill(10)
        grid.set(0,0,20);
        grid.set(xSize - 1, ySize - 1,30);
        grid.log();
        done();
    });

    it('getNeighborDirs should return correct list', function(done) {
        var grid = _module.create({ x: 5, y: 5 });
        should.exist(grid);
        grid.getNeighborDirs(1,1).should.eql([ "N", "S", "E", "W" ]);
        done();
    });

    it('getShuffledNeighborDirs should return shuffled list', function(done) {
        var grid = _module.create({ x: 5, y: 5 });
        should.exist(grid);
        let tX = 1;
        let tY = 2;
        var shuffled = grid.getShuffledNeighborDirs(tX,tY);
        shuffled.length.should.eql(4);
        // Now and then it does return same list ...
        // shuffled.should.not.eql(grid.getNeighborDirs(tX,tY));
        done();
    });

    it('markVisited should return true for valid cell', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        let VISITED = 0x01;
        var result = grid.markVisited(tX,tY);
        result.should.eql(true);
        grid.get(tX,tY).should.eql(VISITED);
        done();
    });

    it('visited should return true for a visited cell', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        grid.markVisited(tX,tY).should.eql(true);
        grid.visited(tX,tY).should.eql(true);
        done();
    });

    it('hasConnections should return false when nothing connected', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        grid.hasConnections(tX,tY).should.eql(false);
        done();
    });

    it('getNeighbor should return neighbor x and y values', function(done) {
        var grid = _module.create({ x: 5, y: 5 });
        should.exist(grid);
        let tX = 2;
        let tY = 3;
        let list = ["N","S","E","W"];
        for( var key in list ) {
            var sDir = list[key];
            var cell = grid.getNeighbor(tX,tY,sDir);
            should.exist(cell);
            (cell.x >= tX - 1 && cell.x <= tX + 1).should.eql(true);
            (cell.y >= tY - 1 && cell.y <= tY + 1).should.eql(true);
        }
        done();
    });

    it('getNeighbor for non-string direction should return null', function(done) {
        var grid = _module.create({ x: 5, y: 5 });
        should.exist(grid);
        let tX = 2;
        let tY = 3;
        var cell = grid.getNeighbor(tX,tY,1);
        should.not.exist(cell);
        done();
    });

    it('getNeighbor for non-existant cell should return null', function(done) {
        var grid = _module.create({ x: 5, y: 5 });
        should.exist(grid);
        let tX = -2;
        let tY = 3;
        var cell = grid.getNeighbor(tX,tY,"N");
        should.not.exist(cell);
        done();
    });

    it('getNeighbor for non-existant neighbor should return null', function(done) {
        var grid = _module.create({ x: 1, y: 1 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        var cell = grid.getNeighbor(tX,tY,"N");
        should.not.exist(cell);
        done();
    });

    it('connect should return true for valid parameters and set cell value to direction', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        grid.connect(tX,tY,"S").should.eql(true);
        let dirMap = grid.dirMap;  
        grid.get(tX,tY).should.eql(dirMap.S);
        done();
    });

    it('connectUndirected should return true for valid parameters and set cell values to direction', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        let status = grid.connectUndirected(tX,tY,"S").should.eql(true);
        let dirMap = grid.dirMap;
        grid.get(tX,tY).should.eql(dirMap.S);
        // Verify S neighbor points back to N neighbor
        var n = grid.getNeighbor(tX,tY,"S");
        should.exist(n);
        grid.get(n.x,n.y).should.eql(dirMap.N);
        done();
    });

    it('connects should return true for valid connection in direction', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        grid.connect(tX,tY,"S").should.eql(true);
        grid.connects(tX,tY,"S").should.eql(true);
        done();
    });

    it('connects should return false for invalid connection in direction', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        grid.connect(tX,tY,"S").should.eql(true);
        grid.connects(tX,tY,"N").should.eql(false);
        done();
    });

    it('isMasked should return true for a masked cell', function(done) {
        var grid = _module.create({ x: 3, y: 3 });
        should.exist(grid);
        let tX = 0;
        let tY = 0;
        grid.mask(tX,tY).should.eql(true);
        grid.isMasked(tX,tY).should.eql(true);
        done();
    });

    it('getOppositeDir should return opposite neighbor', function(done) {
        var grid = _module.create({ x: 5, y: 5 });
        should.exist(grid);
        let list = ["N","S","E","W"];
        let opps = ["S","N","W","E"];
        for( var key in list ) {
            var sDir = list[key];
            var oDir = grid.getOppositeDir(sDir);
            oDir.should.eql(opps[key]);
        }
        done();
    });

    it('connectsAny should return false for empty list', function(done) {
        let xSize = 5, ySize = 6;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        let x = 1;
        let y = 1;
        grid.connectsAny(x,y,[]).should.eql(false);
        done();
    });

    it('connectsAny should return false for invalid connection in direction', function(done) {
        let xSize = 5, ySize = 6;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        let x = 1;
        let y = 1;
        grid.connectsAny(x,y,["N"]).should.eql(false);
        done();
    });

    it('connectsAny should return false if direction not in list', function(done) {
        let xSize = 5, ySize = 6;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        let x = 1;
        let y = 1;
        grid.connect(x,y,"N").should.eql(true);
        grid.connectsAny(x,y,["E","S","W"]).should.eql(false);
        done();
    });

    it('connectsAny should return true for valid connection in direction', function(done) {
        let xSize = 5, ySize = 6;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        let x = 1;
        let y = 1;
        grid.connect(x,y,"N").should.eql(true);
        grid.connectsAny(x,y,["N"]).should.eql(true);
        done();
    });

    it('connectsAny should return true for any valid connection in direction', function(done) {
        let xSize = 5, ySize = 6;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        let x = 1;
        let y = 1;
        grid.connect(x,y,"N").should.eql(true);
        grid.connectsAny(x,y,["S","N","E"]).should.eql(true);
        done();
    });

    it('connectsAny should return false for non-existant direction in list', function(done) {
        let xSize = 5, ySize = 6;
        var grid = _module.create({ x: xSize, y: ySize });
        should.exist(grid);
        let x = 1;
        let y = 1;
        grid.connect(x,y,"N").should.eql(true);
        grid.connectsAny(x,y,["E","X","W"]).should.eql(false);
        done();
    });
});
