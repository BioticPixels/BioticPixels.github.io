//----------
// Biotic Pixels 26 September 2013 07:10:00
//----------

(function () {

    "use strict";

    function square (x) {
        return x * x;
    }

    //----------
    // fontResize
    //----------
    // @TODO Make more reuseable??
    // @TODO Make API more friendly?????
    // @TODO Make objects (in order to use a method as a callback, therefore having more confidence in the arguments being deliberate)
    //
    // Simple callback function that ensures that fonts scale correctly for all devices - something not possible with the CSS vw units, and more elegant that @media.
    // Utilises quadratic bezier curve (y = (1 - t)^2"p0" + 2(1 - t)t"p1" + t^2"p2", where t is progress between p0 and p2 ε [0, 1]) and linear equation (y = m * x + b, where x is windowWidth)
    //
    // void fontResize(var float minimum, var float scalingRate, var string seletor, var multidimensionalarray styles)
    //
    // Must create 'styles' variable following the following prototype:
    // [[float minimumSize, float scalingRate, [string selector, [string style, float modifier], [...]], [...]], [...]]
    //
    // [<curves>[<p0>[<windowWidthKey>x, <fontSizeKey>y], <b>p1, <p2>[<minimumWindowWidthKey>x, <minimumFontSizeKey>y], <styles>[selector, <properties>[property, modifier], [...]], [...]], [...]]

    var dynamicScalingParameters = [
        [[0, 0], 23, [256, 30], 0,
            ["h1",
                ["fontSize", 1], ["marginTop", -0.7], ["paddingBottom", 0.8]
            ]
        ],
        [[0, 0], 13, [256, 14], 0,
            ["p, nav, a, ul, li",
                ["fontSize", 1]
            ]
        ]
    ];

    function dynamicScaling() {
        
        // Retrieve external CSS styles (assumes there is only one stylesheet as the title attributes is an empty string, making it difficult to distinguish between them)
        var css = document.styleSheets[0];
        var block = css.cssRules ? css.cssRules : css.rules;

        var windowWidth = window.innerWidth;

        // Iterate through the multidimensional array (chosen for superior computing speed)
        for (var curvesCounter = 0; curvesCounter < dynamicScalingParameters.length; curvesCounter++) { // For every curve

            var p0X = dynamicScalingParameters[curvesCounter][0][0];
            var p0Y = dynamicScalingParameters[curvesCounter][0][1];
            var p1X = 0;
            var p1Y = dynamicScalingParameters[curvesCounter][1];
            var p2X = dynamicScalingParameters[curvesCounter][2][0];
            var p2Y = dynamicScalingParameters[curvesCounter][2][1];

            for (var blockCounter = 0; blockCounter < block.length; blockCounter++) { // For every CSS code block

                for (var stylesCounter = 3; stylesCounter < dynamicScalingParameters[curvesCounter].length; stylesCounter++) { // For every style

                    var selector = dynamicScalingParameters[curvesCounter][stylesCounter][0];

                    if (block[blockCounter].selectorText.toLowerCase() === selector) { // For every code block in the external CSS file

                        for (var propertiesCounter = 1; propertiesCounter < dynamicScalingParameters[curvesCounter][stylesCounter].length; propertiesCounter++) { // For every property

                            var property = dynamicScalingParameters[curvesCounter][stylesCounter][propertiesCounter][0];
                            var modifier = dynamicScalingParameters[curvesCounter][stylesCounter][propertiesCounter][1];

                            if (windowWidth >= p0X && windowWidth < p2X) { // Do quadratic bezier curve algebra
                                var t = windowWidth / p2X; // t is just the percentage progress between p0 and p2 represented as a number between 0 and 1
                                var algebra = (square(1 - t)) * p0Y + (2 * (1 - t) * t * p1Y) + (square(t)) * p2Y;
                                console.log((square(1 - t)) * p0Y + (2 * (1 - t) * t * p1Y) + (square(t)) * p2Y);
                            } else { // Do line algebra
                                var algebra = ((p2Y - p1Y) / p2X) * windowWidth + p1Y;
                            }

                            block[blockCounter].style[property] = String(algebra * modifier) + "px";

                        }
                    }
                }
            }
        }

        // Inferior and broken
        // Welcome to Hell, also known as multidimensional arrays (used for efficiency)
        /*for (var i = 0; i < styles.length; i++) { // For every line algebra input sets
            var lineAlgebra = (styles[i][1] * windowWidth + styles[i][0]);
            for (var j = 0; j < block.length; j++) { // For every CSS code block
                for (var k = 2; k < styles[i].length; k++) { // For every selector in styles
                    if (block[j].selectorText.toLowerCase() === styles[i][k][0]) {
                        for (var l = 1; l < styles[i][k].length; l++) { // For every styles in each selector
                            if (windowWidth >= minimumWindowWidth) {
                                block[j].style[styles[i][k][l][0]] = String(lineAlgebra * styles[i][k][l][1]) + "px";
                            } else {
                                block[j].style[styles[i][k][l][0]] = String((((styles[i][1] * minimumWindowWidth + styles[i][0]) / minimumWindowWidth) * windowWidth + 0)) + "px";
                            }
                        }
                    }
                }
            }
        }*/
    }

    dynamicScaling();

    window.onresize = dynamicScaling;

}());