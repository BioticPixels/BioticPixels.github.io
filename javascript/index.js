//----------
// Biotic Pixels 26 September 2013 07:10:00
//----------

(function () {

    "use strict";

    var IndexScaling = Object.create(DynamicScaling);
    IndexScaling.parameters = [
        [
            [0, 0],
            25,
            [300, 40],
            ["h1",
                ["fontSize", 1], ["marginTop", -0.7], ["paddingBottom", 0.8]
            ],
            ["#articles",
                ["top", 0.2]
            ]
        ],
        [
            [0, 0],
            13,
            [256, 14],
            ["p, nav, a, ul, li",
                ["fontSize", 1]
            ]
        ]
    ];

    IndexScaling.scale();

    window.onresize = function (event) {IndexScaling.scale(event)}; // JavaScript, it is as beautiful as it is mystical http://stackoverflow.com/questions/183214/javascript-callback-scope

}());