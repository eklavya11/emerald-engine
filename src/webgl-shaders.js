export let VERTEX = `
  precision lowp float;
  uniform vec2 uScale;
  uniform vec2 uObjScale;
  attribute vec2 aObjCen;
  attribute float aIdx;
  varying vec2 uv;
  void main(void) {
    if (aIdx == 0.0) {
      uv = vec2(0.0,0.0);
    } else if (aIdx == 1.0) {
      uv = vec2(1.0,0.0);
    } else if (aIdx == 2.0) {
      uv = vec2(0.0,1.0);
    } else {
      uv = vec2(1.0,1.0);
    }
    gl_Position = vec4(
      -1.0 + 2.0 * (aObjCen.x + uObjScale.x * (-0.5 + uv.x)) / uScale.x,
      1.0 - 2.0 * (aObjCen.y + uObjScale.y * (-0.5 + uv.y)) / uScale.y,
      0.0, 1.0
    );
  }
`;

export let FRAGMENT = `
  precision lowp float;
  uniform sampler2D uSampler;
  varying vec2 uv;
  uniform float uOpacity;
  uniform vec4 vColor;
  void main(void) {
    gl_FragColor = vColor + texture2D(uSampler, uv);
    gl_FragColor.a *= uOpacity;
    if (gl_FragColor.a < 0.01) discard;
  }
`;
