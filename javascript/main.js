//----------
// Biotic Pixels 26 September 2013 07:10:00
//----------

(function () {

    "use strict";
 
    //----------
    // fontResize
    //----------
    // @TODO Make more reuseable
    // Simple function that ensures that fonts scale correctly for all devices - something not possible with the vw units.
    // Utilises line algebra (y = m * x + b)
    function fontResize () {
        var windowWidth = window.innerWidth;
 
        // Retrieve external CSS styles (assumes there is only one stylesheet as the title attributes is an empty string, making it difficult to distinguish between them)
        var css = document.styleSheets[0];
        var block = css.cssRules ? css.cssRules : css.rules;
 
        // Line algebra
        // y = m * x + b, where m is the slope (rise divided by run) of the line and b is the y intersect. What this practically means for this application is that m is the rate at which the font is scaled relative to the window width, and b is the minimum font size.
        var minimumFontSize = 30;
        var scalingRate = 0.05;
        var lineAlgebra = (scalingRate * windowWidth + minimumFontSize);
 
        for (var i = 0; i < block.length; i++) {
            if (block[i].selectorText.toLowerCase() === "h1") {
                block[i].style.fontSize = String(lineAlgebra) + "px";
 
                // Space between the main title and the links.
                // The CSS that ensures everything is vertically aligned to the centre of the page is bizarre, which results in these values being a little odd
                var marginTop = lineAlgebra - (lineAlgebra * 1.3); // (Minusing multiplied lineAlgebra from itself in order to make the value negative)
                block[i].style.marginTop = String(marginTop) + "px";
                block[i].style.paddingBottom = String(lineAlgebra / 1.2) + "px";
            } else if (block[i].selectorText.toLowerCase() === "p") {
                block[i].style.fontSize = String(lineAlgebra / 5) + "px";
            }
        }
    }
    fontResize();
    // fontResize() would be an self-invoking function if it wasn't necessary to use it as a callback.

    window.onresize = fontResize;

}());