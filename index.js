var GlslTransitionCore = require("glsl-transition-core");

function GlslTransitionThumbnail (width, height, glsl, uniforms, progress) {
  var document = GlslTransitionThumbnail.getDocument();
  var canvas = document.createElement("canvas"); // This is creating a window :S
  canvas.width = width;
  canvas.height = height;
  var T = GlslTransitionCore(canvas);
  var t = T(glsl);
  t.load();
  t.bind();
  if (uniforms) {
    for (var u in uniforms) {
      t.setUniform(u, uniforms[u]);
    }
  }
  t.syncViewport();
  t.setProgress(progress||0.4);
  t.draw();

  var gl = T.getGL();
  var pixels = new Uint8Array(width * height * 3);
  gl.readPixels(0, 0, width, height, gl.RGB, gl.UNSIGNED_BYTE, pixels);

  t.destroy();
  return pixels;
}

GlslTransitionThumbnail.getDocument = function () {
  if (typeof window !== "undefined") return window.document;
  throw new Error('You must implement GlslTransitionThumbnail.getDocument. e.g.: require("node-webgl").document()');
};

module.exports = GlslTransitionThumbnail;
