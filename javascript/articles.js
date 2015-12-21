//----------
// Biotic Pixels 28 September 2013 08:02:16
//----------
// @TODO Indicate where code in <pre> tags has been wrapped

(function () {

    "use strict";

    var ArticlesScaling = Object.create(DynamicScaling);
    ArticlesScaling.parameters = [
        [
            [0, 0],
            20,
            [300, 30],
            ["h1, h2, h3, h4, h5, h6",
                ["fontSize", 1],
                ["marginTop", 0.3]
            ],
            ["h1",
                ["fontSize", 1],
                ["marginBottom", 0.1]
            ],
            ["h2",
                ["fontSize", (1 / 6 * 5)]
            ],
            ["h3",
                ["fontSize", (1 / 6 * 4)]
            ],
            ["h4",
                ["fontSize", (1 / 6 * 3)]
            ],
            ["h5",
                ["fontSize", (1 / 6 * 2)]
            ],
            ["h6",
                ["fontSize", (1 / 6 * 1)]
            ]
        ],
        [
            [0, 0],
            275,
            [300, 350],
            ["body",
                ["maxWidth", 1]
            ]
        ],
        [
            [0, 0],
            9,
            [256, 10],
            ["body",
                ["fontSize", 1],
                ["paddingTop", 1],
                ["paddingRight", 1],
                ["paddingLeft", 1]
            ],
            ["p",
                ["textAlign", ["left", "justify"]]
            ],
            ["hr",
                ["marginTop", 1],
                ["borderTopWidth", 0.1]
            ],
            ["blockquote, ul, ol, dl",
                ["marginBottom", 1],
                ["paddingLeft", 2]
            ],
            ["ul li, ol li",
                ["paddingLeft", 0.5]
            ]
        ]
    ];

    ArticlesScaling.scale();

    window.onresize = function (event) {ArticlesScaling.scale(event)}; // JavaScript, it is as beautiful as it is mystical http://stackoverflow.com/questions/183214/javascript-callback-scope

}());
