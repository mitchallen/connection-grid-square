(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.MitchAllen || (g.MitchAllen = {})).ConnectionGridSquare = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
    Module: @mitchallen/connection-grid-square/modules/index.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var gridFactory = _dereq_("@mitchallen/grid-square"),
    baseGrid = _dereq_("@mitchallen/connection-grid-core").create;

/**
 * Connection Grid Square
 * @module connection-grid-square
 * @augments {@link https://www.npmjs.com/package/@mitchallen/connection-grid-core @mitchallen/connection-grid-core}
 */

/**
 * 
 * A module for generating connection grid squares
 * @module connection-grid-square-factory
 */

/** 
* Factory method that returns a connection grid square object.
* It takes one spec parameter that must be an object with named parameters.
* @param {Object} options Named parameters for generating a connection grid square
* @param {number} options.x The size along the x axis
* @param {number} options.y The size along the y axis
* @returns {module:connection-grid-square}
* @example <caption>Creating a connection-grid-square</caption>
* "use strict";
* var gridFactory = require("@mitchallen/connection-grid-square");
* let xSize = 5;
* let ySize = 6;
* var grid = gridFactory.create({ x: xSize, y: ySize });
*/
module.exports.create = function (spec) {

    spec = spec || {};
    var _x = spec.x || 0;
    var _y = spec.y || 0;

    var _grid = gridFactory.create({
        x: _x,
        y: _y
    });

    if (!_grid) {
        return null;
    }

    _grid.fill(0);

    var _dirMap = {
        "N": 0x010,
        "S": 0x020,
        "E": 0x040,
        "W": 0x080 };

    var _oppositeMap = { "E": "W", "W": "E", "N": "S", "S": "N" };

    var obj = baseGrid({
        grid: _grid,
        dirMap: _dirMap,
        oppositeMap: _oppositeMap
    });

    Object.assign(obj, {
        /** Returns returns neighbor for direction
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @memberof module:connection-grid-square
          * @returns {string}
          * @example <caption>usage</caption>
          * var cell = grid.getNeighbor(1,1,"S"); 
         */
        getNeighbor: function getNeighbor(x, y, dir) {
            if (!this.isCell(x, y)) {
                return null;
            }
            // dir must be string and in dirmap
            if (!this.isDir(dir)) {
                return null;
            }
            var _DX = { "E": 1, "W": -1, "N": 0, "S": 0 };
            var _DY = { "E": 0, "W": 0, "N": -1, "S": 1 };
            var nx = x + _DX[dir];
            var ny = y + _DY[dir];
            if (!this.isCell(nx, ny)) {
                return null;
            }
            return { x: nx, y: ny };
        },
        /** Returns returns and array of neighbors for the cell at x,y
          * @param {number} x X cooridinate of cell
          * @param {number} y Y cooridinate of cell
          * @function
          * @instance
          * @memberof module:connection-grid-square
          * @returns {array} 
          * @example <caption>usage</caption>
          * var list = grid.getNeighborDirs(1,1); 
         */
        getNeighborDirs: function getNeighborDirs(x, y) {
            // Classic ignores x and y, but other derived classes may not
            return ["N", "S", "E", "W"];
        }
    });

    return obj;
};

},{"@mitchallen/connection-grid-core":2,"@mitchallen/grid-square":3}],2:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.MitchAllen || (g.MitchAllen = {})).ConnectionGridCore = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
    Module: @mitchallen/connection-grid-core/modules/index.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var shuffleFactory = _dereq_("@mitchallen/shuffle");

/**
 * Connection Grid Core
 * @module connection-grid-core
 * @augments {@link https://www.npmjs.com/package/@mitchallen/grid-core @mitchallen/grid-core}
 */

/**
 * 
 * A module for generating grid cores
 * @module connection-grid-core-factory
 */

/** 
* Factory method that returns a connection grid core object.
* It takes one spec parameter that must be an object with named parameters.
* @param {Object} options Named parameters for generating a connection grid core
* @param {grid} options.grid Grid based on @mitchallen/grid-core
* @param {dirMap} options.dirMap Direction map containing bit map flags for directions
* @param {oppositeMap} options.oppositeMap Opposite direction map
* @returns {module:connection-grid-core}
* @example <caption>Creating a connection-grid-core</caption>
* "use strict";
* var gridFactory = require("@mitchallen/connection-grid-core"),
*     gridSquare = require('@mitchallen/grid-square')
* var sourceGrid = gridSquare.create({ x: 5, y: 6 });
* var _dirMap = { 
*     "N": 0x010, 
*     "S": 0x020, 
*     "E": 0x040, 
*     "W": 0x080 };
* let _oppositeMap = { "E": "W", "W": "E", "N": "S", "S": "N" };
* var cg = gridFactory.create({  
*     grid: sourceGrid,     
*     dirMap: _dirMap,
*     oppositeMap: _oppositeMap 
* });
*/
module.exports.create = function (spec) {

    spec = spec || {};
    var _grid = spec.grid;
    var _DIR_MAP = spec.dirMap || {};
    var _OPPOSITE = spec.oppositeMap || {};

    if (!_grid) {
        return null;
    }

    // bit masks
    var VISITED = 0x01;
    var MASKED = 0x02;

    Object.defineProperties(_grid, {
        "dirMap": {
            writeable: false,
            value: _DIR_MAP,
            enumerable: true,
            configurable: true
        }
    });

    return Object.assign(_grid, {

        /** Returns true if string is found in _DIR_MAP array.
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @memberof module:connection-grid-core
          * @returns {boolean}
          * @example <caption>usage</caption>
          * if(core.isDir("N")) ...
         */
        isDir: function isDir(dir) {
            if (typeof dir === 'string') {
                return _DIR_MAP[dir] !== undefined;
            }
            return false;
        },
        /** Returns opposite direction based on _OPPOSITE array.
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @memberof module:connection-grid-core
          * @returns {string}
          * @example <caption>usage</caption>
          * core.getOppositeDir("N").should.eql("S");
         */
        getOppositeDir: function getOppositeDir(dir) {
            if (!this.isDir(dir)) {
                return null;
            }
            return _OPPOSITE[dir];
        },
        /** Returns the neighbor in a particular direction for a cell at x,y.
          * <b>This should be overriden by base class</b>
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @memberof module:connection-grid-core
          * @returns {string}
          * @example <caption>usage</caption>
          * var neighbor = core.getNeighbor(1,2,"N");
         */
        getNeighbor: function getNeighbor(x, y, dir) {
            // derived should override
            console.log("getNeighbor should be overriden by derived class");
            return null;
        },
        /** Returns the neighbor directions for a cell at x,y.
          * <b>This should be overriden by base class</b>.
          * Classic square grids ignore x and y, but other derived classes, like hexagon, may not.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @function
          * @instance
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * var neighbors = core.getNeighborDirs(1,2);
         */
        getNeighborDirs: function getNeighborDirs(x, y) {
            // derived should override
            // Classic ignores x and y, but other derived classes may not
            console.log("getNeighborDirs should be overriden by derived class");
            return [];
        },
        /** Returns a shuffled list of neighbors for a cell at x,y.
          * Useful for generating random mazes.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @function
          * @instance
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * var neighbors = core.getShuffledNeighborDirs(1,2);
         */
        getShuffledNeighborDirs: function getShuffledNeighborDirs(x, y) {
            var shuffler = shuffleFactory.create({ array: this.getNeighborDirs(x, y) });
            return shuffler.shuffle();
        },
        /** Marks a cell at x,y as visited.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * core.markVisited(1,2);
         */
        markVisited: function markVisited(x, y) {
            return this.set(x, y, this.get(x, y) | VISITED);
        },
        /** Returns true if a cell at x,y exists and it has been marked as visited.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * if(core.visited(x)) ...
         */
        visited: function visited(x, y) {
            if (!this.isCell(x, y)) {
                return false;
            }
            return (this.get(x, y) & VISITED) !== 0;
        },
        /** Marks a cell at x,y as masked.
          * Useful for maze generators to mark cells to skip
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * core.mask(1,2)
         */
        mask: function mask(x, y) {
            return this.set(x, y, this.get(x, y) | MASKED);
        },
        /** Returns true if a cell at x,y has been marked using [mask]{@link module:connection-grid-core#mask}.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * if(core.isMasked(1,2)) ...
         */
        isMasked: function isMasked(x, y) {
            if (!this.isCell(x, y)) {
                return false;
            }
            return (this.get(x, y) & MASKED) !== 0;
        },
        /** Returns true if a cell at x,y has connections.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * if(core.hasConnections(1,2)) ...
         */
        hasConnections: function hasConnections(x, y) {
            // Need to discount visited flag, etc
            var cell = this.get(x, y);
            if (cell === null) {
                return false;
            }
            if (cell === 0) {
                return false;
            }
            var list = this.getNeighborDirs(x, y);
            for (var key in list) {
                var sDir = list[key];
                if (!this.isDir(sDir)) {
                    console.error("hasConnections unknown direction: ", sDir);
                    return false;
                }
                var iDir = _DIR_MAP[sDir];
                if ((cell & iDir) !== 0) {
                    return true;
                }
            }
            return false;
        },
        /** Maps a connection for a cell at x,y in a particular direction.
          * Unlike [connect]{@link module:connection-grid-core#connect} a cell in the direction does not have to exist.
          * Useful for mazes that need to open up border walls.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * core.open(0,0,"N");
         */
        open: function open(x, y, dir) {
            // dir must be string
            if (!this.isDir(dir)) {
                return false;
            }
            return this.set(x, y, this.get(x, y) | _DIR_MAP[dir]);
        },
        /** Maps a connection for a cell at x,y in a particular direction.
          * Returns false if the cell in the target direction does not exist.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * if(core.connect(1,2,"N")) ...
         */
        connect: function connect(x, y, dir) {
            // dir must be string
            // Connect cell to neighbor (one way)}
            if (!this.getNeighbor(x, y, dir)) return false;
            return this.open(x, y, dir);
        },
        /** Maps a connection for a cell at x,y in a particular direction.
          * Also maps a connection from the target cell back to the source cell.
          * Returns false if the cell in the target direction does not exist.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * if(core.connectUndirected(1,2,"N")) ...
         */
        connectUndirected: function connectUndirected(x, y, sDir) {
            // dir must be a string
            if (!this.connect(x, y, sDir)) {
                return false;
            }
            var n = this.getNeighbor(x, y, sDir);
            if (!this.connect(n.x, n.y, _OPPOSITE[sDir])) {
                return false;
            }
            return true;
        },
        /** Returns true if a cell connects to a neighbor cell in a particular direction.
          * It does not matter if a the target cell exists such as when [open]{@link module:connection-grid-core#open} maps a connection to a non-existant cell.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @param {string} dir A string representing a direction
          * @returns {boolean}
          * @function
          * @instance
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * if(core.connects(1,2,"N")) ...
         */
        connects: function connects(x, y, sDir) {
            if (!this.isDir(sDir)) {
                console.error("connects unknown direction: ", sDir);
                return false;
            }
            var cell = this.get(x, y);
            if (cell === null) {
                return false;
            }
            var iDir = _DIR_MAP[sDir];
            return (cell & iDir) !== 0;
        },
        /** Returns true if a cell connects to a neighbor cell in any direction in the list.
          * @param {number} x The x coordinate
          * @param {number} y The y coordinate
          * @param {array} list An array of strings that each represent a direction
          * @function
          * @instance
          * @returns {boolean}
          * @memberof module:connection-grid-core
          * @example <caption>usage</caption>
          * if(core.connectsAny(1,2,["N","W"]) ...
         */
        connectsAny: function connectsAny(x, y, list) {
            var _this = this;

            var connects = false;
            list.forEach(function (el) {
                if (_this.connects(x, y, el)) {
                    connects = true;
                }
            });
            return connects;
        }
    });
};

},{"@mitchallen/shuffle":2}],2:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.MitchAllen || (g.MitchAllen = {})).Shuffle = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
    Module: @mitchallen/shuffle
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

module.exports.create = function (spec) {
    if (!spec) {
        return null;
    }
    if (!spec.array) {
        return null;
    }
    var _array = spec.array.slice(0);
    return {
        shuffle: function shuffle() {
            var i = 0,
                j = 0,
                temp = null;
            for (i = _array.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1));
                temp = _array[i];
                _array[i] = _array[j];
                _array[j] = temp;
            }
            return _array;
        }
    };
};

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.MitchAllen || (g.MitchAllen = {})).GridSquare = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
    Module: @mitchallen/grid-square/modules/index.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var coreGrid = _dereq_('@mitchallen/grid-core');

module.exports.create = function (spec) {

    spec = spec || {};

    var _x = spec.x || 0;
    var _y = spec.y || 0;

    _x = Math.max(_x, 0);
    _y = Math.max(_y, 0);

    var obj = coreGrid.create({ rows: _x });

    for (var row = 0; row < _x; row++) {
        for (var col = 0; col < _y; col++) {
            obj.set(row, col, 0);
        }
    }

    Object.defineProperties(obj, {
        "xSize": {
            writeable: false,
            value: _x,
            enumerable: true
        },
        "ySize": {
            writeable: false,
            value: _y,
            enumerable: true
        }
    });

    return obj;
};

},{"@mitchallen/grid-core":2}],2:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.MitchAllen || (g.MitchAllen = {})).GridCore = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
    Module: @mitchallen/grid-core/modules/index.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

module.exports.create = function (spec) {

    spec = spec || {};

    var _rows = spec.rows || 0;

    _rows = Math.max(_rows, 0);

    var _array = [];
    while (_array.push([]) < _rows) {}
    if (!_array) {
        return null;
    }

    var obj = Object.create({}, {
        "rows": {
            writeable: false,
            value: _rows,
            enumerable: true
        }
    });

    return Object.assign(obj, {

        log: function log() {
            console.log("size: %d: ", _rows);
            console.log(_array);
        },
        rowSize: function rowSize(row) {
            if (row < 0 || row >= _rows) {
                return 0;
            }
            return _array[row].length;
        },
        isCell: function isCell(a, b) {
            var rs = this.rowSize(a);
            return a >= 0 && a < _rows && b >= 0 && b < rs;
        },
        set: function set(a, b, value) {
            // problem for sparse arrays
            // if(!this.isCell(a,b)) { return false; }
            if (a < 0 || b < 0) return false;
            _array[a][b] = value;
            return true;
        },
        get: function get(a, b) {
            if (!this.isCell(a, b)) {
                return null;
            }
            return _array[a][b];
        },
        fill: function fill(value) {
            for (var row = 0; row < _rows; row++) {
                var rs = this.rowSize(row);
                for (var pos = 0; pos < rs; pos++) {
                    _array[row][pos] = value;
                }
            }
        },
        cloneArray: function cloneArray() {
            var _clone = [];
            while (_clone.push([]) < _rows) {}
            for (var row = 0; row < _rows; row++) {
                var rs = this.rowSize(row);
                for (var pos = 0; pos < rs; pos++) {
                    _clone[row][pos] = _array[row][pos];
                }
            }
            return _clone;
        }
    });
};

},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});