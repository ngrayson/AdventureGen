// closest attempted recode of terrain.js in node, slight structural changes
const defaultExtent = require('./constraints.js').defaultExtent;



/**
 * return a random decimal between lo and hi (uniform dist)
 *
  @param {Number}   lower bound
  @param {Number}   upper bound
 */
function runif(low, hi) {
	return low + Math.random() * (hi - low);
}

/**
 * return a random decimal (normal dist)
 *
 */
var rnorm = (function () {
    var z2 = null;
    function rnorm() {
        if (z2 != null) {
            var tmp = z2;
            z2 = null;
            return tmp;
        }
        var x1 = 0;
        var x2 = 0;
        var w = 2.0;
        while (w >= 1) {
            x1 = runif(-1, 1);
            x2 = runif(-1, 1);
            w = x1 * x1 + x2 * x2;
        }
        w = Math.sqrt(-2 * Math.log(w) / w);
        z2 = x2 * w;
        return x1 * w;
    }
    return rnorm;
})();

/**
 * return a random 2d vector with both points on the normal dist
 *
 * @param {Number} how much to scale the random vector
 */
function randomVector(scale) { 
	return [scale * rnorm(), scale * rnorm()];
}

/** 
 * return n random points randomly, uniformly distributed between -.5 < x <.5 and -.5 < y < .5
 *
 * @param {Int} how many points to generate
 * @param {Object} Dimensions of plane
 */
function generatePoints(n, extent) {
	// if no extent is supplied, use the default
	extent = extent || defaultExtent;
	var pts = [];
	for(var i = 0; i < n; i++) {
        pts.push([(Math.random() - 0.5) * extent.width, (Math.random() - 0.5) * extent.height]);
    }
    return pts;
}

// Exports
module.exports = {
	runif,
	randomVector
}