
@mitchallen/connection-grid-square
==
Connection grid for square array
--
* * *
## Installation

You must use __npm__ __2.7.0__ or higher because of the scoped package name.

    $ npm init
    $ npm install @mitchallen/connection-grid-square --save
  
* * *

## Usage

    "use strict";
    
    var gridFactory = require("@mitchallen/connection-grid-square");
    
	let xSize = 5;
	let ySize = 6;

    var grid = gridFactory.create({ x: xSize, y: ySize });

## Browser Usage:

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Connection-Grid-Square Example</title>
        <meta name="description" content="Connection Grid Square Example">
        <!-- either cdn should work -->
        <!--
        <script src="https://cdn.rawgit.com/mitchallen/connection-grid-square/v0.1.0/dist/connection-grid-square.min.js"></script>
        -->
        <script src="https://unpkg.com/@mitchallen/connection-grid-square@0.1.0/dist/connection-grid-square.min.js"></script>
        <script>
          var factory = window.MitchAllen.ConnectionGridSquare;
          console.log(factory);
          var xSize = 10, ySize = 5;
          var sg = factory.create( { x: xSize, y: ySize } );
          console.log(sg);
          sg.log(); 
        </script>
      </head>
      <body>
        <h1>Connection Grid Square Example</h1>
      </body>
    </html>
    
* * *

## Methods


### gridFactory = factory.create(spec)

Factory method that returns a connected grid square object. 

It takes one spec parameter that must be an object with x and y values specifying the size of the connection grid.

If the x and y size parameters are missing or less than 0 they will be normalized to 0.

You can call the method multiple times to create multiple connection grids.

    var gridFactory = require("@mitchallen/connection-grid-square");

    var grid1 = gridFactory.create( { x: 5, y: 10 } );
    var grid2 = gridFactory.create( { x: 7, y: 20 } );

    if(!grid1 || !grid2) ...
    
    
### list = object.dirMap

Returns a map of the internal direction flags.

    let dirMap = grid.dirMap;
    
	if(dirMap.N == ... )

The direction flags are: __N__, __E__, __W__, and __S__.
	

### list = object.isDir(dir)

Will return true if __dir__ is a valid direction for the grid type.

	if(isDir("N")) ...
	
### oDir = object.getOppositeDir(dir)

Returns opposite direction of __*dir*__. Will return null for an invalid parameter.

* __dir__ - can any direction that the grid supports

Returns an string containing opposite direction of __*dir*__ parameter.

    var oDir = grid.getOppositeDir(x,y,"N");
	oDir.should.eql("S");

### coord = object.getNeighbor(x, y, dir)

Returns the zero-based coordinates of the immediate neighbor of a cell. Will return null if the neighbor would be out of range for the grid.

* __dir__ - can any direction that the grid supports

Returns an object containing coordinates in the form of __{ x: *integer*, y: *integer* }__.

    var coord = grid.getNeighbor(x,y,"N");
    
	let nX = coord.x;
	let nY = coord.y;

### list = object.getNeighborDirs( x, y )

Returns a list containing the directions of all neighbors. The list contains the internal bit flag values.
    
    grid.getNeighborDirs(1,1).should.eql([ "N", "S", "E", "W"  ]);

### list = object.getShuffledNeighborDirs( x, y )

Returns a shuffled list containing the directions of all neighbors. The list is in the form of strings (example: [ "W", "N", "E", "S" ]).

    let list = grid.getShuffledNeighborDirs( x, y );

### bool = object.markVisited( x, y ) 

Uses an internal bit flag to mark a cell as __visited__. This is useful in some applications, such as maze generation.  Will return false if x, y coordinate is not valid.

	grid.markVisited(0,0);

### bool = object.visited(x, y)

Returns true if the cell had been marked with a call to __markVisited__.

	return grid.visited(0,0);
	
### bool = object.mask( x, y ) 

Uses an internal bit flag to mark a cell as __masked__. This is useful in some applications, such as maze generation.  Will return false if x, y coordinate is not valid.

	grid.mask(0,0);
	
### bool = object.isMasked(x, y)

Returns true if the cell had been marked with a call to __mask__.

	return grid.isMasked(0,0);

### bool = object.hasConnections(x, y) 

Will return true if the cell at x and y is connected to any other cell.  Will return false if x, y coordinate is not valid.

	if(grid.hasConnections(x, y)) ...

### bool = object.connect( x, y, dir )

Marks a connection from the current cell to a neighbor cell. Will return false if x, y coordinate or direction is not valid. Only marks a connection in one direction.  Cell A connected to Cell B doesn't necessarily mean that Cell B is connected to Cell A. To connect in both directions see __connectUndirected__.

* __dir__ - can be any direction that the grid supports

Example:

	if(grid.connect(2,2,"N")) ...

### object.connectUndirected(x, y, dir)

Marks a connection from the current cell to a neighbor cell *and back again*. Will return false if x, y coordinate or direction is not valid. Marks a connection in one direction. Cell A connected to Cell B also results in Cell B being marked as connected to Cell A. It's the same as calling __connect__ once from each cell and reversing the direction.

* __dir__ - can be any direction that the grid supports

Example:

	if(grid.connectUndirected(2,2,"N")) ...

### object.connects(x, y, dir)

Returns true if cell has a connection in the specified direction.

* __dir__ - can any direction that the grid supports

Example:

	if(grid.connects(2,2,"N")) ...
	

### object.connectsAny(x, y, list)

Returns true if cell has a connection in any direction in the list.

* __list__ - can contain any direction that the grid supports

Example:


    if(grid.connectsAny(x,y,["S","N","E"])) ...


* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/connection-grid-square.git](https://bitbucket.org/mitchallen/connection-grid-square.git)
* [github.com/mitchallen/connection-grid-square.git](https://github.com/mitchallen/connection-grid-square.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.0 

* initial release

* * *
