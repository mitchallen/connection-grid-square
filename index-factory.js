/**
    Module: @mitchallen/connection-grid-square
    Author: Mitch Allen
*/

/*jshint esversion: 6 */

"use strict";

module.exports.create = (spec) => {
    if(!spec) {
        return null;
    }
    // private 
    let _package = "@mitchallen/connection-grid-square";
    return {
        // public 
        package: () => _package,
        health: () => "OK"
    };
};
