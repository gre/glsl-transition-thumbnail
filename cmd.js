 var GlslTransitionThumbnail = require("./index.js");
var WebGL = require("node-webgl");
var Image = WebGL.Image;

/////////////////////
// Parameters

var glsl = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 resolution;\nuniform float progress;\nuniform sampler2D from, to;\n\nvoid main (void) {\n  vec2 p = gl_FragCoord.xy / resolution.xy;\n  gl_FragColor = mix(texture2D(from, p), texture2D(to, p), progress);\n}\n";

var width = 400;
var height = 300;

var progress = 0.4;

var fromSrc = "./from.png";
var toSrc = "./to.png";

/////////////////////

var from = new Image();
var to = new Image();

function render () {
  var pixels = GlslTransitionThumbnail(width, height, glsl, {
    from: from,
    to: to
  }, progress);

  // FIXME find a good format to output
  process.stdout.write(["P3\n# gl.ppm\n", width, " ", height, "\n255\n"].join(""));
  for(var i=0; i<pixels.length; ++i) {
      process.stdout.write(pixels[i] + " ");
  }
}

from.onload = function () {
  to.onload = function () {
    render();
  }
};
from.src = fromSrc;
to.src = toSrc;


