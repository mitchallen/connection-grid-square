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
