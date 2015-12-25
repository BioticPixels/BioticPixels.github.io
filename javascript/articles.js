//----------
// Biotic Pixels 28 September 2013 08:02:16
//----------
// TODO Indicate where code in <pre> tags has been wrapped

(function () {

    "use strict";

    var ArticlesScaling = Object.create(DynamicScaling);
    ArticlesScaling.parameters = [
        [
            [0, 0],
            20,
            [300, 30],
            ["h1, h2, h3, h4, h5, h6, #bioticPixels",
                ["fontSize", 1],
                ["marginTop", 0.3],
                ["lineHeight", 0.8]
            ],
            ["#bioticPixels",
                ["fontSize", 1]
            ],
            ["#bioticPixelsImage",
                ["height", 2],
                ["width", 2],
                ["marginTop", -0.2], // Move everything on the page up and down.
                ["marginBottom", -0.6], // Move the image up and down.
                ["marginLeft", 0.3] // Move the image and text left from the left.
            ],
            ["h1",
                ["fontSize", 0.75],
                ["marginTop", 0.4],
                ["marginBottom", 0.4]
            ],
            ["h2",
                ["fontSize", (0.75 / 6 * 5)]
            ],
            ["h3",
                ["fontSize", (0.75 / 6 * 4)]
            ],
            ["h4",
                ["fontSize", (0.75 / 6 * 3)]
            ],
            ["h5",
                ["fontSize", (0.75 / 6 * 2)]
            ],
            ["h6",
                ["fontSize", (0.75 / 6 * 1)]
            ],
            ["nav",
                ["marginBottom", 0.4],
                ["marginTop", 0.3]
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
                ["textAlign", ["left", "justify"]],
                ["paddingTop", 0.5]
            ],
            ["hr",
                ["marginTop", 1],
                ["borderWidth", 0.1]
            ],
            ["blockquote, ul, ol, dl",
                ["marginBottom", 1],
                ["paddingLeft", 2]
            ],
            ["ul li, ol li",
                ["paddingLeft", 0.5]
            ],
            ["pre, code",
                ["borderWidth", 0.1],
                ["borderRadius", 0.3]
            ],
            ["pre",
                ["marginTop", 1]
            ],
            ["code",
                ["padding", 0.1]
            ],
            ["pre code",
                ["padding", 1],
                ["paddingLeft", 1],
                ["paddingRight", 1]
            ],
            ["img",
                ["maxWidth", 50]
            ]
        ]
    ];

    ArticlesScaling.scale();

    window.onresize = function (event) {ArticlesScaling.scale(event)}; // JavaScript, it is as beautiful as it is mystical http://stackoverflow.com/questions/183214/javascript-callback-scope

}());
