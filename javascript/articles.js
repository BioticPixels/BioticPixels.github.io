//----------
// Biotic Pixels 28 September 2013 08:02:16
//----------

(function () {

    "use strict";

    var IndexScaling = Object.create(DynamicScaling);
    IndexScaling.parameters = [
        [
            [0, 0],
            25,
            [300, 40],
            ["h1, h2, h3, h4, h5, h6",
                ["fontSize", 1]
            ],
            ["h1",
                ["fontSize", 0.9]
            ],
            ["h1",
                ["fontSize", 0.8]
            ],
            ["h1",
                ["fontSize", 0.7]
            ],
            ["h1",
                ["fontSize", 0.6]
            ],
            ["h1",
                ["fontSize", 0.5]
            ],
            ["h1",
                ["fontSize", 0.4]
            ]
        ],
        [
            [0, 0],
            13,
            [256, 14],
            ["body",
                ["fontSize", 1]
            ]
        ]
    ];

    IndexScaling.scale();

    window.onresize = function (event) {IndexScaling.scale(event)}; // JavaScript, it is as beautiful as it is mystical http://stackoverflow.com/questions/183214/javascript-callback-scope

}());