glsl-transition-thumbnail
=========================

> Take a thumbnail capture of a GLSL Transition.

`glsl-transition-thumbnail` is platform independant:
it can be used on the browser (using Browserify) or directly in NodeJS for instance using `node-webgl`.

For the CLI, see `glsl-transition-thumbnail-cli`.

```javascript
var GlslTransitionThumbnail = require("glsl-transition-thumbnail");

// Example interop with node-webgl
GlslTransitionThumbnail.getDocument = require("node-webgl").document;
```
