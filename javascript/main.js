//----------
// Biotic Pixels 26 September 2013 07:10:00
//----------

(function () {

    "use strict";

    //----------
    // fontResize
    //----------
    // @TODO Make more reuseable
    // @TODO Make values of <= 253 if cases derived from lineAlgebra values
    //
    // Simple function that ensures that fonts scale correctly for all devices - something not possible with the CSS vw units, and more elegant that @media.
    // Utilises line algebra (y = m * x + b)
    function fontResize () {
        var windowWidth = window.innerWidth;
        
        // Retrieve external CSS styles (assumes there is only one stylesheet as the title attributes is an empty string, making it difficult to distinguish between them)
        var css = document.styleSheets[0];
        var block = css.cssRules ? css.cssRules : css.rules;
        
        // Line algebra
        // y = m * x + b, where m is the slope (rise divided by run) of the line and b is the y intersect. What this practically means for this application is that m is the rate at which the font is scaled relative to the window width, and b is the minimum font size.
        var minimumFontSizeTitle = 30;
        var scalingRateTitle = 0.05;
        var lineAlgebraTitle = (scalingRateTitle * windowWidth + minimumFontSizeTitle);
        
        var minimumFontSizeMargin = 30;
        var scalingRateMargin = 0.05;
        var lineAlgebraMargin = (scalingRateMargin * windowWidth + minimumFontSizeMargin);
        
        var minimumFontSizeText = 14;
        var scalingRateText = 0.005;
        var lineAlgebraText = (scalingRateText * windowWidth + minimumFontSizeText);
        
        for (var i = 0; i < block.length; i++) {
            if (block[i].selectorText.toLowerCase() === "h1") {
                if (windowWidth >= 253) {
                    block[i].style.fontSize = String(lineAlgebraTitle) + "px";
                    
                    // Space between the main title and the links.
                    // The CSS that ensures everything is vertically aligned to the centre of the page is bizarre, which results in these values being a little odd
                    var marginTop = lineAlgebraMargin - (lineAlgebraMargin * 1.3); // (Minusing multiplied lineAlgebra from itself in order to make the value negative)
                    block[i].style.marginTop = String(marginTop) + "px";
                    block[i].style.paddingBottom = String(lineAlgebraMargin / 1.2) + "px";
                } else {
                    block[i].style.fontSize = String(windowWidth / 100 * 17) + "px";
                    
                    block[i].style.marginTop = String(windowWidth / 100 * -5) + "px";
                    block[i].style.paddingBottom = String(windowWidth / 100 * 14) + "px";
                }
            } else if (block[i].selectorText.toLowerCase() === "nav, a, ul, li") {
                if (windowWidth >= 253) {
                    block[i].style.fontSize = String(lineAlgebraText) + "px";
                } else {
                    block[i].style.fontSize = String(windowWidth / 100 * 6) + "px";
                }
            }
        }
    }
    fontResize();
    // fontResize() would be an self-invoking function if it wasn't necessary to use it as a callback.

    window.onresize = fontResize;

}());