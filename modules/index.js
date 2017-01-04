/**
    Module: @mitchallen/connection-grid-square/modules/index.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var gridFactory = require("@mitchallen/grid-square"),
    baseGrid = require("@mitchallen/connection-grid-core").create;

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
module.exports.create = (spec) => {

    spec = spec || {};
    let _x = spec.x || 0;
    let _y = spec.y || 0;

    var _grid = gridFactory.create({
        x: _x,
        y: _y
    });

    if(!_grid) {
        return null;
    }

    _grid.fill(0);

    var _dirMap = { 
        "N": 0x010, 
        "S": 0x020, 
        "E": 0x040, 
        "W": 0x080 };

    let _oppositeMap = { "E": "W", "W": "E", "N": "S", "S": "N" };

    var obj = baseGrid( {
        grid: _grid,
        dirMap: _dirMap,
        oppositeMap: _oppositeMap
    });

    Object.assign( obj, {
        /** Returns returns neighbor for direction
          * @param {string} dir A string representing a direction
          * @function
          * @instance
          * @memberof module:connection-grid-square
          * @returns {string}
          * @example <caption>usage</caption>
          * var cell = grid.getNeighbor(1,1,"S"); 
         */
        getNeighbor: function(x, y, dir) {
            if(!this.isCell(x, y)) { return null; }
            // dir must be string and in dirmap
            if(!this.isDir(dir)) { return null; }
            let _DX = { "E": 1, "W": -1, "N": 0, "S": 0 };
            let _DY = { "E": 0, "W": 0, "N": -1, "S": 1 };
            var nx = x + _DX[dir];
            var ny = y + _DY[dir];
            if(!this.isCell(nx, ny)) { 
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
        getNeighborDirs: function(x, y) {
            // Classic ignores x and y, but other derived classes may not
            return [ "N", "S", "E", "W" ];
        },
    });

    return obj;
}; 