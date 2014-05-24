//----------
// Biotic Pixels 28 September 2013 06:36:06
//----------

(function () {

    "use strict";

    //----------
    // fontResize
    //----------
    // @TODO Improve API (getter and setters?).
    // @TODO Improve ability to change non-numeric values, for example `text-align: justify;` to `text-align: none;`
    // @TODO Extract the bezier function for use in other places, not just dynamicScaling(). quadraticBezierCurve().
    // @TODO Extract the line function for use in other places, not just dynamicScaling(). line() or possible linearBeziarCurve() depending on which formular is used.
    // @TODO Should take height into account (does not function well on landscape smart phones) (whether the height or width is used should be based on ratio between them (should use the smallest)).
    //
    // Important: CSS must **not** contain styles with more than one value assigned, such as `margin: 10 20 5 15;`
    //
    // Simple callback function that ensures that fonts scale correctly for all devices - something not possible with the CSS vw units, and more elegant that @media.
    // Utilises quadratic bezier curve (y = (1 - t)^2"p0" + 2(1 - t)t"p1" + t^2"p2", where t is progress between p0 and p2 ε [0, 1] (http://en.wikipedia.org/wiki/Bézier_curve)) and linear equation (y = m * x + b, where x is windowWidth)
    //
    // Must create 'dynamicScalingParameters' variable compliant with the following prototype:
    //
    //[[[float windowWidthKey (value of 0 recommended), float sizeKey0 (value of 0 recommended)], float sizeKey1 (steepness of line - relative to minimumSizeKey, also the y intersect), [float maximumWindowWidthKey (for bezier scaling to take effect), float minimumSizeKey (before bezier scaling takes place), [string selector, [string property (properties to effect), float modifier (should not be 0) | <modifier>[string value0, string value1]], [...]], [...]], [...]]
    //
    // Looping key
    // [<curves>[<p0>[<windowWidthKey>x, <sizeKey>y], <b>p1, <p2>[<minimumWindowWidthKey>x, <minimumSizeKey>y], <styles>[selector, <properties>[property, modifier], [...]], [...]], [...]]

    Object.defineProperty(Object.prototype, 'DynamicScaling', {
        value: {

            // Set and get parameters

            parameters: [],

            square: function (x) {
                return x * x;
            },

            scale: function () {

                // Retrieve external CSS styles (assumes there is only one stylesheet as the title attributes is an empty string, making it difficult to distinguish between them)
                var css = document.styleSheets[0];
                var block = css.cssRules ? css.cssRules : css.rules;

                var windowWidth = window.innerWidth;

                // Iterate through the multidimensional array (chosen for superior computing speed)
                for (var curvesCounter = 0; curvesCounter < this.parameters.length; curvesCounter++) { // For every curve

                    var p0X = this.parameters[curvesCounter][0][0];
                    var p0Y = this.parameters[curvesCounter][0][1];
                    var p1X = 0;
                    var p1Y = this.parameters[curvesCounter][1];
                    var p2X = this.parameters[curvesCounter][2][0];
                    var p2Y = this.parameters[curvesCounter][2][1];

                    for (var blockCounter = 0; blockCounter < block.length; blockCounter++) { // For every CSS code block

                        for (var stylesCounter = 3; stylesCounter < this.parameters[curvesCounter].length; stylesCounter++) { // For every style

                            var selector = this.parameters[curvesCounter][stylesCounter][0];
                          
                            // @attention Was block block[blockCounter].selectorText.toLowerCase(), but this stopped id name comparisons from working - not including toLowerCase() may cause a problem.
                            if (block[blockCounter].selectorText === selector) { // For every code block in the external CSS file

                                for (var propertiesCounter = 1; propertiesCounter < this.parameters[curvesCounter][stylesCounter].length; propertiesCounter++) { // For every property

                                    var property = this.parameters[curvesCounter][stylesCounter][propertiesCounter][0];
                                    var modifier = this.parameters[curvesCounter][stylesCounter][propertiesCounter][1]; // @TODO if === 0, throw error

                                    if (modifier && isNaN(modifier)) { // @TODO Improve
                                        if (windowWidth < p2X) {
                                            block[blockCounter].style[property] = modifier[0]; // @TODO Validation?
                                        } else {
                                            block[blockCounter].style[property] = modifier[1]; // @TODO Validation?
                                        }
                                    } else {
                                        var algebra;

                                        if (windowWidth >= p0X && windowWidth < p2X) { // Do quadratic bezier curve algebra
                                            var t = windowWidth / p2X; // t is just the percentage progress between p0 and p2 represented as a number between 0 and 1
                                            algebra = (this.square(1 - t)) * p0Y + (2 * (1 - t) * t * p1Y) + (this.square(t)) * p2Y;
                                        } else { // Do line algebra
                                            algebra = ((p2Y - p1Y) / p2X) * windowWidth + p1Y;
                                        }

                                        block[blockCounter].style[property] = String(algebra * modifier) + "px";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    });
}());