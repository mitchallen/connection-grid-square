
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

## Modules

<dl>
<dt><a href="#module_connection-grid-square">connection-grid-square</a> ⇐ <code>{@link</code></dt>
<dd><p>Connection Grid Square</p>
</dd>
<dt><a href="#module_connection-grid-square-factory">connection-grid-square-factory</a></dt>
<dd><p>A module for generating connection grid squares</p>
</dd>
</dl>

<a name="module_connection-grid-square"></a>

## connection-grid-square ⇐ <code>{@link</code>
Connection Grid Square

**Extends:** <code>{@link</code>  

* [connection-grid-square](#module_connection-grid-square) ⇐ <code>{@link</code>
    * [.getNeighbor(dir)](#module_connection-grid-square+getNeighbor) ⇒ <code>string</code>
    * [.getNeighborDirs(x, y)](#module_connection-grid-square+getNeighborDirs) ⇒ <code>array</code>

<a name="module_connection-grid-square+getNeighbor"></a>

### connection-grid-square.getNeighbor(dir) ⇒ <code>string</code>
Returns returns neighbor for direction

**Kind**: instance method of <code>[connection-grid-square](#module_connection-grid-square)</code>  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>string</code> | A string representing a direction |

**Example** *(usage)*  
```js
var cell = grid.getNeighbor(1,1,"S"); 
```
<a name="module_connection-grid-square+getNeighborDirs"></a>

### connection-grid-square.getNeighborDirs(x, y) ⇒ <code>array</code>
Returns returns and array of neighbors for the cell at x,y

**Kind**: instance method of <code>[connection-grid-square](#module_connection-grid-square)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X cooridinate of cell |
| y | <code>number</code> | Y cooridinate of cell |

**Example** *(usage)*  
```js
var list = grid.getNeighborDirs(1,1); 
```
<a name="module_connection-grid-square-factory"></a>

## connection-grid-square-factory
A module for generating connection grid squares

<a name="module_connection-grid-square-factory.create"></a>

### connection-grid-square-factory.create(options) ⇒ <code>[connection-grid-square](#module_connection-grid-square)</code>
Factory method that returns a connection grid square object.
It takes one spec parameter that must be an object with named parameters.

**Kind**: static method of <code>[connection-grid-square-factory](#module_connection-grid-square-factory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Named parameters for generating a connection grid square |
| options.x | <code>number</code> | The size along the x axis |
| options.y | <code>number</code> | The size along the y axis |

**Example** *(Creating a connection-grid-square)*  
```js
"use strict";
var gridFactory = require("@mitchallen/connection-grid-square");
let xSize = 5;
let ySize = 6;
var grid = gridFactory.create({ x: xSize, y: ySize });
```

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

#### Version 0.1.4

* corrected version history

#### Version 0.1.3

* installed latest version of __@mitchallen/connection-grid-core__ 
* updated npm scripts
* updated client example
* integrated jsdoc 

#### Version 0.1.2

* error while publishing, trying again

#### Version 0.1.1 

* added missing package dependency for __@mitchallen/connection-grid-core__

#### Version 0.1.0 

* initial release

* * *
